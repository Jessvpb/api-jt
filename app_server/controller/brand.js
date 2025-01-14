const Brand = require("../model/brand");

// Fungsi untuk membuat brand baru
const createBrand = (req, res) => {
  const { kdBrand, namaB } = req.body;

  // Validasi panjang kdBrand
  if (kdBrand.length !== 2) {
    return res.status(400).json({
      message: "Kode brand harus terdiri dari 2 karakter",
    });
  }

  const brand = new Brand({
    kdBrand,
    namaB,
  });

  brand
    .save()
    .then((createdBrand) => {
      res.status(201).json({
        message: "Data berhasil disimpan",
        kdBrand: createdBrand.kdBrand,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Gagal menyimpan brand",
        //error: err.message,
      });
    });
};

// Fungsi untuk membaca brand
const readBrand = (req, res) => {
  Brand.find()
    .then((documents) => {
      res.status(200).json({
        message: "Get Data Brand",
        categories: documents,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Gagal mengambil data brand",
        //error: err.message,
      });
    });
};

// Fungsi untuk menghapus brand
const deleteBrand = (req, res) => {
  const { kdBrand } = req.params; // Ambil kdBrand dari URL parameter

  // Cari brand berdasarkan kdBrand dan hapus
  Brand.deleteOne({ kdBrand: kdBrand })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).json({
          message: `Brand dengan kode ${kdBrand} tidak ditemukan`,
        });
      }
      res.status(200).json({
        message: `Brand dengan kode ${kdBrand} berhasil dihapus`,
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Gagal menghapus brand",
        //error: err.message,
      });
    });
};

// Fungsi untuk memperbarui brand
const updateBrand = (req, res) => {
  const { kdBrand, namaB } = req.body;

  // Validasi panjang kdBrand
  if (kdBrand.length !== 2) {
    return res.status(400).json({
      message: "Kode brand harus terdiri dari 2 karakter",
    });
  }

  // Cari brand berdasarkan kdBrand yang ada di URL
  const brandId = req.params.kdBrand; // Mengambil kdBrand dari URL params

  // Update brand berdasarkan kdBrand
  Brand.updateOne(
    { kdBrand: brandId }, // Mencari brand berdasarkan kdBrand
    { $set: { namaB: namaB } } // Data yang ingin diperbarui
  )
    .then((hasil) => {
      if (hasil.nModified === 0) {
        return res.status(404).json({
          message: `Brand dengan kode ${brandId} tidak ditemukan atau tidak ada perubahan`,
        });
      }
      res.status(200).json({
        message: `Brand dengan kode ${brandId} berhasil diperbarui`,
        result: hasil,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Gagal memperbarui brand",
        //error: err.message,
      });
    });
};

module.exports = {
  createBrand,
  readBrand,
  deleteBrand,
  updateBrand,
};
