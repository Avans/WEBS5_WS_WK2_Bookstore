var express = require('express');
var _ = require('underscore');
var router = express();
var handleError;

var mongoose = require('mongoose');
Author = mongoose.model('Author');
Book = mongoose.model('Book');

/*
	TODO: 6 - Populate boeken
	TODO: 8 - Paging: QueryString variabelen pageSize, PageIndex, Gesorteerd op ranking
	TODO: 9 - Filtering: QueryString variabele: country
	TODO: 10 - Filtering: QueryString variabele: fullName
*/
function getAuthors(req, res){
	var query = {};
	if(req.params.id){
		query._id = req.params.id;
	} 

	var result = Author.find(query);

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

/*
	TODO: 13 - Voeg boeken toe
		- Vind Author
		- Book in collectie books aanmaken als die niet bestaat 
		- Book ID refereren vanuit Author
		- Author met nieuw book teruggeven
		- Mocht iets van dit mis gaan dan handleError(req, res, statusCode, err) aanroepen
*/
function addBook(req, res){
	res.json({});
}

/*
	TODO: 14 - Delete book by author.
		- Vind Author by :id,
		- Vind Book bij author met :bookId,
		- Verwijder boek van Author
		- Author zonder betreffende book teruggeven
		- Mocht iets van dit mis gaan dan handleError(req, res, statusCode, err) aanroepen
*/
function deleteBook(req, res){
	res.json({});
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