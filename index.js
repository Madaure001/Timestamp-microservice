// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
let responseObject = {}
app.get("/api/:input", function (req, res) {
  
  let input = req.params.input
  //Using an ISO date format
  if (input.includes('-')){
    //date string
    responseObject['unix'] = new Date(input).getTime()
    responseObject['utc'] = new Date(input).toUTCString()
  }else{
    //timestamp
    input = parseInt(input)

    responseObject['unix'] = new Date(input).getTime()
    responseObject['utc']  = new Date(input).toUTCString()
    
  }
  
  if(!responseObject['unix'] || !responseObject['utc']){
    res.json({error: 'Invalid Date'})
  }
  res.json(responseObject);
});

app.get('/api/', (req, res) => {
  responseObject['unix'] = new Date().getTime()
  responseObject['utc'] = new Date().toUTCString()

  res.json(responseObject);
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
