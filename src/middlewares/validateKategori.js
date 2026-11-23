exports.validateKategori = (req, res, next) => {
  const errors = [];
  const { nama_kategori } = req.body || {};

  if (typeof nama_kategori !== 'string' || nama_kategori.trim() === '') {
    errors.push('nama_kategori wajib diisi dan tidak boleh kosong');
  }

  if (errors.length > 0) {
    return res.status(400).json({ status: 'error', message: 'Validasi gagal', errors });
  }
  next();
};