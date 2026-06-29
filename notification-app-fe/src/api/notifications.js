export async function fetchNotifications() {
  return {
    notifications: [
      {
        id: 1,
        type: "Placement",
        message: "Microsoft hiring drive",
        timestamp: "2026-04-22 17:51:18",
      },
      {
        id: 2,
        type: "Result",
        message: "Semester results announced",
        timestamp: "2026-04-22 17:50:00",
      },
      {
        id: 3,
        type: "Event",
        message: "Tech fest registration open",
        timestamp: "2026-04-22 17:40:00",
      },
    ],
  };
}