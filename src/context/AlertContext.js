'use client';
import React, { createContext, useContext, useState } from 'react';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const addAlert = (message) => {
    // const now = new Date();
    // const newAlert = {
    //   message,
    //   read: false,
    //   time: now.toLocaleTimeString(),
    //   date: now.toLocaleDateString(),
    // };
  
    // setAlerts((prev) => {
    //   const updated = [newAlert, ...prev];
    //   return updated.slice(0, 5); // Keep only the latest 5
    // });
    setAlerts((prevAlerts) => {
      const isDuplicate = prevAlerts.some(
        (alert) => JSON.stringify(alert.message) === JSON.stringify(message)
      );
      if (isDuplicate) return prevAlerts;

      const newAlert = {
        message,
        read: false,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      return [...prevAlerts, newAlert];
    });
  
    setShowPopup(true);
  };
  
  const markAllAsRead = () => {
    setAlerts((prev) => prev.map((alert) => ({ ...alert, read: true })));
  };

  const clearAlerts = () => {
    setAlerts([]);
  };

  return (
    <AlertContext.Provider
      value={{ alerts, addAlert, showPopup, setShowPopup, markAllAsRead, clearAlerts }}
    >
      {children}
    </AlertContext.Provider>
  );
};
