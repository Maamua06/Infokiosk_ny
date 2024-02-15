const Text = require('../models/Textmodel');

const getData = async (req, res) => {
  try {
    const data = await Text.find().sort({ order: 1 });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateOrder = async (req, res) => {
  try {
    const newOrder = req.body.newOrder;

    for (let i = 0; i < newOrder.length; i++) {
      await Text.findByIdAndUpdate(newOrder[i]._id, { order: i + 1 });
    }

    res.json({ message: 'Order updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const deleteData = async (req, res) => {
    try {
      const itemId = req.params.id;
      await Text.findByIdAndDelete(itemId);
      res.json({ message: 'Data deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

module.exports = { getData, updateOrder, deleteData };
