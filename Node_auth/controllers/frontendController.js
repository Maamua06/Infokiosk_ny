const Text = require('../models/Textmodel');

module.exports.infoskjerm_get = async (req, res) => {
    try{
        const texts = await Text.find();
        res.render('infoskjerm', { texts });
    } catch(err) {
        console.log(err)
        res.status(500).json({error: 'internal error'});
    };
};