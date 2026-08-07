const Database = require("better-sqlite3");

// Membuat/membuka file database bernama tokoadopt.db
const db = new Database("P4Sport.db");

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

        if (jumlahProduk.total === 0 ){
            const tambahProduk = db.prepare(
                "INSERT INTO produk (nama, harga) VALUES (?, ?)"
            );

            // Data awal, mirip dengan harga yang dipakai di Hari 3
            tambahProduk.run("Nike Mercurial CR7", 7777777);
            tambahProduk.run("Kaos Kaki",  200000);
            tambahProduk.run("Deker", 150000);
            tambahProduk.run("Sarung Tangan Kiper", 350000);
            tambahProduk.run("Baju Bekas Ronaldo", 7777777);
        
            console.log("Data awal produk berhasil dimasukkan ke database.");
        }

        //uji coba sementara
        const semuaProduk = db.prepare("SELECT * FROM produk").all();
        console.log(semuaProduk);