const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // adres frontendu
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// tymczasowa mapa w pamięci (bez bazy na razie)
const ROWS = 20;
const COLS = 20;
let grid = Array(ROWS)
  .fill(null)
  .map(() => Array(COLS).fill("#ffffff"));

// REST API - pobierz mapę
app.get("/grid", (req, res) => {
  res.json(grid);
});

// WebSocket - jak ktoś się połączy
io.on("connection", (socket) => {
  console.log("Użytkownik połączony:", socket.id);

  // wyślij aktualną mapę nowemu użytkownikowi
  socket.emit("grid", grid);

  // jak ktoś postawi pixel
  socket.on("place_pixel", ({ row, col, color }) => {
    grid[row][col] = color;
    // wyślij do WSZYSTKICH
    io.emit("pixel_placed", { row, col, color });
  });

  socket.on("disconnect", () => {
    console.log("Użytkownik rozłączony:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Serwer działa na http://localhost:3000");
});
