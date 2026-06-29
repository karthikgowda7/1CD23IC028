import { useState, useEffect } from "react";

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setNotifications([
      {
        id: 1,
        title: "Placement Drive",
        message: "Company visiting campus",
        type: "Placement",
        timestamp: new Date().toISOString(),
      },
    ]);
  }, []);

  return {
    notifications,
    total: notifications.length,
    totalPages: 1,
    loading,
    error: null,
  };
}