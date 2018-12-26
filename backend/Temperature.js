const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/raspberry');

const Temperature = new Schema({
    temperature: {type: String},
    date: {type: Date}
});

const TemperatureModel = mongoose.model('Temperature', Temperature);

let store = function (temperature, date) {
    let model = new TemperatureModel({temperature: temperature, date: date});

    model.save(function (err, model) {
        if (err) {
            return console.error(err)
        }

        console.log(model.name + " saved to collection.");
    });
};

let findAll = async function () {
    return new Promise(resolve =>
        TemperatureModel.find({}, function (err, docs) {
            if (err) {
                return console.error(err);
            }

            console.log("Temperatures: " + docs);
            resolve(docs);
        })
    );
};

module.exports = {
    store: store,
    findAll: findAll
};