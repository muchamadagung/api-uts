const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/kategori', require('./routes/kategoriRoutes'));
app.use('/api/produk', require('./routes/produkRoutes'));  // aktifkan nanti saat produk selesai

app.get('/', (req, res) => {
  res.json({ status: 'success', message: 'API berjalan' });
});

// 404 untuk URL yang tidak dikenal
app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Route tidak ditemukan' });
});

// Error handler terpusat
app.use((err, req, res, next) => {
  // JSON rusak dari express.json()
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ status: 'error', message: 'JSON tidak valid' });
  }
  console.error(err);
  res.status(500).json({ status: 'error', message: 'Terjadi kesalahan pada server' });
});

module.exports = app;