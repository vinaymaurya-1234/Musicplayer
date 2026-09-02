const express = require("express");
const authRoutes = require("../src/routes/auth.routes");
const MusicRoutes = require("../src/routes/music.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://musicplayer-coral-two.vercel.app",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/music", MusicRoutes);
app.use("/api/album", MusicRoutes);

module.exports = app;