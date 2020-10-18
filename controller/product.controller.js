const Product= require('../models/product.model');

module.exports.index= async function(req, res, next) {
	try {
		var products = await Product.find();
		var count = await Product.countDocuments();
		var page= parseInt(req.query.page)|| 1;
		var perPage= 15;
		var begin= (page-1)*perPage;

		var nextPage={};
		var next2Page={};
		var prePage= {};
		var pre2Page= {};

		nextPage.url='/products?page='+(page+1);
		nextPage.number= page+1;
		next2Page.url='/products?page='+(page+2);
		next2Page.number= page+2;

		prePage.url='/products?page='+(page-1);
		prePage.number= page-1;
		pre2Page.url='/products?page='+(page-2);
		pre2Page.number= page-2;


		if ((count % perPage) !==0) {
			endPage= parseInt(Math.floor(count/perPage)+1);
		}
		else {
			endPage=count/perPage;
		}


		var start= (page-1)*perPage;
		var end= page*perPage;
		var productsN=await Product.find().limit(perPage).skip(begin);
		res.json( {
			products: productsN,
			currentPage: page,
			nextPage: nextPage,
			prePage: prePage,
			next2Page: next2Page,
			pre2Page: pre2Page,
			topUrl: '/products?page=1',
			endPage: {
				url: '/products?page=' + endPage,
				number: endPage
			}
		})
	} catch (error) {
		next(error);
	}
};