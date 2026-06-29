const PRIORITY = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

function getPriorityNotifications(notifications, n = 10) {
  return notifications
    .map((notification) => ({
      ...notification,
      priority: PRIORITY[notification.Type] || 0,
    }))
    .sort((a, b) => {
      if (b.priority !== a.priority) {
        return b.priority - a.priority;
      }

      return new Date(b.Timestamp) - new Date(a.Timestamp);
    })
    .slice(0, n);
}

module.exports = {
  getPriorityNotifications,
};