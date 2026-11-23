const router = require('express').Router();
const ctrl = require('../controllers/produkController');
const parseId = require('../middlewares/parseId');
const { validateProduk, validatePatch } = require('../middlewares/validateProduk');

router.get('/', ctrl.getAll);
router.get('/:id', parseId, ctrl.getById);
router.post('/', validateProduk, ctrl.create);
router.put('/:id', parseId, validateProduk, ctrl.replace);
router.patch('/:id/restore', parseId, ctrl.restore);
router.patch('/:id', parseId, validatePatch, ctrl.update);
router.delete('/:id', parseId, ctrl.remove);

module.exports = router;