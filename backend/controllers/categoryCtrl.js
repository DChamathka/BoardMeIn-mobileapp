const Category = require('../models/category');

const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
};

module.exports = categoryCtrl;
