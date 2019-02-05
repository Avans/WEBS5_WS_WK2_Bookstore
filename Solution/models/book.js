var mongoose = require('mongoose');

console.log('Initializing books schema');

var bookSchema = new mongoose.Schema({
    _id: { type: String },
    title: { type: String, required: true },
    publishDate: {
        type: Date, required: true, validate: {
            validator: function (value) { return value && value < new Date(); },
            message: 'publishDate must be before today'
        }
    },
    category: { type: String, required: true },
    chapters: [{
        title: { type: String, required: true },
        numberOfPages: { type: Number, required: true }
    }]
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

bookSchema.virtual('totalNumberOfPages').get(function () {
    var total = 0;
    for (var i = 0; i < this.chapters.length; i++) {
        total += this.chapters[i].numberOfPages;
    }
    return total;
});

mongoose.model('Book', bookSchema);
