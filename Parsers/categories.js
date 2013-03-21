var   request = require('request')
	, _	 	  = require('lodash')
	, cheerio = require('cheerio');
/*
 * GET home page.
 */

exports.index = function(req, res) {
	request({
	    uri: 'http://www.newegg.com',
  	}, function (error, response, body) {
  			var $ = cheerio.load(body);
			var data = {};
			data.title = $('title').text();
			data.categories = [];
			var cats = $('div.itmNav > a').map(function() {return this})
			_.each(cats, function (e, i) {
				var cat = {
					title: e.attr('title'),
					id: e.attr('title'),
					href: e.attr('href')
				}
				data.categories.push(cat)
			});
  			res.send(data);
		}
	)
};

// https://secure.newegg.com/NewMyAccount/NewsLetterSubscribe.aspx?Action=Manage
// LoginName:test@testing.com
// Subscribe:1