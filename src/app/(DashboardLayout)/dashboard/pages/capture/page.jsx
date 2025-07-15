'use client';

import { useState } from 'react';
import { get, ref, child } from 'firebase/database';
import { database } from '@/lib/firebaseConfig';
import { useAlert } from '@/context/AlertContext'; // Adjust path if needed

const CaptureImage = () => {
  const [loading, setLoading] = useState(false);
  const { alerts } = useAlert(); // Access alerts from context

  const handleCapture = () => {
    const newTab = window.open('', '_blank');
    if (!newTab) {
      alert("Please allow pop-ups for this site.");
      return;
    }

    const dbRef = ref(database);
    get(child(dbRef, 'live_camera/url'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const imageUrl = snapshot.val();
          const urlWithTimestamp = `${imageUrl}/photo?timestamp=${Date.now()}`;
          newTab.location.href = urlWithTimestamp;
        } else {
          newTab.close();
          alert("No image URL found in the database.");
        }
      })
      .catch((error) => {
        console.error("Error fetching image URL:", error);
        newTab.close();
        alert("Failed to fetch image URL.");
      });
  };

  return (
    <div className="container py-5 text-center">
      <h2 className="mb-3">🌿 Tree Monitoring - Capture Latest Image</h2>
      <p className="lead mb-4">
        Click the button below to open the most recent snapshot captured by the field camera.
      </p>
      <button
        className="btn btn-primary btn-lg px-5"
        onClick={handleCapture}
        disabled={loading}
      >
        {loading ? 'Loading...' : '📸 Capture Image'}
      </button>

      {/* Alerts Section */}
      <div className="mt-5 text-start">
        <h4 className="mb-3">🚨 Current Alerts</h4>
        {alerts.length === 0 ? (
          <p className="text-muted">No alerts at the moment.</p>
        ) : (
          <ul className="list-group">
            {alerts.map((alert, index) => (
              <li key={index} className="list-group-item list-group-item-danger">
                <strong>{alert.message}</strong>
                <br />
                <small className="text-muted">
                  {alert.date} at {alert.time}
                </small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CaptureImage;
