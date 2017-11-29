const express = require('express')
const bodyParser = require('body-parser')
const app = express();
var db
var crypto = require('crypto');
var path = require('path')
var mongo = require('mongodb')

var session = require('express-session');
 

app.use(express.static('public'))

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

var nodemailer = require('nodemailer')
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sushabh.deshmukh@gmail.com',
    pass: 'Lethergo@123'
  }
});

var mailOptions = {
  from: 'sushabh.deshmukh@gmail.com',
  to: 'sushabhardy@gmail.com',
  subject: 'Welcome to Mauli NGO',
  text: 'Welcome to Mauli NGO, we are pleased to have you with us as a volunteer. Get our event details from here.'
};


const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://sushabhardy:lethergo123@ds125113.mlab.com:25113/got-quotes', function(err, database){
	if(err) return console.log(err)
	db = database
	app.listen(3000, function(){
	console.log('Listening on port 3000...')
})

})

app.get('/getinvolved', (req, res) => {
    res.render('userForm.ejs')
})

app.get('/getnotified', (req,res) => {
	res.render('email.ejs')
})


app.get('/reviews', (req, res) => {
  db.collection('reviews').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {reviews: result})
  })
})

app.post('/reviews', (req, res) => {
  db.collection('reviews').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/reviews')
  })
})


app.post('/getinvolved', (req, res) => {
  db.collection('volunteers').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.post('/getnotified', (req,res) => {
		transporter.sendMail({
  from: 'sushabh.deshmukh@gmail.com',
  to: req.body.email,
  subject: 'Welcome to Mauli NGO',
  text: 'Welcome to Mauli NGO, we are pleased to have you with us as a volunteer. Get our event details from here.'
}
, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
}); 
res.redirect('/')
})



app.get('/donation', (req, res) => {
  	res.render('log.ejs')
})

