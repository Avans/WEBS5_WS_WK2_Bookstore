var mongoose = require('mongoose');

console.log('Initializing books schema');

var bookSchema = new mongoose.Schema({
    /*
    TODO: 2 - Schema books vullen
    - Title: Verplicht, String
    - PublishDate: Verplicht, Date, voor vandaag
    - Category: Verplicht, String
    - Chapters: Array van JSNON { title, numberOfPages }
    */
});

/*
TODO: 5 - Virtual property totalNumberOfPages, opgebouwd uit numberOfPages van chapters)
- De benodigde extra validation
- De benodigde query methods
- De benodigde instance methods
*/

mongoose.model('Book', bookSchema);




