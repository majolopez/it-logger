const express = require('express');
const auth = require('../middleware/auth')
const { body, validationResult } = require('express-validator');

const User = require('../models/User');
const Tech = require('../models/Tech');
const { json } = require('express');

const router = express.Router();

//@route  GET api/techs
//@desc   Get all techs
//@access Private
router.get('/', auth,
 async (req, res) => {
   try {
     const techs = await Tech.find().sort({date: -1});
     res.json(techs);
   } catch (error) {
    console.error(error.message);
    error.status(500).send('server error');
   }
  });

//@route  POST api/techs
//@desc   Add a tech
//@access Public
router.post('/', [auth, [
  body('firstName','Should have a first name').notEmpty()
]], 
async (req, res) => {
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName } = req.body;
    
  try {
    const newTech = new Tech({firstName, lastName });

    const tech = await newTech.save();

    return res.json(tech);
   
  } catch (error) {
    console.error(error.message);
    error.status(500).send('server error');
  }
});

//@route  PUT api/techs/:id
//@desc   Update techs
//@access Public
router.put('/:id',auth , 
async (req, res) => {
  const { firstName, lastName } = req.body;

  //Build contact object
  const techFields = {};
  if(firstName) techFields.firstName = firstName;
  if(lastName) techFields.lastName = lastName;

  try {
    let tech = await Tech.findById(req.params.id);

    if(!tech) return res.status(404).json({ msg: 'Tech not found'});

    tech = await Tech.findByIdAndUpdate(req.params.id, 
      { $set: techFields }, 
      {new: true} );
    
    
    res.json(tech);
  } catch (error) {
    console.error(error.message);
    error.status(500).send('server error');
  }
});

//@route  DELETE api/techs/:id
//@desc   Delete a tech
//@access Public
router.delete('/:id', auth,
async (req, res) => {
  try {
    let tech = await Tech.findById(req.params.id);

    if(!tech) return res.status(404).json({ msg: 'Tech not found'});

    await Tech.findByIdAndRemove(req.params.id );
    
    res.json({msg: 'Tech removed'});
  } catch (error) {
    console.error(error.message);
    error.status(500).send('server error');
  }
});

module.exports = router;