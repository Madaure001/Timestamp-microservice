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
app.get("/api/:date_string", function (req, res) {
  
  let dateString = new Date(req.params.date_string)
  //Using an ISO date format
  if (dateString.includes('-')){
    //date string
    responseObject['unix'] = new Date(dateString).getTime()
    responseObject['utc'] = new Date(dateString).toUTCString()
  }else{
    //timestamp
    dateString = parseInt(dateString)

    responseObject['unix'] = new Date(dateString).getTime()
    responseObject['utc']  = new Date(dateString).toUTCString()
    
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
