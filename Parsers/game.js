var   request = require('request')
	, _	 	  = require('lodash')
	, cheerio = require('cheerio');
/*
 * GET home page.
 */

exports.game = function (req, res) {
	var gameHTML = '<form action="/post" method="post" > <input name="system" type="text"> <input type="submit" value="Get Game System Logo"></form>';
	res.send(gameHTML);
}

exports.getGame = function(req, res) {
	request({
	    uri: 'http://www.newegg.com/Gaming/Store',
  	}, function (error, response, body) {
  		var system = req.body.system;
  		console.log(system)
		var $ = cheerio.load(body);
		var data = {};
		data.title = $('title').text();
		switch (system) {
			case '360':
  				data.systemImage = $('img[title="Xbox360"]').attr('src');
  				break;
  			case 'ps3':
  				data.systemImage = $('img[title="PS3"]').attr('src');
  				break;
  			case 'pc':
  				data.systemImage = $('img[title="PC Games"]').attr('src');
  				break;
  			default:
  				res.send('Invalid System');
  		}
		res.send(data);
	});
}