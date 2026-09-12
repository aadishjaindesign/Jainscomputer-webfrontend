const STORAGE_KEY = "leadActivities";
const STAFF_MEMBERS = ["Sanmate Jain", "Aadish Jain", "Neha", "Khushi Soni"];
const CALL_STATUSES = [
  "Connected", "Not Answered", "Switched Off", "Busy",
  "Follow Up Required", "Interested", "Not Interested", "Joined", "Wrong Number",
];

const getToken = () => localStorage.getItem("token");
const api = (path) => `${process.env.NEXT_PUBLIC_API_URL}${path}`;

const getLocalActivities = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};

const setLocalActivities = (activities) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
};

const generateId = () => {
  return "local_" + Date.now() + "_" + Math.random().toString(36).slice(2, 9);
};

const authFetch = async (url, options = {}) => {
  const token = getToken();
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        ...options.headers,
      },
    });
    if (res.ok) return { ok: true, data: await res.json() };
    return { ok: false, status: res.status };
  } catch {
    return { ok: false, status: 0 };
  }
};

export const createActivity = async (leadId, leadName, staffName, callStatus, notes, followUpDate) => {
  const body = { leadId, leadName, staffName, callStatus, notes: notes.trim(), followUpDate: followUpDate || null };

  const result = await authFetch(api("/api/admin/activities"), {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (result.ok && result.data?.data) {
    return result.data.data;
  }

  const activity = {
    _id: generateId(),
    leadId,
    leadName,
    staffName,
    callStatus,
    notes: notes.trim(),
    followUpDate: followUpDate || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const activities = getLocalActivities();
  activities.push(activity);
  setLocalActivities(activities);

  return activity;
};

export const getActivitiesByLead = async (leadId) => {
  const result = await authFetch(api(`/api/admin/activities?leadId=${leadId}`));

  if (result.ok && result.data?.data) {
    return result.data.data;
  }

  const activities = getLocalActivities();
  return activities.filter((a) => a.leadId === leadId).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
};

export const getActivitiesByStaff = async (staffName, limit = 20) => {
  const result = await authFetch(
    api(`/api/admin/activities?staffName=${encodeURIComponent(staffName)}&limit=${limit}`)
  );

  if (result.ok && result.data?.data) {
    return result.data.data;
  }

  const activities = getLocalActivities();
  return activities
    .filter((a) => a.staffName === staffName)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);
};

export const updateActivity = async (id, data) => {
  const result = await authFetch(api(`/api/admin/activities/${id}`), {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (result.ok && result.data?.data) {
    return result.data.data;
  }

  const activities = getLocalActivities();
  const idx = activities.findIndex((a) => a._id === id || a.id === id);
  if (idx !== -1) {
    activities[idx] = { ...activities[idx], ...data, updatedAt: new Date().toISOString() };
    setLocalActivities(activities);
    return activities[idx];
  }

  throw new Error("Activity not found");
};

export const deleteActivity = async (id) => {
  const result = await authFetch(api(`/api/admin/activities/${id}`), {
    method: "DELETE",
  });

  if (result.ok) return true;

  const activities = getLocalActivities();
  const filtered = activities.filter((a) => a._id !== id && a.id !== id);
  if (filtered.length !== activities.length) {
    setLocalActivities(filtered);
    return true;
  }

  throw new Error("Activity not found");
};

export const getStaffSummary = async () => {
  const result = await authFetch(api("/api/admin/activities/staff-summary"));

  if (result.ok && result.data?.data) {
    return result.data.data;
  }

  const activities = getLocalActivities();
  const latestMap = {};

  activities.forEach((a) => {
    if (!a.leadId) return;
    const existing = latestMap[a.leadId];
    if (!existing || new Date(a.createdAt) > new Date(existing.createdAt)) {
      latestMap[a.leadId] = {
        leadId: a.leadId,
        staffName: a.staffName,
        callStatus: a.callStatus,
        createdAt: a.createdAt,
      };
    }
  });

  return Object.values(latestMap);
};

export const getConnectedActivitiesByLead = async (leadId) => {
  const activities = await getActivitiesByLead(leadId);
  return activities.filter(
    (a) => a.callStatus === "Connected" || a.callStatus === "Message Sent"
  );
};

export const createMessageActivity = async (leadId, leadName, staffName, message) => {
  return createActivity(leadId, leadName, staffName, "Message Sent", message, null);
};

export const getStaffPerformance = async () => {
  const result = await authFetch(api("/api/admin/activities/staff-performance"));

  if (result.ok && result.data?.data) {
    return result.data.data;
  }

  const activities = getLocalActivities();

  const perfMap = {};
  STAFF_MEMBERS.forEach((name) => {
    perfMap[name] = {
      staffName: name,
      handledLeads: 0,
      totalCalls: 0,
      connected: 0,
      interested: 0,
      notInterested: 0,
      followUps: 0,
      joined: 0,
      pending: 0,
      lastActivity: null,
    };
  });

  const leadStaffMap = {};

  activities.forEach((a) => {
    const name = a.staffName;
    if (!perfMap[name]) return;

    perfMap[name].totalCalls += 1;

    if (!leadStaffMap[a.leadId]) {
      leadStaffMap[a.leadId] = new Set();
    }
    leadStaffMap[a.leadId].add(name);

    const status = a.callStatus;
    if (status === "Connected") perfMap[name].connected += 1;
    else if (status === "Interested") perfMap[name].interested += 1;
    else if (status === "Not Interested") perfMap[name].notInterested += 1;
    else if (status === "Follow Up Required") perfMap[name].followUps += 1;
    else if (status === "Joined") perfMap[name].joined += 1;

    if (
      !perfMap[name].lastActivity ||
      new Date(a.createdAt) > new Date(perfMap[name].lastActivity)
    ) {
      perfMap[name].lastActivity = a.createdAt;
    }
  });

  Object.keys(leadStaffMap).forEach((leadId) => {
    leadStaffMap[leadId].forEach((name) => {
      perfMap[name].handledLeads += 1;
    });
  });

  return Object.values(perfMap);
};
