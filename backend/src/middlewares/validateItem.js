// backend/src/middlewares/validateItem.js
const validateItem = (req, res, next) => {
    const { name, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }
    next();
  };
  
  module.exports = validateItem;
  