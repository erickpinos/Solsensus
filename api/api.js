var express = require('express');
const { exec } = require('child_process');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.get('/miner', function (req, res) {
  const status = req.query.status
  if(status == "on") {
    //run miner
    console.log("Starting Miner!")
    try {
      exec('node index.js', (err, stdout, stderr) => {
        console.log("lasdkfjsdlkfj")
        if (err) {
          // node couldn't execute the command
          console.log(err)
          return;
        }
        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      });

      setInterval(function(){
        exec('sudo lsof -i tcp:3003', (err, stdout, stderr) => {
          if (err) {
            // node couldn't execute the command
            return;
          }

          // the *entire* stdout and stderr (buffered)
          console.log(`stdout: ${stdout}`);
          console.log(`stderr: ${stderr}`);
        });
      }, 1000);
    } catch (error) {
      exec('kill $(lsof -t -i:3003)', (err, stdout, stderr) => {
      });
    }

  } else {
    //stop miner
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
