const Guest = require('../models/Guest');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwtSecret, jwtExpire} = require('../config/keys');
const express = require('express');
const equals = require("validator/lib/equals");
//
exports.getGuestById = async (req, res) => {
  await Guest.findById({_id: req.params.id}, (err, guest) => {
    if (err) {
      return res.status(400).json({error: err});
    }

    return res.status(200).json({data: guest});
  }).catch(err => console.log(err));
};


exports.updateGuestPic = async (req, res) => {
  await Guest.findByIdAndUpdate(
    {_id: req.params.id},
    {$set: {pic: req.body.pic}},
    {new: true},
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({error: err});
    } else {
      res.json(result);
    }
  });
};

exports.updateGuestUName = async (req, res) => {
  const {firstname, lastname} = req.body;

  if (!firstname && !lastname) {
    return res.status(422).json();
  } else {
    Guest.findByIdAndUpdate(
     {_id: req.params.id},
      {$set: {firstname: req.body.firstname, lastname: req.body.lastname}},

      {
        new: true,
      },
    ).exec((err, result) => {
      if (err) {
        return res.status(422).json({error: err});
      } else {
        res.json(result);
      }
    });
  }
};

exports.updateGuestBio = async (req, res) => {
  const {bio} = req.body;

  if (!bio) {
    return res.status(422).json();
  }
  Guest.findByIdAndUpdate(
    {_id: req.params.id},
    {$set: {bio: req.body.bio}},

    {
      new: true,
    },
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({error: err});
    } else {
      res.json(result);
    }
  });
};

exports.updateGuestLocation = async (req, res) => {
  const {location} = req.body;

  if (!location) {
    return res.status(422).json();
  }
  Guest.findByIdAndUpdate(
    {_id: req.params.id},
    {$set: {location: req.body.location}},

    {
      new: true,
    },
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({error: err});
    } else {
      res.json(result);
    }
  });
};

exports.updatePassword = async (req, res) => {
  const {password, password2} = req.body;

  if (!equals(password, password2)) {
    return res.status(422).json();
  }
  // } else if (isLength({ min: 6 })) {
  //   return res.status(423).json();
  // }
  const newPassword = new Guest();

  const salt = await bcrypt.genSalt(10);
  newPassword.password = await bcrypt.hash(password, salt);
  await Guest.findByIdAndUpdate(
    {_id: req.params.id},
    {$set: {password: newPassword.password}},

    {
      new: true,
    },
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({error: err});
    } else {
      res.json(result);
    }
  });
};
