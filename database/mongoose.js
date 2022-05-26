const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.connect('mongodb://localhost:27017/wordle');

const wordSchema = new mongoose.Schema({
    word: String,
});

wordSchema.plugin(AutoIncrement, { inc_field: 'id' });

const Word = mongoose.model('Word', wordSchema);

module.exports.newWord = function (word) {
    let new_word = new Word({ word: word });
    new_word.save();
};

module.exports.lastWord = async function () {
    let word = await Word.find({}).sort('-_id').limit(1);
    return word;
};

const newWord = function (word) {
    let new_word = new Word({ word: word });
    new_word.save();
};

// newWord('CHAMA');

// const lastWord = async function () {
//     let word = await Word.find({}).sort('-_id').limit(1);
//     return word;
// };

// lastWord().then((result) => console.log(result[0].word));
