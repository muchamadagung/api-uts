INSERT INTO kategori (nama_kategori, deskripsi) VALUES
  ('Elektronik', 'Perangkat elektronik dan aksesori'),
  ('Pakaian', 'Pakaian pria dan wanita'),
  ('Buku', 'Buku bacaan dan alat tulis');

INSERT INTO produk (kategori_id, kode_produk, nama_produk, harga, stok) VALUES
  (1, 'ELK001', 'Headphone Bluetooth', 250000, 20),
  (1, 'ELK002', 'Mouse Wireless', 120000, 35),
  (2, 'PKN001', 'Kaos Polos', 75000, 50),
  (2, 'PKN002', 'Jaket Hoodie', 220000, 15),
  (3, 'BUK001', 'Buku Pemrograman API', 95000, 30);