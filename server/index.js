var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var database = require('./database.js');
var Sequelize = require('sequelize');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var PORT = process.env.PORT || 3000;

var app = express();
app.use(flash());
app.use(session({secret: 'keyboard cat', cookie: {maxAge: 300000}, saveUninitialized: false, resave: false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(express.static(__dirname + '/../react-client/src'));

app.get('/userinfo', function(req, res, next) {
  if (req.session.user) {
    res.send(req.session.user);
  } else {
    res.send();
  }
});

app.get('/summary', function(req, res) {

  var id = req.query.id;
  var recipeSummaryOptions = {
    url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${id}/summary`,
    method: 'GET',
    headers: {
      'X-Mashape-Key': 'q4398u4TA1mshLwj7IkUIAfEV3KHp11cFqPjsnzkkxjtTBxlHc',
      'Accept': 'application/json'
    }
  };

  request(recipeSummaryOptions, function(error, response, body) {
    if (error) {
      console.log(error);
      throw err;
    } else {
      body = JSON.parse(body);
      res.send(body.summary);
    }
  });
});

app.post('/register', function(req, res) {
  console.log(req);
  database.createUser(req, res);
});

app.post('/login', function(req, res) {
  database.checkIfUserExists(req, res);
});

app.post('/entry', function(req, res) {
  var ingreds = req.body.toString();

  //setting up params for request to Spoonacular API
  var recipeRetrievalOptions = {
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?',
    method: 'GET',
    headers: {
      'X-Mashape-Key': 'h88XRdVMrZmshoBOiBWVrmfnfWKTp1SlnIjjsn4adRtjrPpen1',
      'Accept': 'application/json'
    },
    qs: {
      ingredients: ingreds,
      number: 10
    }
  };

  //sending request to Spoonacular
  var finalResponseObj = {};
  var summary = {};

  request(recipeRetrievalOptions, function(error, response, body) {
    response = JSON.parse(response.body);

    for (var i = 0; i < response.length; i++) {
      var newResponse = response[i];

      //setting up object that will be stored inside of finalResponse for each recipe
      var responseObj = {};
      responseObj['id'] = newResponse.id;
      responseObj['title'] = newResponse.title;
      responseObj['image'] = newResponse.image;
      responseObj['usedIngredientCount'] = newResponse.usedIngredientCount;
      responseObj['missedIngredientCount'] = newResponse.missedIngredientCount;
      finalResponseObj[i] = responseObj;
    }
    res.send(finalResponseObj);
  });
});

app.post('/favoriteCreate', function(req, res) {
  database.createRecipe(req, res);
});

app.delete('/favoriteDestroy', function(req, res) {
  database.removeRecipe(req, res);
});

app.post('/favoriteGet', function(req, res) {
  database.retrieveFavorites(req, res);
});

app.get('/fetchRecipeById', function(req, res) {
  let recipeId = req.query.id;
  let url = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${recipeId}/information`;
  var fetchRecipeById = {
    url: url,
    includeNutrition: false,
    method: 'GET',
    headers: {
      'X-Mashape-Key': 'h88XRdVMrZmshoBOiBWVrmfnfWKTp1SlnIjjsn4adRtjrPpen1',
      'Accept': 'application/json'
    }
  };

  request(fetchRecipeById, function(err, response, body) {
    if (err) {
      throw err;
    }
    else {
      body = JSON.parse(body).analyzedInstructions
      res.send(body);
    }
  });
});

app.delete('/logout', function(req, res) {
  console.log('BEFORE', req.session);
  req.session.destroy();
  console.log('AFTER', req.session);
});

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});
