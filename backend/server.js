const { ROWS, COLS } = require("../shared/constants.js");
const { Pool } = require("pg");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "place",
  password: "postgres",
  port: 5432,
});

app.use(cors());
app.use(express.json());

let grid = Array(ROWS)
  .fill(null)
  .map(() => Array(COLS).fill("#ffffff"));

async function loadGrid() {
  const result = await pool.query("SELECT row, col, color FROM pixels");
  result.rows.forEach(({ row, col, color }) => {
    grid[row][col] = color;
  });
}

app.get("/grid", (req, res) => {
  res.json(grid);
});

io.on("connection", (socket) => {
  console.log("Użytkownik połączony:", socket.id);
  socket.emit("grid", grid);

  socket.on("place_pixel", async ({ row, col, color }) => {
    grid[row][col] = color;
    io.emit("pixel_placed", { row, col, color });

    await pool.query(
      "INSERT INTO pixels (row, col, color) VALUES ($1, $2, $3) ON CONFLICT (row, col) DO UPDATE SET color = $3",
      [row, col, color],
    );
  });

  socket.on("disconnect", () => {
    console.log("Użytkownik rozłączony:", socket.id);
  });
});

loadGrid().then(() => {
  server.listen(3000, () => {
    console.log("Serwer działa na http://localhost:3000");
  });
});
