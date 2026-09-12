"use client";

import "./Reviews.css";

import { FaStar, FaPlay } from "react-icons/fa";

import {
    useState,
    useRef,
    useEffect,
    useCallback,
} from "react";

import Link from "next/link";

import Image from "next/image";

import googleLogo from "@/assets/Icon/search.png";

import DMLogo from "@/assets/image/Digital-Marketing.webp";
import tabassumcover from "@/assets/image/tabassum.webp";
import Antimacover from "@/assets/image/Antima.webp";
import Dimplecover from "@/assets/image/dimple.webp";
import Hemantcover from "@/assets/image/Hemant.webp";
import Parulcover from "@/assets/image/Parul.webp";
import paljaincover from "@/assets/image/pal-jain.webp";
import shersinghcover from "@/assets/image/sher-singh-cover-page.webp";
import Harshitacover from "@/assets/image/Harshita.webp";
import Nikitacover from "@/assets/image/Nikita-Shekhawat.webp";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const reviews = [
    {
        id: 0,
        title: "Digital Marketing",
        tag: "Student Review",
        name: "Yashika",
        role: "Digital Marketing",
        videoId: "eo4iMKdGg2c",
        image: DMLogo,
        text: "I found Jains Computer to do a digital marketing course in Jaipur. Their course and training program are very easy to understand. Now I'm confidently working with a D2C skincare brand in Jaipur.",
    },
    {
        id: 1,
        title: "Advanced Excel",
        tag: "Student Review",
        name: "Dimple Soni",
        role: "Advanced Excel",
        videoId: "10qPACs4f0s",
        image: Dimplecover,
        text: "I had a B.Com background but struggled with Excel beyond basic formulas. The Advanced Excel course at Jains Computer completely changed that. I learned pivot tables, VLOOKUP, and data dashboards in just a few weeks. I now handle MIS reports and data analysis at a finance company in Jaipur. Best decision for anyone wanting to grow in an office role.",
    },
    {
        id: 2,
        title: "Graphic Designing",
        tag: "Student Review",
        name: "Antima",
        role: "Graphic Designing",
        videoId: "zORUSXSF814",
        image: Antimacover,
        text: "I enrolled at Jains Computer to learn graphic design. Their course helped me grab freelance clients. Their trainers are very supportive and industry-focused.",
    },
    {
        id: 3,
        title: "Programming",
        tag: "Student Review",
        name: "Hemant Sharma",
        role: "Programming",
        videoId: "YYAxwIOAm8U",
        image: Hemantcover,
        text: "From zero coding knowledge to working as a junior web developer for a startup, this institute truly helped me learn computer programming skills.",
    },
    {
        id: 4,
        title: "Advance Excel",
        tag: "Student Review",
        name: "Harshita Thathera",
        role: "Excel",
        videoId: "6klIIUZU-CU",
        image: Harshitacover,
        text: "I used to take hours to do tasks in Excel that my seniors finished in minutes. After joining the Advanced Excel course at Jains Computer in Jhotwara, I learned macros, conditional formatting, and how to build automated reports. My manager noticed the difference within a month. If you're working in accounts or admin, this course will genuinely upgrade your daily work.",
    },
    {
        id: 5,
        title: "Govt Courses",
        tag: "Student Review",
        name: "Tabassum",
        role: "Government Courses",
        videoId: "Yb-lLnyixO0",
        image: tabassumcover,
        text: "I was looking for a government recognised computer certificate that could help with job applications and competitive exams. Jains Computer's government course covered all the required modules MS Office, internet basics, and typing in a structured way. The certificate I received from here has been accepted in every application I've submitted. Very thankful to the team in Jhotwara.",
    },
    {
        id: 6,
        title: "Web Design",
        tag: "Student Review",
        name: "Parul Chauhan",
        role: "Web Design",
        videoId: "Gvi3KZrOl1M",
        image: Parulcover,
        text: "I wanted to start a career in web design but didn't know where to begin. Jains Computer's website design course in Jhotwara taught me HTML, CSS, WordPress, and how to create responsive layouts. Within 3 months I was building websites for local businesses in Jaipur. The placement team helped me land my first client project. Worth every rupee.",
    },
    {
        id: 7,
        title: "Tally student",
        tag: "Student Review",
        name: "Sher Singh Nathawat",
        role: "Tally student",
        videoId: "56p-8dZdbuQ",
        image: shersinghcover, //pending
        text: "I run a small trading business in Jhotwara and was managing accounts manually in registers. After completing the Tally + GST course at Jains Computer, I shifted everything to TallyPrime GST filing, purchase entries, and monthly balance sheets. It saves me at least 2 hours every day. The trainers explained GST rules in very simple terms. Highly recommend to any business owner or accounts student",
    },
    {
        id: 8,
        title: "Digital Marketing Intern",
        tag: "Student Review",
        name: "Nikita Shekhawat",
        role: "Digital Marketing Intern",
        videoId: "5Dei6e_ajA8",
        image: Nikitacover, //pending
        text: "Had a great experience at Jains Computer during my Digital Marketing internship. Learned SEO, Social Media Marketing, and Google Ads through practical projects. Supportive mentors and a great learning environment. Highly recommended for Digital Marketing training in Jaipur.",
    },
    {
        id: 9,
        title: "Graphic Designing",
        tag: "Student Review",
        name: "Pal Jain",
        role: "Graphic Designing",
        videoId: "wi4aQtMMsb0",
        image: paljaincover,
        text: " I enrolled in a graphic design course at Jains Computer. Trainers explained concepts in a very simple way. I now design creatives for an e-commerce accessories brand in Rajasthan.",
    },
];

/* Triple with unique _uid per copy */
const tripled = [
    ...reviews.map((r) => ({ ...r, _uid: `a-${r.id}` })),
    ...reviews.map((r) => ({ ...r, _uid: `b-${r.id}` })),
    ...reviews.map((r) => ({ ...r, _uid: `c-${r.id}` })),
];

const AUTO_SPEED = 0.35;
const RESUME_DELAY = 2000;

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
const Reviews = () => {
    const [playingUid, setPlayingUid] = useState(null);
    const [activeDot, setActiveDot] = useState(0);
    const activeDotRef = useRef(0);

    const wrapperRef = useRef(null);
    const rowRef = useRef(null);
    const posRef = useRef(0);
    const rafRef = useRef(null);
    const isRunning = useRef(true);
    const pauseTimer = useRef(null);
    const lastTimeRef = useRef(null);

    /* drag refs */
    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const posAtStart = useRef(0);
    const lastX = useRef(0);
    const dragVel = useRef(0);
    const didDrag = useRef(false);

    /* keep playingUid readable inside RAF without re-registering loop */
    const playingUidRef = useRef(null);
    useEffect(() => {
        playingUidRef.current = playingUid;
        /* When a video starts playing — kill any active drag immediately */
        if (playingUid) {
            isDragging.current = false;
            if (wrapperRef.current) wrapperRef.current.style.cursor = "default";
        }
    }, [playingUid]);

    /* ── helpers ── */
    const getCardStep = useCallback(() => {
        const card = rowRef.current?.querySelector(".review-card");
        if (!card) return 325;
        const gap = parseFloat(getComputedStyle(rowRef.current).gap) || 25;
        return card.offsetWidth + gap;
    }, []);

    const getSetWidth = useCallback(
        () => getCardStep() * reviews.length,
        [getCardStep]
    );

    const applyT = useCallback(() => {
        if (rowRef.current)
            rowRef.current.style.transform = `translateX(${posRef.current}px)`;
    }, []);

    const clamp = useCallback(() => {
        const sw = getSetWidth();
        if (-posRef.current >= sw * 2) posRef.current += sw;
        if (-posRef.current < 0) posRef.current -= sw;
    }, [getSetWidth]);

    const initPos = useCallback(() => {
        posRef.current = -getSetWidth();
        applyT();
    }, [getSetWidth, applyT]);

    const pauseAuto = useCallback((autoResume = true) => {
        isRunning.current = false;
        if (pauseTimer.current) clearTimeout(pauseTimer.current);
        if (autoResume)
            pauseTimer.current = setTimeout(
                () => { isRunning.current = true; },
                RESUME_DELAY
            );
    }, []);

    /* ── RAF loop — single mount, never restarts ── */
    useEffect(() => {
        const t = setTimeout(initPos, 50);

        const loop = (timestamp) => {
            const delta = lastTimeRef.current
                ? Math.min((timestamp - lastTimeRef.current) / 16.67, 3)
                : 1;
            lastTimeRef.current = timestamp;

            if (isRunning.current && playingUidRef.current === null)
                posRef.current -= AUTO_SPEED * delta;

            clamp();
            applyT();

            const sw = getSetWidth();
            const step = getCardStep();
            if (step > 0) {
                const raw = Math.round((-posRef.current % sw) / step) % reviews.length;
                const nextDot =
                    (raw + reviews.length) % reviews.length;

                if (nextDot !== activeDotRef.current) {
                    activeDotRef.current = nextDot;
                    setActiveDot(nextDot);
                }
            }

            rafRef.current = requestAnimationFrame(loop);
        };

        rafRef.current = requestAnimationFrame(loop);
        window.addEventListener("resize", initPos);

        return () => {
            clearTimeout(t);
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", initPos);
            if (pauseTimer.current) clearTimeout(pauseTimer.current);
        };

    }, []);

    const onMouseEnter = useCallback(() => {
        if (!playingUidRef.current) pauseAuto(false);
    }, [pauseAuto]);

    const onMouseLeave = useCallback(() => {
        if (!isDragging.current && !playingUidRef.current)
            isRunning.current = true;
    }, []);

    /* ── drag core ── */
    const startDrag = useCallback((clientX) => {
        /* NEVER start drag when video is playing */
        if (playingUidRef.current) return;
        isDragging.current = true;
        didDrag.current = false;
        dragStartX.current = clientX;
        posAtStart.current = posRef.current;
        lastX.current = clientX;
        dragVel.current = 0;
        pauseAuto(false);
        if (wrapperRef.current) wrapperRef.current.style.cursor = "grabbing";
    }, [pauseAuto]);

    const moveDrag = useCallback((clientX, event) => {
        if (!isDragging.current || playingUidRef.current) return;
        if (event) event.preventDefault();
        const delta = clientX - dragStartX.current;
        if (Math.abs(delta) > 5) didDrag.current = true;
        dragVel.current = clientX - lastX.current;
        lastX.current = clientX;
        posRef.current = posAtStart.current + delta;
        clamp();
    }, [clamp]);

    const endDrag = useCallback(() => {
        if (!isDragging.current) return;
        isDragging.current = false;
        if (wrapperRef.current && !playingUidRef.current)
            wrapperRef.current.style.cursor = "grab";

        if (playingUidRef.current) return; /* video is playing — no momentum */

        let momentum = dragVel.current * 0.5;
        let frames = 20;
        const run = () => {
            if (frames-- <= 0) { isRunning.current = true; return; }
            posRef.current += momentum;
            momentum *= 0.85;
            clamp();
            applyT();
            requestAnimationFrame(run);
        };
        run();
    }, [clamp, applyT]);

    /* ── global mouse/touch listeners ── */
    const onMouseMove = useCallback((e) => moveDrag(e.clientX), [moveDrag]);
    const onMouseUp = useCallback(() => endDrag(), [endDrag]);
    const onTouchMove = useCallback((e) => moveDrag(e.touches[0].clientX, e), [moveDrag]);
    const onTouchEnd = useCallback(() => endDrag(), [endDrag]);

    useEffect(() => {
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("touchmove", onTouchMove, { passive: false });
        window.addEventListener("touchend", onTouchEnd);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onTouchEnd);
        };
    }, [onMouseMove, onMouseUp, onTouchMove, onTouchEnd]);

    /* ── dot click ── */
    const goToCard = useCallback((idx) => {
        const sw = getSetWidth();
        const step = getCardStep();
        const target = -(sw + idx * step);
        const diff = target - posRef.current;
        const start = posRef.current;
        let frames = 30;
        pauseAuto(false);
        const slide = () => {
            frames--;
            const t = 1 - frames / 30;
            const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            posRef.current = start + diff * ease;
            applyT();
            if (frames > 0) requestAnimationFrame(slide);
            else isRunning.current = true;
        };
        requestAnimationFrame(slide);
    }, [getSetWidth, getCardStep, pauseAuto, applyT]);

    /* ── play ── */
    const handlePlay = useCallback((e, uid) => {
        e.stopPropagation();
        e.preventDefault();
        if (didDrag.current) return;
        /* close previous, open new — only one plays at a time */
        setPlayingUid(uid);
        isRunning.current = false;
        if (pauseTimer.current) clearTimeout(pauseTimer.current);
    }, []);

    /* ── close ── */
    const handleClose = useCallback((e) => {
        e.stopPropagation();
        e.preventDefault();
        setPlayingUid(null);
        isRunning.current = true;
        if (wrapperRef.current) wrapperRef.current.style.cursor = "grab";
    }, []);

    /* ── wrapper mouse/touch start ── */
    const onWrapperMouseDown = useCallback((e) => {
        if (playingUidRef.current) return;
        startDrag(e.clientX);
    }, [startDrag]);

    const onWrapperTouchStart = useCallback((e) => {
        if (playingUidRef.current) return;
        startDrag(e.touches[0].clientX);
    }, [startDrag]);

    /* ────────────────────────────────────────
       RENDER
    ──────────────────────────────────────── */
    return (
        <section
            className="reviews"
            aria-label="Student Reviews - Jains Computer Jaipur"
            itemScope
            itemType="https://schema.org/Organization"
        >
            <div className="reviews-container">
                <meta itemProp="name" content="Jains Computer" />
                <meta itemProp="aggregateRating" content="4.9" />

                {/* ── TOP BAR ── */}
                <div className="reviews-top" role="region" aria-label="Google Rating Summary">
                    <div className="left-section">
                        <div className="google-brand">
                            <Image src={googleLogo} alt="Google Reviews Logo" width={35} height={35} />
                            <span className="g-text">Google Review</span>
                        </div>
                        <div
                            className="rating-info"
                            itemScope
                            itemType="https://schema.org/AggregateRating"
                        >
                            <h3 itemProp="ratingValue" aria-label="Rating 4.9 out of 5">4.9</h3>
                            <div className="stars-wrapper">
                                <div className="starss" aria-hidden="true">
                                    {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                                </div>
                                <p>
                                    <span itemProp="reviewCount">600</span>+ reviews
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="divider" aria-hidden="true" />

                    <div className="center">
                        <h4>Verified On Google Maps Jains Computer</h4>
                        <p>All Reviews From Real Enrolled Students</p>
                    </div>

                    <div className="right" aria-label="Google Verified Badge">
                        <span aria-hidden="true">✔</span> Google Verified
                    </div>
                </div>

                {/* ── SCROLL WRAPPER ── */}
                <div
                    className={`reviews-wrapper${playingUid ? " video-active" : ""}`}
                    ref={wrapperRef}
                    role="region"
                    aria-label="Student Video Reviews Carousel"
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onMouseDown={onWrapperMouseDown}
                    onTouchStart={onWrapperTouchStart}
                >
                    <div
                        className="reviews-row"
                        ref={rowRef}
                        role="list"
                        aria-label="Student reviews list"
                    >
                        {tripled.map((r) => {
                            const isPlaying = playingUid === r._uid;

                            return (
                                <article
                                    className={`review-card${isPlaying ? " is-playing" : ""}`}
                                    key={r._uid}
                                    role="listitem"
                                    aria-label={`${r.name} - ${r.title} student review`}
                                    itemScope
                                    itemType="https://schema.org/Review"
                                >
                                    <meta itemProp="author" content={r.name} />
                                    <meta itemProp="reviewBody" content={r.text} />
                                    <meta itemProp="itemReviewed" content={`Jains Computer ${r.title} Course`} />

                                    <div className="media-box">

                                        {/* Cover layers — always in DOM, CSS toggles visibility */}
                                        <Image
                                            src={r.image}
                                            className="thumb cover-layer"
                                            alt={r.name}
                                            width={300}
                                            height={500}
                                            sizes="(max-width:768px) 75vw, 300px"
                                            draggable={false}
                                        />

                                        <div className="review-tags cover-layer" aria-hidden={isPlaying}>
                                            <span className="course">{r.title}</span>
                                            <span className="badge">{r.tag}</span>
                                        </div>

                                        <div className="overlay cover-layer" aria-hidden={isPlaying}>
                                            <button
                                                className="play-btn"
                                                aria-label={`Play ${r.name}'s ${r.title} review video`}
                                                onMouseUp={(e) => handlePlay(e, r._uid)}
                                                onTouchEnd={(e) => handlePlay(e, r._uid)}
                                            >
                                                <FaPlay aria-hidden="true" />
                                            </button>
                                        </div>

                                        <div className="review-content cover-layer" aria-hidden={isPlaying}>
                                            <div
                                                className="stars small"
                                                aria-label="5 out of 5 stars"
                                                itemProp="reviewRating"
                                                itemScope
                                                itemType="https://schema.org/Rating"
                                            >
                                                <meta itemProp="ratingValue" content="5" />
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar key={i} aria-hidden="true" />
                                                ))}
                                            </div>
                                            <p itemProp="reviewBody">{r.text}</p>
                                            <div className="review-user">
                                                <Image
                                                    src={r.image}
                                                    className="avatar-img"
                                                    alt={r.name}
                                                    width={32}
                                                    height={32}
                                                    draggable={false}
                                                />
                                                <div>
                                                    <strong itemProp="author">{r.name}</strong>
                                                    <span>{r.role}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* iframe — only mounted when this card is playing */}
                                        {isPlaying && (
                                            <iframe
                                                key={`${r._uid}-iframe`}
                                                className="videoes"
                                                src={`https://www.youtube.com/embed/${r.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
                                                title={`${r.name} ${r.title} Student Review - Jains Computer Jaipur`}
                                                frameBorder="0"
                                                allow="autoplay; fullscreen; encrypted-media; picture-in-picture; web-share"
                                                allowFullScreen
                                                loading="lazy"
                                            />
                                        )}

                                        {isPlaying && (
                                            <button
                                                className="video-close-btn"
                                                aria-label="Close video"
                                                onMouseUp={handleClose}
                                                onTouchEnd={handleClose}
                                            >
                                                ✕
                                            </button>
                                        )}

                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>

                {/* ── DOTS ── */}
                <nav className="dots-row" aria-label="Review carousel navigation">
                    {reviews.map((r, i) => (
                        <button
                            key={i}
                            className={`dot${activeDot === i ? " active" : ""}`}
                            aria-label={`Go to ${r.name}'s review`}
                            aria-current={activeDot === i ? "true" : undefined}
                            onClick={() => goToCard(i)}
                        />
                    ))}
                </nav>

                {/* ── VIEW MORE ── */}
                <div className="view-more">
                    <Link href="/why-choose-us" aria-label="View all student reviews at Jains Computer">
                        View More →
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Reviews;