module.exports = (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ status: 'error', message: 'ID harus berupa bilangan bulat positif' });
  }
  req.id = id;
  next();
};