const mongoose = require("mongoose");

// creating a book schema
const BookSchema = mongoose.Schema({
    ISBN : String,
    title : String,
    pub_DAte: String,
    language : String,
    numPage : Number,
    author: [Number],
    publications: Number,
    category: [String],
});

// create modals

const BookModel = mongoose.model("books",BookSchema);

module.exports = BookModel;
