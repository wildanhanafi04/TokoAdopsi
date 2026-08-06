const Database = require("better-sqlite3");

// Membuat/membuka file database bernama tokoadopt.db
const db = new Database("tokoadopt.db");

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
            tambahProduk.run("Abdul", 90000);
            tambahProduk.run("Asep",  100000);
            tambahProduk.run("Ironi", 140000);
            tambahProduk.run("Paul", 90000);
            tambahProduk.run("Rizki", 130000);
            tambahProduk.run("Rusdi", 110000);
            tambahProduk.run("Saiful",145000);
            tambahProduk.run("Ucup", 90000);
        
            console.log("Data awal produk berhasil dimasukkan ke database.");
        }

        //uji coba sementara
        const semuaProduk = db.prepare("SELECT * FROM produk").all();
        console.log(semuaProduk);