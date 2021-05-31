const express = require('express');
const auth = require('../middleware/auth')
const { body, validationResult } = require('express-validator');

const User = require('../models/User');
const Log = require('../models/Log');
const Technitian = require('../models/Tech');
const { json } = require('express');

const router = express.Router();

//@route  GET api/logs
//@desc   Get all logs
//@access Private
router.get('/',
 async (req, res) => {
   try {

    const logs = await Log.find({})
    .populate("tech")
    .sort({date: -1});
     res.json(logs);
   } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
   }
  });

//@route  POST api/logs
//@desc   Add a log
//@access Public
router.post('/', [auth, [
  body('message','message').notEmpty()
]], 
async (req, res) => {
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { message, attention, date, technitian} = req.body;
    
  try {
    const tech = await Technitian.findById(technitian);
    console.log(tech.id);
    const newLog = new Log({message, attention, date, tech: tech.id});

    const log = await newLog.save();

    return res.json(log);
   
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

//@route  PUT api/logs/:id
//@desc   Update logs
//@access Public
router.put('/:id',auth , 
async (req, res) => {
  const { message, attention, date, tech} = req.body;

  //Build contact object
  const logFields = {};
  if(message) logFields.message = message;
  if(attention) logFields.attention = attention;
  if(date) logFields.date = date;
  if(tech) logFields.tech = tech;

  try {
    let log = await Log.findById(req.params.id);

    if(!log) return res.status(404).json({ msg: 'Log not found'});

    log = await Log.findByIdAndUpdate(req.params.id, 
      { $set: logFields }, 
      {new: true} );
    
    
    res.json(log);
  } catch (error) {
    console.error(error.message);
    error.status(500).send('server error');
  }
});

//@route  DELETE api/logs/:id
//@desc   Delete a log
//@access Public
router.delete('/:id', auth,
async (req, res) => {
  try {
    let log = await Log.findById(req.params.id);

    if(!log) return res.status(404).json({ msg: 'Log not found'});

    await Log.findByIdAndRemove(req.params.id );
    
    res.json({msg: 'Log removed'});
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

module.exports = router;