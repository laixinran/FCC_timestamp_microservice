//Based on the Express framework, create a timestamp microservice that accepts a date parameter and returns the corresponding timestamp + utc time string
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

const isInvalidDate = (date) => date.toUTCString() === 'Invalid Date';


app.get("/api/:date", (req, res) => {
  const input = req.params.date;

//Check if the input is a Unix timestamp by determining whether it contains only numbers
  const isUnixTimestamp = /^[0-9]+$/.test(input); 
  if (isUnixTimestamp) {
    const unixTime = parseInt(input); //parseInt()是JS中的一个内置函数，用于将字符串解析为整数
    res.json({
      unix: unixTime,
      utc: new Date(unixTime).toUTCString()
    });
    return;
  }

  const testDate = new Date(input);
  if (isInvalidDate(testDate)) {
    res.json({ error: "Invalid Date" });
    return;
  }

  res.json({
    unix: testDate.getTime(),
    utc: testDate.toUTCString()
  });
});

// Handles requests to /api with an empty date parameter: should return the current time in a JSON object with a unix key & a utc key
app.get("/api", (req, res) => {
    res.json({ 
      unix: new Date().getTime(),
      utc: new Date().toUTCString() 
    });
  });

// The new Date() is a constructor in JavaScript used to create objects that represent dates and times. When new Date() is invoked, it returns a Date object representing the current date and time. If no arguments are passed, it will use the client's current date and time
  

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

  
