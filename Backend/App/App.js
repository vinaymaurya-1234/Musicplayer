const express = require("express");
const authRoutes = require("../src/routes/auth.routes");
const MusicRoutes = require("../src/routes/music.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "https://musicplayer-coral-two.vercel.app",
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Musicplayer backend is running",
  });
});

app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.originalUrl);
  console.log("ORIGIN:", req.headers.origin);
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/music", MusicRoutes);
app.use("/api/album", MusicRoutes);

module.exports = app;