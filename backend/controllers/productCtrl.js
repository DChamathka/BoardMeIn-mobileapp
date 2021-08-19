const Products = require('../models/product');

exports.addProduct = async (req, res) => {
  try {
    const {
      title,
      price,
      description,
      content,
      images,
      lat,
      lang,
      category,
      location,
      owner_id,
    } = req.body;
    if (!images) return res.status(400).json({msg: 'No image upload'});

    const newProduct = new Products({
      title,
      price,
      description,
      content,
      images,
      lat,
      lang,
      category,
      location,
      owner_id,
    });

    await newProduct.save();
    res.json({msg: 'Successfully added a place'});
  } catch (err) {
    return res.status(500).json({msg: err.message});
  }
};

exports.updateProduct = async (req, res) => {
  const body = req.body;
  Products.findOneAndUpdate(
    {_id: req.params.id},
    {
      $set: {
        title: body.title,
        price: body.price,
        location: body.location,
        description: body.description,
        content: body.content,
        images: body.images,
        lat:body.lat,
        lang:body.lang,
      },
    },
  ).exec(function (err, product) {
    if (err) {
      console.log(err);
      res.status(422).json({error: err});
    } else {
      res.json({message: 'Property updated!', success: true});
    }
  });
};

exports.deleteProducts = async (req, res) => {
  await Products.findOneAndDelete({_id: req.params.id}, (err, products) => {
    if (err) {
      return res.status(400).json({success: false, error: err});
    }

    if (!products) {
      return res
        .status(404)
        .json({success: false, error: `Property not found`});
    }

    return res.status(200).json({success: true, data: products});
  }).catch(err => console.log(err));
};

exports.getProductsById = async (req, res) => {
  await Products.findOne({_id: req.params.id}, (err, products) => {
    if (err) {
      return res.status(400).json({success: false, error: err});
    }

    if (!products) {
      return res
        .status(404)
        .json({success: false, error: `Products not found`});
    }
    return res.status(200).json({success: true, data: products});
  }).catch(err => console.log(err));
};

exports.getProductsByOId = async (req, res) => {
  await Products.find({owner_id: req.params.id}, (err, products) => {
    if (err) {
      return res.status(400).json({success: false, error: err});
    }

    if (!products) {
      return res
        .status(404)
        .json({success: false, error: `Products not found`});
    }
    return res.status(200).json({success: true, data: products});
  }).catch(err => console.log(err));
};

exports.getProducts = async (req, res) => {
  await Products.find({}, (err, products) => {
    if (err) {
      return res.status(400).json({success: false, error: err});
    }
    if (!products.length) {
      return res
        .status(404)
        .json({success: false, error: `Properties not found`});
    }
    return res.status(200).json({success: true, data: products});
  }).catch(err => console.log(err));
};

exports.getSinglerooms = async (req, res) => {
  await Products.find({category: {$eq: 'Single Room'}}, (err, products) => {
    if (err) {
      return res.status(400).json({error: err});
    }
    if (!products.length) {
      return res.status(404).json({error: `Properties not found`});
    }
    return res.status(200).json({products});
  }).catch(err => console.log(err));
};

exports.getSharedrooms = async (req, res) => {
  await Products.find({category: {$eq: 'Shared Room'}}, (err, products) => {
    if (err) {
      return res.status(400).json({error: err});
    }
    if (!products.length) {
      return res
        .status(404)
        .json({success: false, error: `Properties not found`});
    }
    return res.status(200).json({data: products});
  }).catch(err => console.log(err));
};

exports.getHouses = async (req, res) => {
  await Products.find({category: {$eq: 'House'}}, (err, products) => {
    if (err) {
      return res.status(400).json({error: err});
    }
    if (!products.length) {
      return res
        .status(404)
        .json({success: false, error: `Properties not found`});
    }
    return res.status(200).json({data: products});
  }).catch(err => console.log(err));
};

exports.getAnnexs = async (req, res) => {
  await Products.find(
    {category: {$nin: ['Shared Room', 'Single Room', 'House']}},
    (err, products) => {
      if (err) {
        return res.status(400).json({error: err});
      }
      if (!products.length) {
        return res
          .status(404)
          .json({success: false, error: `Properties not found`});
      }
      return res.status(200).json({data: products});
    },
  ).catch(err => console.log(err));
};

exports.getSinRoomCount = async (req, res) => {
  await Products.count(
    {category: {$eq: 'Single Room'}},
    function (err, sinrcount) {
      if (err) {
        return res.status(400).json({error: err});
      } else {
        return res.status(200).json({sincount: sinrcount});
      }
    },
  );
};

exports.getShrRoomCount = async (req, res) => {
  await Products.count({category: 'Shared Room'}, function (err, shrrcount) {
    if (err) {
      return res.status(400).json({error: err});
    } else {
      return res.status(200).json({shrrcount: shrrcount});
    }
  });
};

exports.getHouseCount = async (req, res) => {
  await Products.count({category: 'House'}, function (err, housecount) {
    if (err) {
      return res.status(400).json({error: err});
    } else {
      return res.status(200).json({housecount: housecount});
    }
  });
};

exports.getAnxCount = async (req, res) => {
  await Products.count(
    {category: {$nin: ['Shared Room', 'Single Room', 'House']}},
    function (err, annexcount) {
      if (err) {
        return res.status(400).json({error: err});
      } else {
        return res.status(200).json({annexcount: annexcount});
      }
    },
  );
};