"use client";

import "./WhyMentors.css";

import {
  useRef,
  useEffect,
  useCallback,
  useState,
} from "react";

import Image from "next/image";

import person1 from "@/assets/image/Sanmati-Jain.webp";
import person2 from "@/assets/image/Aadish-Jain.webp";
import person3 from "@/assets/image/Rajat-Jain.webp";
import person4 from "@/assets/image/Rownak-Sir.webp";

/* DATA */
const featuredMentor = {
  name: "Mr. Sanmati Jain",
  role: "Director",
  img: person1,
  desc:
    "Education means transforming lives, not just teaching skills. We focus on developing the right mindset that turns success into a habit, not just a fancy dream.",
  tags: ["26+ Years", "IT Education", "Career Strategy"],
};

const carouselMentors = [
  {
    name: "Mr. Aadish Jain",
    role: "Junior Director",
    img: person2,
    desc:
      "We believe in building problem solvers, not common learners. We make students ready to overcome real-world challenges.",
    tags: ["Digital marketing", "Video editing", "Branding"],
  },

  {
    name: "Mr. Rajat Jain",
    role: "Experienced Faculty",
    img: person3,
    desc:
      "Jains Computer is a learning hub where experience meets clarity that turns concepts into confidence.",
    tags: ["Accounting", "Interior design", "Data analytics"],
  },

  {
    name: "Mr. Rownak Patni",
    role: "Experienced Faculty",
    img: person4,
    desc:
      "Passionate about empowering students with future-ready skills, Rownak brings a practical approach to digital marketing, AI tools, and freelancing that prepares learners for the real world.",
    tags: ["Digital Marketing", "AI", "Freelancing"],
  },
];

/* LOOP */
const tripled = [
  ...carouselMentors.map((m, i) => ({
    ...m,
    _uid: `a-${i}`,
  })),

  ...carouselMentors.map((m, i) => ({
    ...m,
    _uid: `b-${i}`,
  })),

  ...carouselMentors.map((m, i) => ({
    ...m,
    _uid: `c-${i}`,
  })),
];

const AUTO_SPEED = 0.5;

const RESUME_DELAY = 2000;

const WhyMentors = () => {

  const trackRef = useRef(null);

  const posRef = useRef(0);

  const rafRef = useRef(null);

  const isRunning = useRef(true);

  const pauseTimer = useRef(null);

  const lastTimeRef = useRef(null);

  const isDragging = useRef(false);

  const dragStartX = useRef(0);

  const posAtStart = useRef(0);

  const lastX = useRef(0);

  const dragVel = useRef(0);

  const [activeDot, setActiveDot] = useState(0);

  /* HELPERS */
  const getCardStep = useCallback(() => {

    const card =
      trackRef.current?.querySelector(
        ".mentor-carousel-card"
      );

    if (!card) return 280;

    const gap =
      parseFloat(
        getComputedStyle(trackRef.current).gap
      ) || 20;

    return card.offsetWidth + gap;

  }, []);

  const getSetWidth = useCallback(
    () => getCardStep() * carouselMentors.length,
    [getCardStep]
  );

  const applyT = useCallback(() => {

    if (trackRef.current) {

      trackRef.current.style.transform =
        `translateX(${posRef.current}px)`;

    }

  }, []);

  const clamp = useCallback(() => {

    const sw = getSetWidth();

    if (-posRef.current >= sw * 2) {
      posRef.current += sw;
    }

    if (-posRef.current < 0) {
      posRef.current -= sw;
    }

  }, [getSetWidth]);

  const initPos = useCallback(() => {

    posRef.current = -getSetWidth();

    applyT();

  }, [getSetWidth, applyT]);

  const pauseAuto = useCallback(
    (autoResume = true) => {

      isRunning.current = false;

      if (pauseTimer.current) {
        clearTimeout(pauseTimer.current);
      }

      if (autoResume) {

        pauseTimer.current = setTimeout(() => {

          isRunning.current = true;

        }, RESUME_DELAY);

      }

    },
    []
  );

  /* RAF */
  useEffect(() => {

    const t = setTimeout(initPos, 50);

    const loop = (timestamp) => {

      const delta = lastTimeRef.current
        ? Math.min(
            (timestamp - lastTimeRef.current) / 16.67,
            3
          )
        : 1;

      lastTimeRef.current = timestamp;

      if (isRunning.current) {
        posRef.current -= AUTO_SPEED * delta;
      }

      clamp();

      applyT();

      const sw = getSetWidth();

      const step = getCardStep();

      if (step > 0) {

        const raw =
          Math.round(
            (-posRef.current % sw) / step
          ) % carouselMentors.length;

        setActiveDot(
          (raw + carouselMentors.length) %
            carouselMentors.length
        );

      }

      rafRef.current =
        requestAnimationFrame(loop);

    };

    rafRef.current =
      requestAnimationFrame(loop);

    window.addEventListener(
      "resize",
      initPos
    );

    return () => {

      clearTimeout(t);

      cancelAnimationFrame(rafRef.current);

      window.removeEventListener(
        "resize",
        initPos
      );

      if (pauseTimer.current) {
        clearTimeout(pauseTimer.current);
      }

    };

  }, [
    initPos,
    clamp,
    applyT,
    getSetWidth,
    getCardStep,
  ]);

  /* DRAG */
  const startDrag = useCallback(
    (clientX) => {

      isDragging.current = true;

      dragStartX.current = clientX;

      posAtStart.current = posRef.current;

      lastX.current = clientX;

      dragVel.current = 0;

      pauseAuto(false);

    },
    [pauseAuto]
  );

  const moveDrag = useCallback(
    (clientX, event) => {

      if (!isDragging.current) return;

      if (event) {
        event.preventDefault();
      }

      dragVel.current =
        clientX - lastX.current;

      lastX.current = clientX;

      posRef.current =
        posAtStart.current +
        (clientX - dragStartX.current);

      clamp();

    },
    [clamp]
  );

  const endDrag = useCallback(() => {

    if (!isDragging.current) return;

    isDragging.current = false;

    let momentum = dragVel.current * 0.5;

    let frames = 20;

    const run = () => {

      if (frames-- <= 0) {

        isRunning.current = true;

        return;

      }

      posRef.current += momentum;

      momentum *= 0.85;

      clamp();

      applyT();

      requestAnimationFrame(run);

    };

    run();

  }, [clamp, applyT]);

  /* GLOBAL EVENTS */
  const onMouseMove = useCallback(
    (e) => moveDrag(e.clientX),
    [moveDrag]
  );

  const onMouseUp = useCallback(
    () => endDrag(),
    [endDrag]
  );

  const onTouchMove = useCallback(
    (e) =>
      moveDrag(e.touches[0].clientX, e),
    [moveDrag]
  );

  const onTouchEnd = useCallback(
    () => endDrag(),
    [endDrag]
  );

  useEffect(() => {

    window.addEventListener(
      "mousemove",
      onMouseMove
    );

    window.addEventListener(
      "mouseup",
      onMouseUp
    );

    window.addEventListener(
      "touchmove",
      onTouchMove,
      { passive: false }
    );

    window.addEventListener(
      "touchend",
      onTouchEnd
    );

    return () => {

      window.removeEventListener(
        "mousemove",
        onMouseMove
      );

      window.removeEventListener(
        "mouseup",
        onMouseUp
      );

      window.removeEventListener(
        "touchmove",
        onTouchMove
      );

      window.removeEventListener(
        "touchend",
        onTouchEnd
      );

    };

  }, [
    onMouseMove,
    onMouseUp,
    onTouchMove,
    onTouchEnd,
  ]);

  /* DOT CLICK */
  const goToCard = useCallback(
    (idx) => {

      const sw = getSetWidth();

      const step = getCardStep();

      const target =
        -(sw + idx * step);

      const diff =
        target - posRef.current;

      const start = posRef.current;

      let frames = 30;

      pauseAuto(false);

      const slide = () => {

        frames--;

        const tt = 1 - frames / 30;

        const ease =
          tt < 0.5
            ? 2 * tt * tt
            : -1 + (4 - 2 * tt) * tt;

        posRef.current =
          start + diff * ease;

        applyT();

        if (frames > 0) {

          requestAnimationFrame(slide);

        } else {

          isRunning.current = true;

        }

      };

      requestAnimationFrame(slide);

    },
    [
      getSetWidth,
      getCardStep,
      pauseAuto,
      applyT,
    ]
  );

  return (
    <section
      className="mentors"
      aria-labelledby="mentors-heading"
    >

      <div className="mentors-container">

        {/* HEADER */}
        <div className="mentors-top">

          <p className="mentors-tag">
            Expert Faculty
          </p>

          <h2 id="mentors-heading">

            Meet Key People <span>Behind</span>

          </h2>

          <p className="mentors-desc">

            Industry experts teaching you
            real-world skills at Jains Computer,
            Jhotwara, Jaipur.

          </p>

          <div
            className="mentors-filters"
            role="group"
            aria-label="Filter mentors"
          >

            <button className="active">
              All
            </button>

            <button>Design</button>

            <button>Media</button>

            <button>Finance</button>

            <button>Engineering</button>

            <button>IT</button>

            <button>Placement</button>

          </div>

        </div>

        {/* MAIN */}
        <div className="mentors-layout">

          {/* FEATURED */}
          <article
            className="mentor-card mentor-featured"
            aria-label={`${featuredMentor.name} - ${featuredMentor.role}`}
          >

            <div className="mentor-img-wrap">

              <Image
                src={featuredMentor.img}
                alt={`${featuredMentor.name} - ${featuredMentor.role}`}
                width={500}
                height={420}
                priority
              />

            </div>

            <div className="mentor-content">

              <span className="mentor-role">
                {featuredMentor.role}
              </span>

              <h3>
                {featuredMentor.name}
              </h3>

              <p>
                {featuredMentor.desc}
              </p>

              <div className="mentor-tags">

                {featuredMentor.tags.map(
                  (tag, idx) => (
                    <span key={idx}>
                      {tag}
                    </span>
                  )
                )}

              </div>

            </div>

          </article>

          {/* CAROUSEL */}
          <div className="mentors-carousel-wrap">

            <div
              className="mentors-carousel-viewport"
              onMouseEnter={() =>
                pauseAuto(false)
              }
              onMouseLeave={() => {

                if (!isDragging.current) {

                  isRunning.current = true;

                }

              }}
              onMouseDown={(e) =>
                startDrag(e.clientX)
              }
              onTouchStart={(e) =>
                startDrag(e.touches[0].clientX)
              }
            >

              <div
                className="mentors-carousel-track"
                ref={trackRef}
              >

                {tripled.map((mentor) => (

                  <article
                    className="mentor-card mentor-carousel-card"
                    key={mentor._uid}
                    aria-label={`${mentor.name} - ${mentor.role}`}
                  >

                    <div className="mentor-img-wrap">

                      <Image
                        src={mentor.img}
                        alt={`${mentor.name} - ${mentor.role}`}
                        width={300}
                        height={300}
                        draggable={false}
                      />

                    </div>

                    <div className="mentor-content">

                      <span className="mentor-role">
                        {mentor.role}
                      </span>

                      <h3>
                        {mentor.name}
                      </h3>

                      <p>
                        {mentor.desc}
                      </p>

                      <div className="mentor-tags">

                        {mentor.tags.map(
                          (tag, idx) => (
                            <span key={idx}>
                              {tag}
                            </span>
                          )
                        )}

                      </div>

                    </div>

                  </article>

                ))}

              </div>

            </div>

            {/* DOTS */}
            <nav
              className="mentor-dots"
              aria-label="Mentor carousel navigation"
            >

              {carouselMentors.map(
                (_, i) => (

                  <button
                    key={i}
                    className={`mentor-dot${
                      activeDot === i
                        ? " active"
                        : ""
                    }`}
                    aria-label={`Go to mentor ${i + 1}`}
                    aria-current={
                      activeDot === i
                        ? "true"
                        : undefined
                    }
                    onClick={() =>
                      goToCard(i)
                    }
                  />

                )
              )}

            </nav>

          </div>

        </div>

      </div>

    </section>
  );
};

export default WhyMentors;