const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = "fresse-local-secret-2024";
const USERS_FILE = path.join(__dirname, "users.json");
const PRICES_FILE = path.join(__dirname, "prices.json");
const EXTERNAL_API = "https://fresse-api.onrender.com/api";

app.use(cors());
app.use(express.json());

// --- Helpers ---

function loadUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function loadPrices() {
  if (!fs.existsSync(PRICES_FILE)) return null;
  return JSON.parse(fs.readFileSync(PRICES_FILE, "utf8"));
}

function savePrices(prices) {
  fs.writeFileSync(PRICES_FILE, JSON.stringify(prices, null, 2));
}

function verifyToken(req, res) {
  const auth = req.headers.authorization;
  if (!auth) {
    res.status(401).json({ error: "Unauthorized" });
    return null;
  }
  try {
    return jwt.verify(auth.replace("Bearer ", ""), JWT_SECRET);
  } catch {
    res.status(401).json({ error: "Invalid token" });
    return null;
  }
}

// --- Auth Routes ---

// POST /api/auth/register
app.post("/api/auth/register", async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: "Email, password and name are required" });
  }

  const users = loadUsers();
  if (users.find((u) => u.email === email)) {
    return res.status(409).json({ error: "Email already registered" });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = { id: Date.now(), email, password: hashed, name, role: "user" };
  users.push(user);
  saveUsers(users);

  const token = jwt.sign({ id: user.id, email, name, role: "user" }, JWT_SECRET, { expiresIn: "7d" });
  res.status(201).json({ token, name });
});

// POST /api/auth/login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const users = loadUsers();
  const user = users.find((u) => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Väärä sähköposti tai salasana" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
  res.json({ token, name: user.name });
});

// --- Prices Route ---

// GET /api/prices  (auth required)
app.get("/api/prices", async (req, res) => {
  const user = verifyToken(req, res);
  if (!user) return;

  // Return cached prices if available
  const cached = loadPrices();
  if (cached) return res.json(cached);

  // Generate prices once from external ingredient list
  try {
    const response = await fetch(`${EXTERNAL_API}/ingredients`);
    const ingredients = await response.json();

    // Fixed prices per ingredient (reproducible, not random)
    const basePrice = 0.5;
    const prices = ingredients.map((ing, i) => ({
      item_id: ing.id,
      price: parseFloat((basePrice + (i % 10) * 0.2 + 0.3).toFixed(2)),
    }));

    savePrices(prices);
    res.json(prices);
  } catch {
    res.json([]);
  }
});

// --- Start ---
app.listen(PORT, () => {
  console.log(`\n✅ Local auth server running at http://localhost:${PORT}`);
  console.log(`   Register: POST http://localhost:${PORT}/api/auth/register`);
  console.log(`   Login:    POST http://localhost:${PORT}/api/auth/login\n`);
});
