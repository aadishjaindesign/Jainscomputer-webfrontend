# LeadActivity System — API Contract

## Database Table: `LeadActivities`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `_id` | ObjectId/MongoDB | Auto | Primary key |
| `leadId` | String/Ref | Yes | References Leads._id |
| `staffName` | String | Yes | One of: Sanmate Jain, Aadish Jain, Neha, Khushi Soni |
| `callStatus` | String | Yes | Connected, Not Answered, Switched Off, Busy, Follow Up Required, Interested, Not Interested, Joined, Wrong Number |
| `notes` | String | Yes | Multiline text |
| `followUpDate` | Date | No | Nullable |
| `createdAt` | Date | Auto | |
| `updatedAt` | Date | Auto | |

**Relationship:** One Lead → Many Activities

---

## API Endpoints

### 1. Create Activity
```
POST /api/admin/activities
Auth: Required
Body: {
  "leadId": "string",
  "staffName": "string",
  "callStatus": "string",
  "notes": "string",
  "followUpDate": "string (ISO date) | null"
}
Response: { "success": true, "data": { ...activity } }
```

### 2. Get Activities by Lead
```
GET /api/admin/activities?leadId=xxx
Auth: Required
Query: leadId (required), staffName (optional), limit (optional, default 50)
Response: { "success": true, "data": [ ...activities ] }
```

### 3. Update Activity (Admin only)
```
PUT /api/admin/activities/:id
Auth: Required
Body: { "staffName?", "callStatus?", "notes?", "followUpDate?" }
Response: { "success": true, "data": { ...updatedActivity } }
```

### 4. Delete Activity (Admin only)
```
DELETE /api/admin/activities/:id
Auth: Required
Response: { "success": true }
```

### 5. Staff Summary (for Latest Activity column)
```
GET /api/admin/activities/staff-summary
Auth: Required
Response: {
  "success": true,
  "data": [
    {
      "leadId": "string",
      "staffName": "string",
      "callStatus": "string",
      "createdAt": "ISO date"
    }
  ]
}
```
This endpoint returns the LATEST activity for each lead that has any activity.
Used to populate the "Latest Activity" column in the Leads table.

### 6. Staff Performance (for Dashboard)
```
GET /api/admin/activities/staff-performance
Auth: Required
Response: {
  "success": true,
  "data": [
    {
      "staffName": "Sanmate Jain",
      "handledLeads": 52,
      "totalCalls": 80,
      "connected": 45,
      "interested": 18,
      "notInterested": 10,
      "followUps": 20,
      "joined": 6,
      "pending": 8,
      "lastActivity": "2026-07-03T15:45:00.000Z"
    }
  ]
}
```
Calculated by aggregating LeadActivities data grouped by staffName.

---

## Lead Shape (existing)

```json
{
  "_id": "string",
  "name": "string",
  "phone": "string",
  "email": "string?",
  "message": "string?",
  "course": "string",
  "source": "string?",
  "status": "pending|contacted|converted",
  "createdAt": "ISO date"
}
```
