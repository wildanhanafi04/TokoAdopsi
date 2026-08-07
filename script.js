const API_URL = "https://didactic-carnival-jjxvgg7vr7gqfpjwq-3000.app.github.dev/api/products";

const produkDefault = [
  {
    nama: "Nike Mercurial CR7",
    harga: 7777777,
    kategori: "Sepatu",
    detail: "Bahan ringan dan responsif untuk sprint cepat.",
    diskon: 90,
    size: "UK 39-44",
    stok: "Stok ready",
    gambar: "assets/images/Sepatu cr7.jpg.jpeg",
  },
  {
    nama: "Kaos Kaki Adidas",
    harga: 200000,
    kategori: "Aksesoris",
    detail: "Pola grip yang nyaman untuk latihan dan matchday.",
    diskon: 15,
    size: "S-M-L",
    stok: "Stok ready",
    gambar: "assets/images/kaos kaki adidas.jpg.jpeg",
  },
  {
    nama: "Bola Adidas",
    harga: 350000,
    kategori: "Bola",
    detail: "Bola resmi dengan desain premium dan grip presisi untuk latihan maupun pertandingan.",
    diskon: 12,
    size: "Size 5",
    stok: "Stok ready",
    gambar: "assets/images/Bola Adidas.webp",
  },
  {
    nama: "Deker Bola",
    harga: 150000,
    kategori: "Bola",
    detail: "Tekstur permukaan presisi untuk kontrol bola.",
    diskon: 0,
    size: "Size 4",
    stok: "Stok terbatas",
    gambar: "assets/images/deker bola.jpg.jpeg",
  },
  {
    nama: "Sarung Tangan Kiper",
    harga: 350000,
    kategori: "Proteksi",
    detail: "Cocok untuk penyelamatan cepat dan pegangan stabil.",
    diskon: 10,
    size: "M-L",
    stok: "Stok ready",
    gambar: "assets/images/sarung tangan.jpg.jpeg",
  },
  {
    nama: "Jersey Ronaldo",
    harga: 7777777,
    kategori: "Jersey",
    detail: "Material premium dan desain modern untuk tampil beda.",
    diskon: 20,
    size: "S-XL",
    stok: "Stok ready",
    gambar: "assets/images/baju ronaldo.webp",
  },
];

function pilihGambarProduk(nama) {
  const namaProduk = String(nama || "").toLowerCase();

  if (namaProduk.includes("sepatu") || namaProduk.includes("mercurial") || namaProduk.includes("cr7")) {
    return "assets/images/Sepatu cr7.jpg.jpeg";
  }

  if (namaProduk.includes("kaos kaki")) {
    return "assets/images/kaos kaki adidas.jpg.jpeg";
  }

  if (namaProduk.includes("bola adidas") || namaProduk === "bola adid" || namaProduk.includes("bola adid")) {
    return "assets/images/Bola Adidas.webp";
  }

  if (namaProduk.includes("deker") || namaProduk.includes("bola")) {
    return "assets/images/deker bola.jpg.jpeg";
  }

  if (namaProduk.includes("sarung") || namaProduk.includes("kiper")) {
    return "assets/images/sarung tangan.jpg.jpeg";
  }

  if (namaProduk.includes("jersey") || namaProduk.includes("ronaldo") || namaProduk.includes("baju")) {
    return "assets/images/baju ronaldo.webp";
  }

  return "assets/images/deker bola.jpg.jpeg";
}

function formatRupiah(nilai) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(nilai);
}

let keranjang = [];

function renderKeranjang() {
  const isiKeranjang = document.getElementById("isi-keranjang");
  const subtitle = document.getElementById("keranjang-subtitle");
  const totalKeranjang = document.getElementById("total-keranjang");
  const labelKeranjang = document.querySelector("#tombol-keranjang");

  if (!isiKeranjang || !subtitle || !totalKeranjang || !labelKeranjang) {
    return;
  }

  const totalItem = keranjang.reduce((jumlah, item) => jumlah + item.qty, 0);
  const totalHarga = keranjang.reduce((jumlah, item) => jumlah + item.harga * item.qty, 0);

  labelKeranjang.textContent = `Keranjang (${totalItem})`;

  if (keranjang.length === 0) {
    subtitle.textContent = "Belum ada produk";
    isiKeranjang.innerHTML = '<p class="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">Belum ada item yang ditambahkan ke keranjang.</p>';
    totalKeranjang.textContent = formatRupiah(0);
    return;
  }

  subtitle.textContent = `${totalItem} item dipilih`;
  isiKeranjang.innerHTML = keranjang
    .map((item) => `
      <div class="mb-3 flex items-start justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <div>
          <p class="font-semibold text-slate-800">${item.nama}</p>
          <p class="text-sm text-slate-500">Qty: ${item.qty}</p>
        </div>
        <p class="text-sm font-bold text-[#ff3b30]">${formatRupiah(item.harga * item.qty)}</p>
      </div>
    `)
    .join("");
  totalKeranjang.textContent = formatRupiah(totalHarga);

  isiKeranjang.insertAdjacentHTML(
    "beforeend",
    `
      <div class="mt-4 border-t border-slate-200 pt-4">
        <button id="btn-checkout" class="w-full rounded-xl bg-[#7CFF5B] px-3 py-2 text-sm font-semibold text-[#0f172a] transition hover:bg-[#6ee84f]">
          Checkout
        </button>
      </div>
    `
  );
}

function tambahKeKeranjang(nama, harga, gambar) {
  const produkYangAda = keranjang.find((item) => item.nama === nama);

  if (produkYangAda) {
    produkYangAda.qty += 1;
  } else {
    keranjang.push({ nama, harga, gambar, qty: 1 });
  }

  renderKeranjang();
}

function buatKartuProduk(item) {
  const kartu = document.createElement("div");
  kartu.className = "football-card rounded-[24px] border border-slate-200 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg";
  kartu.dataset.nama = item.nama;
  kartu.dataset.harga = Number(item.harga || 0);
  kartu.dataset.gambar = item.gambar || pilihGambarProduk(item.nama);

  const harga = Number(item.harga || 0);
  const diskon = Number(item.diskon || 0);
  const badge = diskon > 0 ? `Diskon ${diskon}%` : "Best Seller";
  const gambar = item.gambar || pilihGambarProduk(item.nama);
  const gambarFinal = gambar || pilihGambarProduk(item.nama);
  const detail = item.detail || "Produk pilihan yang siap dipakai saat latihan atau matchday.";
  const kategori = item.kategori || "Perlengkapan";
  const size = item.size || "Ukuran lengkap";
  const stok = item.stok || "Stok ready";

  kartu.innerHTML = `
    <div class="relative overflow-hidden rounded-2xl">
      <img src="${gambarFinal}" alt="${item.nama}" class="h-44 w-full object-cover" />
      <span class="absolute left-3 top-3 rounded-full bg-[#ff3b30] px-3 py-1 text-xs font-bold text-white">${badge}</span>
    </div>

    <div class="mt-4">
      <div class="flex items-start justify-between gap-2">
        <h4 class="text-base font-bold text-slate-800">${item.nama}</h4>
        <span class="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">${kategori}</span>
      </div>

      <p class="mt-2 text-sm text-slate-600">${detail}</p>

      <div class="mt-3 flex items-center gap-2 text-sm text-slate-500">
        <span>⭐ 4.8</span>
        <span>•</span>
        <span>${stok}</span>
      </div>

      <div class="mt-3 flex items-center justify-between">
        <p class="text-lg font-black text-[#ff3b30]">Rp ${harga.toLocaleString("id-ID")}</p>
        <span class="text-xs font-semibold text-slate-500">${size}</span>
      </div>

      <button class="btn-tambah-keranjang mt-4 w-full rounded-xl bg-[#7CFF5B] px-3 py-2 text-sm font-semibold text-[#0f172a] transition hover:bg-[#6ee84f]">
        Tambah ke Keranjang
      </button>
    </div>
  `;

  return kartu;
}

function tampilkanProduk(data) {
  const daftarProduk = Array.isArray(data) ? data : data?.data || [];
  const sudahAdaBolaAdidas = daftarProduk.some((item) => String(item.nama || "").toLowerCase() === "bola adidas");
  const daftarFinal = sudahAdaBolaAdidas
    ? daftarProduk
    : [...daftarProduk, {
        nama: "Bola Adidas",
        harga: 350000,
        kategori: "Bola",
        detail: "Bola resmi dengan desain premium dan grip presisi untuk latihan maupun pertandingan.",
        diskon: 12,
        size: "Size 5",
        stok: "Stok ready",
        gambar: "assets/images/Bola Adidas.webp",
      }];

  gridKatalog.innerHTML = "";

  if (daftarFinal.length === 0) {
    gridKatalog.innerHTML = '<p class="text-sm text-slate-500">Belum ada produk yang tersedia.</p>';
    return;
  }

  daftarFinal.forEach((item) => {
    gridKatalog.appendChild(buatKartuProduk(item));
  });
}

const gridKatalog = document.getElementById("grid-katalog");
const formProduk = document.getElementById("form-produk");

async function muatProduk() {
  gridKatalog.innerHTML = '<p class="text-sm text-slate-500">Memuat produk...</p>';

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Gagal mengambil data");
    }

    const hasil = await response.json();
    tampilkanProduk(hasil);
  } catch (error) {
    console.error(error);
    tampilkanProduk(produkDefault);
  }
}

muatProduk();

let jumlahKeranjang = 0;
const namaToko = "P4Sport";
console.log(`Selamat datang di ${namaToko}!`);
console.log(`Jumlah item di keranjang: ${jumlahKeranjang}`);

const tombolKeranjang = document.querySelector("#tombol-keranjang");
const tombolHamburger = document.querySelector("#tombol-hamburger");
const menuMobile = document.querySelector("#menu-mobile");
const panelKeranjang = document.querySelector("#panel-keranjang");
const tombolTutupKeranjang = document.querySelector("#tutup-keranjang");
const pesanError = document.querySelector("#pesan-error");

if (tombolKeranjang) {
  tombolKeranjang.addEventListener("click", () => {
    panelKeranjang.classList.toggle("hidden");
    renderKeranjang();
  });
}

if (tombolTutupKeranjang) {
  tombolTutupKeranjang.addEventListener("click", () => {
    panelKeranjang.classList.add("hidden");
  });
}

function lakukanCheckout() {
  if (keranjang.length === 0) {
    return;
  }

  const totalHarga = keranjang.reduce((jumlah, item) => jumlah + item.harga * item.qty, 0);
  const totalItem = keranjang.reduce((jumlah, item) => jumlah + item.qty, 0);

  alert(`Checkout berhasil!\nTotal ${totalItem} item\n${formatRupiah(totalHarga)}\nTerima kasih telah berbelanja di P4Sport.`);
  keranjang = [];
  renderKeranjang();
}

tombolHamburger.addEventListener("click", () => {
  menuMobile.classList.toggle("hidden");
});

formProduk.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nama = document.querySelector("#input-nama").value.trim();
  const harga = Number(document.querySelector("#input-harga").value);

  if (nama === "" || harga <= 0) {
    pesanError.textContent = "Nama produk dan harga (lebih dari 0) wajib diisi.";
    pesanError.classList.remove("hidden");
    return;
  }

  pesanError.classList.add("hidden");

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama, harga }),
    });
  } catch (error) {
    console.error(error);
  }

  formProduk.reset();
  muatProduk();
});

gridKatalog.addEventListener("click", (event) => {
  const tombolTambah = event.target.closest(".btn-tambah-keranjang");

  if (!tombolTambah) {
    return;
  }

  const kartuProduk = tombolTambah.closest(".football-card");
  const namaProduk = kartuProduk?.dataset?.nama || "Produk";
  const hargaProduk = Number(kartuProduk?.dataset?.harga || 0);
  const gambarProduk = kartuProduk?.dataset?.gambar || "";

  tambahKeKeranjang(namaProduk, hargaProduk, gambarProduk);
  panelKeranjang.classList.remove("hidden");
});

document.addEventListener("click", (event) => {
  if (event.target.id === "btn-checkout") {
    lakukanCheckout();
  }
});