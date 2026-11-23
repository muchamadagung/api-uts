const repo = require('../repositories/kategoriRepository');

exports.getAll = async (req, res, next) => {
  try {
    const data = await repo.findAll();
    res.json({ status: 'success', message: 'Daftar kategori', count: data.length, data });
  } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try {
    const data = await repo.findById(req.id);
    if (!data) return res.status(404).json({ status: 'error', message: 'Kategori tidak ditemukan' });
    res.json({ status: 'success', message: 'Detail kategori', data });
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const data = await repo.create(req.body);
    res.status(201).json({ status: 'success', message: 'Kategori berhasil ditambahkan', data });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ status: 'error', message: 'Nama kategori sudah dipakai' });
    }
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const deleted = await repo.delete(req.id);
    if (!deleted) return res.status(404).json({ status: 'error', message: 'Kategori tidak ditemukan' });
    res.status(204).send();
  } catch (err) {
    if (err.code === '23503') {
      return res.status(409).json({ status: 'error', message: 'Kategori masih dipakai oleh produk' });
    }
    next(err);
  }
};