const dotenv  = require('dotenv').config();
const express   = require('express')
const bodyParser = require('body-parser')
const session = require('express-session');
const cors = require('cors');
const app       = express()
const port      = process.env.PORT || 8080


const options = {
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": '*',
    "Access-Control-Allow-Headers": 'Content-Type,x-xsrf-token',
    "Access-Control-Expose-Headers": true,
    "Access-Control-Allow-Methods": 'POST, GET, PUT, DELETE, OPTIONS'
};
app.use(session({ secret: 'test_secret', saveUninitialized: true, resave: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/views'));

app.use(cors(options));
let userSession;
app.use(bodyParser.json())
app.use( 
  bodyParser.urlencoded({
    extended: false
  })
)

var api = require('./routes/api')

app.use('/', api)

app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})

module.exports = app