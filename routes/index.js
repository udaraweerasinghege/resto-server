var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send('Success!')
});

router.get('/yelp', function(req, res, next) {
    const { id } = req.query;

    request({
        method: 'GET',
        uri: `https://api.yelp.com/v3/businesses/${id}`,
        headers: {
            'Authorization': `Bearer ${process.env.YELP_API_KEY}`,
        },
    },

    function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send(body);
        } else {
            res.send(error);
        }
    });
});

router.get('/yelpsearch', function(req, res, next) {
    const { term, long, lat } = req.query;

    request({
        method: 'GET',
        uri: `https://api.yelp.com/v3/autocomplete?text=${term}&latitude=${lat}&longitude=${long}`,
        headers: {
            'Authorization': `Bearer ${process.env.YELP_API_KEY}`,
        },
    },

    function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send(body);
        } else {
            res.send(error);
        }
    });
});

module.exports = router;
