# Notification System Design
# Stage 1 - API Design

For the notification system, I would keep the API design straightforward and easy to extend later.

### Get Notifications

GET /notifications

This endpoint returns notifications for a student. Pagination should be supported using page and limit parameters so that the frontend does not have to load everything at once. It should also support filtering using notification_type.

Example:

GET /notifications?page=1&limit=10&notification_type=Placement

### Get Notification Details

GET /notifications/{id}

Returns complete information for a specific notification.

### Mark Notification as Read

PATCH /notifications/{id}/read

This updates the read status of a notification and helps maintain unread counts on the dashboard.

### Create Notification

POST /notifications

Used by the system or administrators to create new notifications.

### Authentication

All APIs should be protected using Bearer Token authentication since notifications are user-specific.

### Real-Time Updates

For real-time delivery, I would use WebSockets. This avoids constant polling from the frontend and allows students to receive updates immediately when new notifications are created.


# Stage 2 - Database Design

For this use case, PostgreSQL would be a suitable choice because the data is structured and relational in nature. It also provides strong indexing support and reliable transaction handling.

### Students Table

* id (Primary Key)
* email

### Notifications Table

* id (Primary Key)
* student_id (Foreign Key)
* notification_type
* message
* is_read
* created_at

The relationship between students and notifications is one-to-many, where a student can receive multiple notifications.

### Indexing Strategy

Since students will frequently access unread notifications, I would create a composite index on:

(student_id, is_read, created_at)

This helps the database quickly locate unread notifications and return them in the required order.

Another useful index would be:

(notification_type, created_at)

which helps when filtering notifications by category.

### Future Scaling

If notification volume grows significantly, older records can be archived and the notifications table can be partitioned based on creation date.


# Stage 3 - Query Optimization

The query is functionally correct:

SELECT *
FROM notifications
WHERE studentId = 1042
AND isRead = false
ORDER BY createdAt ASC;

However, with millions of notifications, performance can degrade because the database may need to scan a large number of rows before sorting the result.

To improve performance, I would create the following composite index:

CREATE INDEX idx_notifications_student_read_created
ON notifications(student_id, is_read, created_at);

This index aligns closely with the filtering and sorting conditions used in the query.

I would avoid indexing every column because indexes are not free. While they improve reads, they also increase storage requirements and slow down insert and update operations.

To identify students who received Placement notifications in the last seven days:

SELECT DISTINCT student_id
FROM notifications
WHERE notification_type = 'Placement'
AND created_at >= NOW() - INTERVAL '7 days';

# Stage 4 - Scaling Strategy

At a small scale, directly querying the database works fine. As traffic grows, however, repeatedly fetching notification data from the database can become expensive.

To reduce database load, I would introduce Redis as a caching layer.

Flow:

Client → API → Redis → Database

Frequently accessed notification data can be served directly from cache, while cache misses are fetched from the database and stored for future requests.

Additional improvements:

* Pagination to limit payload size
* Read replicas for heavy read traffic
* WebSockets for live updates

Benefits:

* Faster response times
* Reduced database pressure
* Better user experience

One challenge with this approach is cache invalidation, which needs to be handled carefully whenever notification data changes.

# Stage 5 - Distributed Systems

The current approach may not scale well when notifications need to be delivered to thousands of students simultaneously.

For example, sending emails synchronously after creating notifications can increase response time and introduce failures if an external email service becomes unavailable.

A better approach would be:

Notification Service
↓
Save Notification
↓
Publish Event to Queue
↓
Worker Processes
↓
Send Emails

RabbitMQ or Kafka can be used as the message broker.

I would keep notification persistence and email delivery as separate operations. The notification should first be stored successfully in the database, and email delivery can happen asynchronously through worker services.

This approach improves scalability, fault tolerance, and retry capability while keeping the API responsive.


