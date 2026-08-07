const Database = require("better-sqlite3");

// Membuat/membuka file database bernama tokoadopt.db
const db = new Database("P4Sport.db");

const kolomYangAda = new Set(
  db.prepare("PRAGMA table_info(produk)").all().map((kolom) => kolom.name)
);

const skemaProduk = [
  ["gambar", "TEXT"],
  ["detail", "TEXT"],
  ["kategori", "TEXT"],
  ["size", "TEXT"],
  ["stok", "TEXT"],
  ["diskon", "INTEGER DEFAULT 0"],
];

for (const [namaKolom, definisi] of skemaProduk) {
  if (!kolomYangAda.has(namaKolom)) {
    db.exec(`ALTER TABLE produk ADD COLUMN ${namaKolom} ${definisi}`);
  }
}

//Membuat tabel 'produk' jika belum ada (dijalankan sekali saat server start)
db.exec(`
    CREATE TABLE IF NOT EXISTS produk (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nama TEXT NOT NULL,
        harga INTEGER NOT NULL
    )
`);

module.exports = db;

const jumlahProduk = db.prepare("SELECT COUNT(*) AS total FROM produk").get();

if (jumlahProduk.total === 0) {
  const tambahProduk = db.prepare(
    "INSERT INTO produk (nama, harga, gambar, detail, kategori, size, stok, diskon) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
  );

  const produkAwal = [
    [
      "Nike Mercurial CR7",
      7777777,
      "assets/images/Sepatu cr7.jpg.jpeg",
      "Sepatu sepak bola premium dengan sole responsif untuk sprint dan kontrol bola yang lebih presisi.",
      "Sepatu",
      "UK 39-44",
      "Stok ready",
      90,
    ],
    [
      "Kaos Kaki Adidas",
      200000,
      "assets/images/kaos kaki adidas.jpg.jpeg",
      "Kaos kaki olahraga berbahan lembut dan anti slip untuk kenyamanan saat latihan maupun pertandingan.",
      "Aksesoris",
      "S-M-L",
      "Stok ready",
      15,
    ],
    [
      "Bola Adidas",
      350000,
      "assets/images/Bola Adidas.webp",
      "Bola resmi berkualitas tinggi dengan grip stabil dan desain premium untuk latihan maupun matchday.",
      "Bola",
      "Size 5",
      "Stok ready",
      12,
    ],
    [
      "Deker Bola",
      150000,
      "assets/images/deker bola.jpg.jpeg",
      "Deker bola ringan untuk latihan kontrol dan teknik dasar dengan permukaan yang nyaman.",
      "Bola",
      "Size 4",
      "Stok terbatas",
      0,
    ],
    [
      "Sarung Tangan Kiper",
      350000,
      "assets/images/sarung tangan.jpg.jpeg",
      "Sarung tangan kiper dengan pegangan kuat dan perlindungan maksimal saat menyelamatkan tembakan.",
      "Proteksi",
      "M-L",
      "Stok ready",
      10,
    ],
    [
      "Jersey Ronaldo",
      7777777,
      "assets/images/baju ronaldo.webp",
      "Jersey premium dengan material breathable dan desain modern yang cocok untuk tampil percaya diri.",
      "Jersey",
      "S-XL",
      "Stok ready",
      20,
    ],
  ];

  for (const produk of produkAwal) {
    tambahProduk.run(...produk);
  }

  console.log("Data awal produk berhasil dimasukkan ke database.");
} else {
  const produkTambahan = [
    {
      nama: "Sepatu Futsal Lite",
      harga: 650000,
      gambar: "assets/images/Sepatu cr7.jpg.jpeg",
      detail: "Sepatu futsal ringan dengan desain fleksibel dan kenyamanan maksimal untuk gerakan cepat.",
      kategori: "Sepatu",
      size: "39-44",
      stok: "Stok ready",
      diskon: 20,
    },
    {
      nama: "Jersey Timnas Home",
      harga: 450000,
      gambar: "assets/images/baju ronaldo.webp",
      detail: "Jersey timnas dengan material breathable dan warna khas untuk tampil sporty di lapangan.",
      kategori: "Jersey",
      size: "S-XL",
      stok: "Stok ready",
      diskon: 15,
    },
    {
      nama: "Bola Training Pro",
      harga: 280000,
      gambar: "assets/images/Bola Adidas.webp",
      detail: "Bola latihan tahan lama dengan grip stabil dan cocok untuk sesi rutin maupun pemanasan.",
      kategori: "Bola",
      size: "Size 4",
      stok: "Stok terbatas",
      diskon: 10,
    },
    {
      nama: "Pelindung Lutut Sport",
      harga: 180000,
      gambar: "assets/images/sarung tangan.jpg.jpeg",
      detail: "Pelindung lutut yang nyaman dipakai untuk latihan fisik dan perlindungan saat aktivitas olahraga.",
      kategori: "Proteksi",
      size: "M-L",
      stok: "Stok ready",
      diskon: 5,
    },
  ];

  const cekProduk = db.prepare("SELECT 1 FROM produk WHERE LOWER(nama) = LOWER(?)");

  for (const item of produkTambahan) {
    const ada = cekProduk.get(item.nama);
    if (!ada) {
      db.prepare(
        "INSERT INTO produk (nama, harga, gambar, detail, kategori, size, stok, diskon) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
      ).run(
        item.nama,
        item.harga,
        item.gambar,
        item.detail,
        item.kategori,
        item.size,
        item.stok,
        item.diskon
      );
    }
  }
}

//uji coba sementara
const semuaProduk = db.prepare("SELECT * FROM produk").all();
console.log(semuaProduk);