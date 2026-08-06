// Mengimpor library express yang sudah diinstal
const express = require("express");
const cors = require("cors");
const db = require("./db"); // mengimpor koneksi database

// Membuat instance aplikasi Express
const app = express();
const PORT = 3000;

app.use(cors());          // mengizinkan request dari origin lain
// Middleware bawaan agar Express bisa membaca JSON dari request
app.use(express.json());

// Route paling dasar, hanya untuk mengecek server hidup
app.get("/", (req, res) => {
  res.send("Selamat datang di API TokoAdopt!");
});

// Menjalankan server dan mendengarkan di PORT yang ditentukan
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

app.get("/api/ping", (req, res) => {
  // res.json() otomatis mengubah objek JavaScript menjadi format JSON
  res.json({
    status: "success",
    message: "pong",
    waktuServer: new Date().toISOString(),
  });
});

// Variabel penghitung id agar produk baru selalu punya id unik
let idBerikutnya = 4;


// GET /api/products -> mengambil semua produk
app.get("/api/products", (req, res) => {
  const data = db.prepare("SELECT * FROM produk").all();
  res.json({ status: "success", data });
});

// GET /api/products/search?nama={nama_product} -> mencari produk berdasarkan nama
app.get("/api/products/search", (req, res) => {
  const namaQuery = req.query.nama;

  if (!namaQuery) {
    return res.status(400).json({ status: "error", message: "Query parameter 'nama' wajib diisi" });
  }

  const hasil = produk.filter((p) =>
    p.nama.toLowerCase().includes(String(namaQuery).toLowerCase())
  );

  res.json({ status: "success", data: hasil });
});

// GET /api/products/:id -> mengambil satu produk berdasarkan id
app.get("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = db.prepare("SELECT * FROM produk WHERE id = ?").get(id);

  if (!item) {
    return res.status(404).json({ status: "error", message: "Produk tidak ditemukan" });
  }
  res.json({ status: "success", data: item });
});

// POST /api/products -> menambah produk baru
app.post("/api/products", (req, res) => {
  const { nama, harga } = req.body;
  if (!nama || !harga || harga <= 0) {
    return res.status(400).json({ status: "error", message: "Nama dan harga wajib diisi" });
  }

  const hasil = db
    .prepare("INSERT INTO produk (nama, harga) VALUES (?, ?)")
    .run(nama, harga);

  const produkBaru = { id: hasil.lastInsertRowid, nama, harga };
  res.status(201).json({ status: "success", data: produkBaru });

});

// PUT /api/products/:id -> memperbarui produk berdasarkan id
app.put("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const { nama, harga } = req.body;

  const hasil = db
    .prepare("UPDATE produk SET nama = ?, harga = ? WHERE id = ?")
    .run(nama, harga, id);

  if (hasil.changes === 0) {
    return res.status(404).json({ status: "error", message: "Produk tidak ditemukan" });
  }
  res.json({ status: "success", data: { id, nama, harga } });

});

// DELETE /api/products/:id -> menghapus produk berdasarkan id
app.delete("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const hasil = db.prepare("DELETE FROM produk WHERE id = ?").run(id);

  if (hasil.changes === 0) {
    return res.status(404).json({ status: "error", message: "Produk tidak ditemukan" });
  }
  res.json({ status: "success", message: `Produk id ${id} berhasil dihapus` });
});