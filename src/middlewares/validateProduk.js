const FIELDS = ['kategori_id', 'kode_produk', 'nama_produk', 'harga', 'stok'];

// Satu aturan per field. Mengembalikan pesan error, atau null kalau valid.
const rules = {
  kategori_id: (v) =>
    Number.isInteger(v) && v >= 1 ? null : 'kategori_id harus bilangan bulat >= 1',
  kode_produk: (v) =>
    typeof v === 'string' && v.trim() !== '' && v.length <= 20
      ? null
      : 'kode_produk wajib diisi, tidak boleh kosong, maksimal 20 karakter',
  nama_produk: (v) =>
    typeof v === 'string' && v.trim() !== '' && v.length <= 100
      ? null
      : 'nama_produk wajib diisi, tidak boleh kosong, maksimal 100 karakter',
  harga: (v) =>
    Number.isInteger(v) && v > 0 ? null : 'harga harus bilangan bulat > 0',
  stok: (v) =>
    Number.isInteger(v) && v >= 0 ? null : 'stok harus bilangan bulat >= 0',
};

function sendErrors(res, errors) {
  return res.status(400).json({ status: 'error', message: 'Validasi gagal', errors });
}

// POST dan PUT: semua field wajib ada dan valid
exports.validateProduk = (req, res, next) => {
  const body = req.body || {};
  const errors = [];

  for (const field of FIELDS) {
    if (body[field] === undefined) {
      errors.push(`${field} wajib diisi`);
    } else {
      const msg = rules[field](body[field]);
      if (msg) errors.push(msg);
    }
  }

  if (errors.length > 0) return sendErrors(res, errors);
  next();
};

// PATCH: minimal satu field, dan yang dikirim harus valid
exports.validatePatch = (req, res, next) => {
  const body = req.body || {};
  const present = FIELDS.filter((f) => body[f] !== undefined);

  if (present.length === 0) {
    return sendErrors(res, ['Body harus berisi minimal satu field yang valid']);
  }

  const errors = [];
  for (const field of present) {
    const msg = rules[field](body[field]);
    if (msg) errors.push(msg);
  }

  if (errors.length > 0) return sendErrors(res, errors);
  next();
};