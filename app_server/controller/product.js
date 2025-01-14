const Product = require("../model/product"); // Pastikan path model sesuai

// Create Product
const createProduct = (req, res) => {
  const { kdBrand, kdCategory, namaP, deskripsi, harga, stok, image_url } =
    req.body;

  // Validasi input
  if (
    !kdBrand ||
    !kdCategory ||
    !namaP ||
    !deskripsi ||
    !harga ||
    !stok ||
    !image_url
  ) {
    return res.status(400).json({ message: "Data tidak lengkap!" });
  }

  // Hitung jumlah produk berdasarkan kombinasi kdbrand dan kdcategory
  Product.countDocuments({ kdBrand, kdCategory })
    .then((count) => {
      const uniqueCode = (count + 1).toString().padStart(4, "0");
      const kdProduct = `${kdCategory}${kdBrand}${uniqueCode}`;

      const product = new Product({
        kdProduct,
        kdBrand,
        kdCategory,
        namaP,
        deskripsi,
        harga,
        stok,
        image_url,
      });

      // Simpan produk ke database
      product
        .save()
        .then((createdProduct) => {
          res.status(201).json({
            message: "Produk berhasil dibuat",
            kdProduct: createdProduct.kdProduct,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "Internal server error: Gagal menyimpan produk",
            //error: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Internal server error: Gagal menghitung produk",
        //error: err,
      });
    });
};

// Read Product
const readProduct = (req, res) => {
  Product.find()
    .then((documents) => {
      res.status(200).json({
        message: "Data produk berhasil diambil",
        products: documents,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Gagal mengambil data produk",
        //error: err.message,
      });
    });
};

// Delete Product
const deleteProduct = (req, res) => {
  const { kdProduct } = req.params;

  Product.deleteOne({ kdProduct: kdProduct })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).json({
          message: `Product dengan kode ${kdProduct} tidak ditemukan`,
        });
      }

      res.status(200).json({
        message: `Product dengan kode ${kdProduct} berhasil dihapus`,
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "agal menghapus produk",
        //error: err.message,
      });
    });
};

// Update Product
const updateProduct = (req, res) => {
  const { kdProduct, namaP, deskripsi, harga, stok, image_url } = req.body;

  // Validasi panjang kdCategory
  if (kdProduct.length !== 8) {
    return res.status(400).json({
      message: "Kode Product harus terdiri dari 8 karakter",
    });
  }

  const productId = req.params.kdProduct;

  // Validasi jika tidak ada data yang diupdate
  if (!namaP && !deskripsi && !harga && !stok && !image_url) {
    return res.status(400).json({ message: "Tidak ada data yang diupdate!" });
  }

  const updateData = { namaP, deskripsi, harga, stok, image_url };

  Product.updateOne({ kdProduct: productId }, { $set: updateData })
    .then((result) => {
      if (result.matchedCount === 0) {
        return res.status(404).json({
          message: `Product dengan kode ${productId} tidak ditemukan`,
        });
      }

      res.status(200).json({
        message: `Product dengan kode ${productId} berhasil diperbarui`,
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Gagal mengupdate produk",
        //error: err,
      });
    });
};

module.exports = { createProduct, readProduct, deleteProduct, updateProduct };
