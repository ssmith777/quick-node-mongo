const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscribers');

// Getting All
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// // Creating One
// router.post('/', async (req, res) => {
//   try {
//     const subscriber = new Subscriber({
//       name: req.body.name,
//       subscribedToChannel: req.body.subscribedToChannel,
//     });
//     const newSubscriber = await subscriber.save();
//     res.json(newSubscriber);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });
// Creating one
router.post('/', async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel,
  });
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/', (req, res) => {});

// Updating One
router.patch('/:id', (req, res) => {});

// Deleting One
router.delete('/:id', (req, res) => {});

module.exports = router;
