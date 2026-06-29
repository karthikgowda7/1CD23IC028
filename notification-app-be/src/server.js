const express = require("express");
const cors = require("cors");

const notificationRoutes = require("./routes/notifications");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/notifications", notificationRoutes);

app.listen(3001, () => {
  console.log("Server running on port 3001");
});