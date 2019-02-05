var express = require('express');
var _ = require('underscore');
var router = express();
var handleError;

var mongoose = require('mongoose');
Author = mongoose.model('Author');
Book = mongoose.model('Book');

function getAuthors(req, res){
	var query = {};
	if(req.params.id){
		query._id = req.params.id;
	} 

    var result = Author.find(query)
        .populate('books')
        .byPage(req.query.pageIndex, req.query.pageSize)
        .byCountry(req.query.countryCode)
        .sort({ ranking: 1 });

	result
		.then(data => {
			// We hebben gezocht op id, dus we gaan geen array teruggeven.
			if(req.params.id){
				data = data[0];
			}
			return res.json(data);
		})
		.catch(err => handleError(req, res, 500, err));
}

function addAuthor(req, res){
	var author = new Author(req.body);
	author
		.save()
		.then(savedAuthor => {
			res.status(201);
			res.json(savedAuthor);
		})
		.catch(err => handleError(req, res, 500, err));
}

function addBook(req, res) {
    Author.findById(req.params.id, function (err, author) {
        if (err || !author) { return handleError(req, res, 404, err); }

        if (req.body.id) {
            author.books.push(req.body.id);
        } else {
            var book = new Book(req.body);
            book.save(function (err, savedBook) {
                if (err) { return handleError(req, res, 500, err);; }
                else {
                    author.books.push(savedBook.id);
                    author.save(function (err) {
                        if (err) { handleError(req, res, 500, err); }
                        else {
                            return res.json(author);
                        }
                    })
                }
            })
        }
        author.save(function (err) {
            if (err) { handleError(req, res, 500, err); }
            else {
                return res.json(author);
            }
        });
    });
}

function deleteBook(req, res) {
    Author.update({ _id: req.params.id }, { $pullAll: { books: [req.params.bookId] } })
        .then(() => Author.findById(req.params.id).then(a => { return res.json(a); }))
        .catch(err => { return handleError(req, res, 500, err); });
}

// Routing
router.route('/')
	.get(getAuthors)
	.post(addAuthor);

router.route('/:id')
	.get(getAuthors);

router.route('/:id/books')
	.post(addBook);

router.route('/:id/books/:bookId')
	.delete(deleteBook);

// Export
module.exports = function (errCallback){
	console.log('Initializing authors routing module');
	
	handleError = errCallback;
	return router;
};