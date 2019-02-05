var mongoose = require('mongoose');
Book = mongoose.model('Book');
Author = mongoose.model('Author');

let book_seed = [
    {
        _id: '1',
        title: 'Book 1',
        publishDate: new Date(2000, 01, 01),
        category: 'Fantasy',
        chapters: [{ title: 'First', numberOfPages: 20 }, { title: 'Second', numberOfPages: 10 }, { title: 'Third', numberOfPages: 15 }]
    },
    {
        _id: '2',
        title: 'Book 2',
        publishDate: new Date(2001, 01, 01),
        category: 'Fantasy',
        chapters: [{ title: 'First', numberOfPages: 20 }, { title: 'Second', numberOfPages: 10 }, { title: 'Third', numberOfPages: 15 }]
    },
    {
        _id: '3',
        title: 'Book 3',
        publishDate: new Date(2002, 01, 01),
        category: 'Horror',
        chapters: [{ title: 'First', numberOfPages: 20 }, { title: 'Second', numberOfPages: 10 }, { title: 'Third', numberOfPages: 15 }]
    },
    {
        _id: '4',
        title: 'Book 4',
        publishDate: new Date(2003, 01, 01),
        category: 'Thrillers',
        chapters: [{ title: 'First', numberOfPages: 20 }, { title: 'Second', numberOfPages: 10 }, { title: 'Third', numberOfPages: 15 }]
    },
    {
        _id: '5',
        title: 'Book 5',
        publishDate: new Date(2004, 01, 01),
        category: 'Roman',
        chapters: [{ title: 'First', numberOfPages: 20 }, { title: 'Second', numberOfPages: 10 }, { title: 'Third', numberOfPages: 15 }]
    }
];

let author_seed = [
    {
        firstName: 'Jan',
        lastName: 'Jansen',
        birthDate: new Date(1980, 01, 01),
        country: 'EN',
        ranking: '5',
        books: ['1', '4'],
    },
    {
        firstName: 'Piet',
        lastName: 'Pietersen',
        birthDate: new Date(1985, 01, 01),
        country: 'US',
        ranking: '1',
        books: ['2', '3'],
    },
    {
        firstName: 'Karel',
        lastName: 'Karelsen',
        birthDate: new Date(1990, 01, 01),
        country: 'NL',
        ranking: '3',
        books: [],
    }
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