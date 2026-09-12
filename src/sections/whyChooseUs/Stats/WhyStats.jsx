"use client";

import "./WhyStats.css";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

/* ICONS */
import ExcellenceIcone from "@/assets/Icon/Location.svg";
import computerIcone from "@/assets/Icon/Coursesfaq.svg";
import starIcone from "@/assets/Icon/Star.svg";
import buildingIcone from "@/assets/Icon/Placementfaq.svg";
import alwhyIcon from "@/assets/Icon/aiwhy.svg";

const statsData = [
    {
        icone: ExcellenceIcone,
        number: 26,
        suffix: "+",
        label: "Years of Excellence",
    },

    {
        icone: computerIcone,
        number: 10000,
        suffix: "+",
        label: "Students Trained",
    },

    {
        icone: starIcone,
        number: 500,
        suffix: "+",
        label: "5-Star Reviews",
    },

    {
        icone: buildingIcone,
        number: 6000,
        suffix: "",
        label: "Sq.Ft. Campus",
    },

    {
        icone: alwhyIcon,
        number: 0,
        suffix: "",
        label: "AI Powered Curriculum",
        text: "AI",
    },
];

const WhyStats = () => {

    const [start, setStart] = useState(false);

    const [counts, setCounts] = useState(
        statsData.map(() => 0)
    );

    const ref = useRef();

    useEffect(() => {

        const observer = new IntersectionObserver(([entry]) => {

            if (entry.isIntersecting) {
                setStart(true);
            }

        });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();

    }, []);

    useEffect(() => {

        if (!start) return;

        const interval = setInterval(() => {

            setCounts((prev) =>
                prev.map((val, i) => {

                    const target = statsData[i].number;

                    if (val >= target) {
                        return target;
                    }

                    return val + Math.ceil(target / 50);

                })
            );

        }, 30);

        return () => clearInterval(interval);

    }, [start]);

    return (
        <section className="stats-bar" ref={ref}>

            <div className="stats-inner">

                {statsData.map((item, i) => (

                    <div
                        className={`stat-item ${item.text ? "ai-center" : ""}`}
                        key={i}
                    >

                        <div className="iconn-box">

                            <Image
                                src={item.icone}
                                alt={item.label}
                                width={40}
                                height={40}
                            />

                        </div>

                        <div className="stat-text">

                            <strong className="stat-number">
                                {item.text
                                    ? item.text
                                    : `${counts[i].toLocaleString()}${item.suffix}`}
                            </strong>

                            <p>{item.label}</p>

                        </div>

                    </div>

                ))}

            </div>

        </section>
    );
};

export default WhyStats;