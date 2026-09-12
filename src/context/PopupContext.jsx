"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const timerRef = useRef(null);

  const openPopup = (course = "") => {
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setSelectedCourse(course);
    setOpen(true);
  };

  const closePopup = () => {
    setOpen(false);
  };

 
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setOpen((currentOpen) => {
        if (currentOpen) return currentOpen;
        return true;
      });
      timerRef.current = null;
    }, 15000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <PopupContext.Provider
      value={{
        open,
        openPopup,
        closePopup,
        selectedCourse,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => useContext(PopupContext);