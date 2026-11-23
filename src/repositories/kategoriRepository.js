const pool = require('../config/db');

class KategoriRepository {
  async findAll() {
    const { rows } = await pool.query('SELECT * FROM kategori ORDER BY id');
    return rows;
  }

  async findById(id) {
    const { rows } = await pool.query('SELECT * FROM kategori WHERE id = $1', [id]);
    return rows[0];
  }

  async create({ nama_kategori, deskripsi }) {
    const { rows } = await pool.query(
      'INSERT INTO kategori (nama_kategori, deskripsi) VALUES ($1, $2) RETURNING *',
      [nama_kategori, deskripsi || null]
    );
    return rows[0];
  }

  async delete(id) {
    const result = await pool.query('DELETE FROM kategori WHERE id = $1', [id]);
    return result.rowCount > 0;
  }
}

module.exports = new KategoriRepository();