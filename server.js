// load the things we need
const express = require('express');
const app = express();
const bodyParser  = require('body-parser');

// required module to make calls to a REST API
const axios = require('axios');

const selectedID = "";
app.use(bodyParser.urlencoded());

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
// app.get('/choose', function(req, res) {
//     var mascots = [
//         { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
//         { name: 'Tux', organization: "Linux", birth_year: 1996},
//         { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
//     ];
//     var tagline = "No programming concept is complete without a cute animal mascot.";
//
//     res.render('pages/choose', {
//         mascots: mascots,
//         tagline: tagline
//     });
// });

//choose API page
app.get('/', function(req, res)  {
        //superhero API CALL
        axios.get('https://superheroapi.com/api/2413789278758819/69')
        .then((response)=>{
            console.log(response)
            const myHero = response.data;
            res.render('pages/index', {
                hero: myHero
            });

});

app.post('/', function(req, res)   {
    // create a variable to hold the username parsed from the request body
    const heroname = req.body.myHero
    console.log('sweatyballs:', heroname)
    const url = `https://superheroapi.com/api/2413789278758819/search/${heroname}`
     axios.get(url)
        .then((response)=>{
            const myHero = response.data;
            const aliases = myHero.results.map(item =>{
                return item.biography.aliases
            })
             res.render('pages/index', {
                 aliases: aliases
                 });
        });

// console.log(aliases)
//     res.render('pages/index', {body: req.body})
//                  });
//         });
//


  // app.post('/processdynamicform', function(req, res){
  //   //go directly to thanks.ejs and show dynamic checkbox selection
  //   console.log(req.body);
  //   selectedID = req.body;
  //   for (x in req.body) {
  //       const selectedName = x;
  //       console.log("selected name is: " + selectedName);
  //   }
  //   res.render('pages/thanks.ejs', {body: req.body})
  //
  // })

// Start the server
app.listen(8080, err =>{
    err ?
    console.log("Error in server setup") :
    console.log("Server listening on Port", 8080)
});

