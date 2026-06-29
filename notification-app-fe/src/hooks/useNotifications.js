import { useEffect, useState } from "react";
import { fetchNotifications } from "../api/notifications";

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchNotifications();
        setNotifications(data.notifications || []);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return {
    notifications,
    total: notifications.length,
    totalPages: 1,
    loading,
    error: null,
  };
}