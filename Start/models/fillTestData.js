let mongoose = require('mongoose');
Book = mongoose.model('Book');
Author = mongoose.model('Author');

let author_seed = [
	// TODO: 3 - Testdata voor authors maken.

	// Vul hier je testdata voor authors in 
	// In je /models/book.js staat welke velden je nodig hebt.
	// {}, {}, {}
];

let book_seed = [
	// TODO: 4 - Testdata voor boeken maken.

	// Vul hier je testdata voor boeken in
	// In je /models/book.js staat welke velden je nodig hebt.
	// {}, {}, {}
];

module.exports = function(){
    let Book = mongoose.model('Book');
    Book.find({}).then(books => {
        if(!books.length){
            console.log('\tNo books found, filling testdata');
            Book.insertMany(book_seed)
                .then(() => console.log('\tFilling book testdata succesfull'))
                .catch(err => console.log('\tFilling book testdata failed', err));
        }
    });

    let Author = mongoose.model('Author');
    Author.find({}).then(authors => {
        if(!authors.length){
            console.log('\tNo authors found, filling testdata');
            Author.insertMany(author_seed)
                .then(() => console.log('\tFilling author testdata succesfull'))
                .catch(err => console.log('\tFilling author testdata failed', err));
        }
    });
}