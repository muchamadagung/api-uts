const router = require('express').Router();
const ctrl = require('../controllers/kategoriController');
const produkCtrl = require('../controllers/produkController');
const parseId = require('../middlewares/parseId');
const { validateKategori } = require('../middlewares/validateKategori');

router.get('/', ctrl.getAll);
router.get('/:id', parseId, ctrl.getById);
router.get('/:id/produk', parseId, produkCtrl.getByKategori);
router.post('/', validateKategori, ctrl.create);
router.delete('/:id', parseId, ctrl.remove);

module.exports = router;