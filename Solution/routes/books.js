var express = require('express');
var router = express();
var _ = require('underscore');
var handleError;
var async = require('async');

var mongoose = require('mongoose');
Author = mongoose.model('Author');
Book = mongoose.model('Book');

/*
	TODO:
	- QueryString filter: topCategories={nummer}
		Tel alle boeken in een categorie
		Order deze categorie van meeste naar minste boeken
		Geef alleen de boeken terug die in de top {nummer} categorieën voorkomen
		(For now: Een boek kan maar 1 categorie hebben)

	// Ten slotte, een moeilijkere (door Async methodes)
	- Population: Vul alle autors van het boek
*/
function getBooks(req, res){
    var query = {};
    if (req.query.topCategories) {
        Book.aggregate([{
            $group: {
                _id: "$category",
                count: { $sum: 1 }
            }
        }]).sort({ count: -1 })
            .limit(parseInt(req.query.topCategories))
            .then(result => {
                var categories = [];
                for (var i = 0; i < result.length; i++) { categories.push(result[i]._id); }

                Book.find()
                    .where('category')
                    .in(categories)
                    .then(books => { res.json(books); });
            }).catch(err => { console.log(err); return handleError(req, res, 500, err) });

        return;
    }

	if(req.params.id){
        query._id = req.params.id.toLowerCase();
    } 

    Book.find(query)
        .then(data => { res.json(data); })
        .catch(err => handleError(req, res, 500, err));
}

// Routing
router.route('/')
	.get(getBooks);

router.route('/:id')
	.get(getBooks);

// Export
module.exports = function (errCallback){
	console.log('Initializing books routing module');
	handleError = errCallback;
	return router;
};