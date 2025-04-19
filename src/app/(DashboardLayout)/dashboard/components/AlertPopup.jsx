"use client";
import React from "react";
import { Card, CardBody } from "reactstrap";
import { useAlert } from "../../../../context/AlertContext";

const AlertPopup = () => {
  const { alerts, showPopup, setShowPopup, markAllAsRead } = useAlert();

  if (!showPopup) return null;

  return (
    <Card
      className="position-fixed"
      style={{
        top: "80px",
        right: "30px",
        zIndex: 1050,
        width: "300px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
    >
      <CardBody>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="mb-0">Alerts</h6>
          <button className="btn btn-sm btn-link" onClick={markAllAsRead}>
            Mark all as read
          </button>
        </div>
        <ul className="list-unstyled mb-0">
            {alerts.length === 0 ? (
                <li className="text-muted">No alerts</li>
            ) : (
                alerts.map((a, idx) => (
                <li key={idx} className={!a.read ? "fw-bold mb-2" : "text-muted mb-2"}>
                    {a.message}
                    <br />
                    <small className="text-muted">{a.date} at {a.time}</small>
                </li>
                ))
            )}
        </ul>
        <div className="text-end mt-2">
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => setShowPopup(false)}
          >
            Close
          </button>
        </div>
      </CardBody>
    </Card>
  );
};

export default AlertPopup;
