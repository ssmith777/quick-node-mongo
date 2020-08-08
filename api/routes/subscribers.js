const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscribers");

/**
 * Get All
 */
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * create one
 */
router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel,
  });
  try {
    const newSubscriber = await subscriber.save();
    if (newSubscriber != null) {
      res.status(201).json({ message: "saved" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * insert many
 */
router.post("/im/", async (req, res) => {
  try {
    const { body } = req;
    const data = await Subscriber.insertMany(body);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 *  Get One
 */
router.get("/:id", getSubscribers, (req, res) => {
  res.send(res.subscriber);
});

/**
 * Update One
 */
router.patch("/:id", getSubscribers, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name;
  }

  if (req.body.subscribedToChannel != null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
  }

  try {
    const updatedSubscriber = await res.subscriber.save();
    res.json(updatedSubscriber);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Delete One
 */

router.delete("/:id", getSubscribers, async (req, res) => {
  try {
    await res.subscriber.remove();
    res.json({ message: "Deleted subscriber" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//

const getDeletedData = async (filter) => {
  const subscriber = await Subscriber.find({ filter });
  await Subscriber.deleteMany({ filter });

  return subscriber;
};

async function getSubscribers(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber === null) {
      return res.status(404).json({ message: "Cannot find subscriber" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.subscriber = subscriber;
  next();
}

module.exports = router;
