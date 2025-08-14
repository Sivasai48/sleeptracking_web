const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const session = require("express-session");

const app = express();

// ✅ Allow requests from frontend on both ports
const allowedOrigins = ["http://localhost:8080", "http://localhost:8086"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: "supersecretkey",
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: 'lax', // Important for CORS
    secure: false    // set to true if using HTTPS
  }
}));

// ✅ MongoDB connection
mongoose.connect("mongodb://localhost:27017/sleep_tracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("MongoDB Error:", err));

// ✅ Schemas and Models
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model("User", UserSchema);

const SleepEntrySchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  date: String,
  sleepTime: String,
  wakeTime: String,
  duration: Number,
});
const SleepEntry = mongoose.model("SleepEntry", SleepEntrySchema);

// ----------------- Auth Routes -----------------
app.post("/api/auth/register", async (req, res) => {
  const { username, password } = req.body;
  const exists = await User.findOne({ username });
  if (exists) return res.status(400).json({ error: "User already exists" });

  const hash = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hash });
  await user.save();

  req.session.userId = user._id;
  res.json({ message: "Registered", userId: user._id });
});

app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  req.session.userId = user._id;
  res.json({ message: "Logged in", userId: user._id });
});

app.post("/api/auth/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out" });
});

// ----------------- Auth Middleware -----------------
function requireAuth(req, res, next) {
  if (!req.session.userId) return res.status(401).json({ error: "Unauthorized" });
  next();
}

// ----------------- Sleep Entry Routes -----------------
app.get("/api/sleep", requireAuth, async (req, res) => {
  const entries = await SleepEntry.find({ userId: req.session.userId }).sort({ date: -1 });
  res.json(entries);
});

app.post("/api/sleep", requireAuth, async (req, res) => {
  const { date, sleepTime, wakeTime, duration } = req.body;
  const newEntry = new SleepEntry({ userId: req.session.userId, date, sleepTime, wakeTime, duration });
  await newEntry.save();
  res.json(newEntry);
});

app.delete("/api/sleep/:id", requireAuth, async (req, res) => {
  await SleepEntry.deleteOne({ _id: req.params.id, userId: req.session.userId });
  res.json({ message: "Deleted" });
});

// ✅ Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));