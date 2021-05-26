const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const User = require('../models/User');

const router = express.Router();

//@route  GET api/auth
//@desc   Get logged in user
//@access Private
router.get('/', auth, 
async (req, res) => {
  try {
    const user = await  User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('server error');
  }

});


//@route  POST api/auth
//@desc   Add user and get token
//@access Public
router.post('/',body('email', 'Please invlude a valid email a email').isEmail(),
body('password', 'Password is required').exists(),
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password} = req.body;

  try{
    let user = await User.findOne({email});

    if(!user){
      return res.status(400).json({msg:'Invalid credentials'});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
      return res.status(400).json({msg:'Invalid credentials'});
    }

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, 
      config.get('jwtSecret'), {
      expiresIn: 360000
    }, (err, token) => {
      if(err) throw err;
      res.json({token});
    });

  } catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }
});

module.exports = router;