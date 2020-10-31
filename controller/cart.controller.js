const Cart = require('../models/cart.model');
const nodemailer = require('nodemailer');
const transporter =  nodemailer.createTransport({ // config mail server
    service: 'gmail',
    auth: {
        user: 'lutakrystal305@gmail.com',
        pass: process.env.PASSWORD
    }
});
function countOccurrences(arr) {
    arr.map((x) => {
        x.count = 1;
    })
    arr.slice(1).forEach((x) => {
      let z=arr.indexOf(x);
      let i;
      let a=arr.slice(0,z)
      a.forEach((y) =>{
  
          if (x._id === y._id) {
            
            y.count++;
            arr=[
              ...arr.slice(0,z),
              ...arr.slice(z+1)
            ];
          } 
        return arr
      })
      return arr
    });
    return arr;
  }
  
module.exports.index = async function (req, res, next) {
    try {
        if (!req.body.items) {
            res.status(401);
            res.json({msg:'Please choose items that you wanna purchase!'})
        } else {
            req.body.items = countOccurrences(req.body.items);
            console.log(req.body);
            const newCart = await new Cart(req.body);
            newCart.save();
            const items = newCart.items;
            let content = (
                    '<div style="padding: 10px">'+
                        '<h1 style="color: #18e21dcf; padding: 20px">Hi you, ' +newCart.name+'</h1>'+
                        '<h6 style="font-size: 23px">Your items that you bought :</h6>'+
                        '<ul id="z">'
                            
                        
                );
            items.forEach((x) => {
                content +=(
                '<li>'+x.name+`(${x.count}):`+ x.price+'/1</li>'
            )});
            content +=('</ul>' +
            '<h6>Total price, you must pay since delivery: <b>' +newCart.total + '</b></h6>'+
        '</div>')
            var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
                from: 'Luta Krystal',
                to: req.body.email,
                subject: 'Welcome to Amber!',
                text: 'You recieved Message from Amber',
                html: content
            }
            transporter.sendMail(mainOptions, function(err, info){
                if (err) {
                    console.log(err);
                } else {
                    console.log('Message sent: ' +  info.response);
                }
            });

            res.json(newCart);
        }
    } catch (error) {
        next(error);
    }
}