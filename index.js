var fs = require('fs');
var express = require('express');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })
var cors = require('cors');

 
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyze', upload.single('upfile'), (req, res) => {
  res.json({
    "File Name": req.file.originalname,
    "File Type": req.file.mimetype,
    "File Size": req.file.size + " bytes"
  })

  let resultHandler = function (err) {
    if (err) {
      console.log("Unlink failed.", err);
    } else {
      console.log("File deleted.");
    }
  }

  fs.unlink(req.file.path, resultHandler);
  
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
