const Category = require("../model/category");

// Fungsi untuk membuat kategori baru
const createCategory = (req, res) => {
  const { kdCategory, namaC } = req.body;

  // Validasi panjang kdCategory
  if (kdCategory.length !== 2) {
    return res.status(400).json({
      message: "Kode kategori harus terdiri dari 2 karakter",
    });
  }

  const category = new Category({
    kdCategory,
    namaC,
  });

  category
    .save()
    .then((createdCategory) => {
      res.status(201).json({
        message: "Data berhasil disimpan",
        kdCategory: createdCategory.kdCategory,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Gagal menyimpan kategori",
        //error: err.message,
      });
    });
};

// Fungsi untuk membaca kategori
const readCategory = (req, res) => {
  Category.find()
    .then((documents) => {
      res.status(200).json({
        message: "Get Data Category",
        categories: documents,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Gagal mengambil data kategori",
        //error: err.message,
      });
    });
};

// Fungsi untuk menghapus kategori
const deleteCategory = (req, res) => {
  const { kdCategory } = req.params; // Ambil kdCategory dari URL parameter

  // Cari kategori berdasarkan kdCategory dan hapus
  Category.deleteOne({ kdCategory: kdCategory })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).json({
          message: `Category dengan kode ${kdCategory} tidak ditemukan`,
        });
      }
      res.status(200).json({
        message: `Category dengan kode ${kdCategory} berhasil dihapus`,
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Gagal menghapus kategori",
        //error: err.message,
      });
    });
};

// Fungsi untuk memperbarui kategori
const updateCategory = (req, res) => {
  const { kdCategory, namaC } = req.body;

  // Validasi panjang kdCategory
  if (kdCategory.length !== 2) {
    return res.status(400).json({
      message: "Kode kategori harus terdiri dari 2 karakter",
    });
  }

  // Cari kategori berdasarkan kdCategory yang ada di URL
  const categoryId = req.params.kdCategory; // Mengambil kdCategory dari URL params

  // Update kategori berdasarkan kdCategory
  Category.updateOne(
    { kdCategory: categoryId }, // Mencari kategori berdasarkan kdCategory
    { $set: { namaC: namaC } } // Data yang ingin diperbarui
  )
    .then((hasil) => {
      if (hasil.nModified === 0) {
        return res.status(404).json({
          message: `Category dengan kode ${categoryId} tidak ditemukan atau tidak ada perubahan`,
        });
      }
      res.status(200).json({
        message: `Category dengan kode ${categoryId} berhasil diperbarui`,
        result: hasil,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Gagal memperbarui kategori",
        //error: err.message,
      });
    });
};

module.exports = {
  createCategory,
  readCategory,
  deleteCategory,
  updateCategory,
};
