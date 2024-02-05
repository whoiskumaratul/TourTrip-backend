const mongoose = require('mongoose')
const ProductScheme = new mongoose.Schema({
    TrainName: String,
    TrainNumber: Number,
    TrainFrom: String,
    TrainTo: String,
    Coach: String
})

module.exports = mongoose.model('traindata', ProductScheme);