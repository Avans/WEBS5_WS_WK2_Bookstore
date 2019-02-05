var mongoose = require('mongoose');

console.log('Initializing author schema');

var authorSchema = new mongoose.Schema({
    /*
    TODO: 1 - Schema authors vullen
    - Firstname: Verplicht, String
    - Lastname: Verplicht, String
    - Birthdate: Verplicht, Date, voor vandaag
    - Country: String, default: NL
    - Ranking: Number, boven 0
    - Books: Array van book id's
    */
});

/*
    TODO: 7 - Projecting:
    - fullname is een property die opgehaald wordt
    - age is een property die opgehaald wordt
    - numberOfBooks is een property die opgehaald wordt
*/

mongoose.model('Author', authorSchema);