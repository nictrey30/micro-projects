const express = require('express'),
  app = express(),
  expressSanitizer = require('express-sanitizer'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  methodOverride = require('method-override'),
  port = 4000;
// APP config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(expressSanitizer());
app.use(express.static('public'));
app.set('view engine', 'ejs');
// db config
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/jokes_restful');
let jokesSchema = new mongoose.Schema({
  question: String,
  content: String,
  author: String,
  created: { type: Date, default: Date.now() }
});
let Joke = mongoose.model('Joke', jokesSchema);
// Joke.create(
//   {
//     question: 'You know why you never see elephants hiding up in trees?',
//     content: 'Because they’re really good at it.',
//     author: 'Trey'
//   },
//   (err, joke) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('new joke created');
//       console.log(joke);
//     }
//   }
// );
app.get('/', (req, res) => {
  res.redirect('/jokes');
});
// index route
app.get('/jokes', (req, res) => {
  Joke.find({}, (err, jokes) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { jokes: jokes });
    }
  });
});
// new route
app.get('/jokes/new', (req, res) => {
  res.render('new');
});
// create route
app.post('/jokes', (req, res) => {
  req.body.joke.content = req.sanitize(req.body.joke.content);
  Joke.create(req.body.joke, (err, newJoke) => {
    if (err) {
      console.log(err);
      res.render('new');
    } else {
      // then, redirect to the index
      res.redirect('/jokes');
    }
  });
});
// show route
app.get('/jokes/:id', (req, res) => {
  Joke.findById(req.params.id, (err, foundJoke) => {
    if (err) {
      res.redirect('/jokes');
    } else {
      res.render('show', { joke: foundJoke });
    }
  });
});
// edit route
app.get('/jokes/:id/edit', (req, res) => {
  Joke.findById(req.params.id, (err, foundJoke) => {
    if (err) {
      console.log(err);
    } else {
      res.render('edit', { joke: foundJoke });
    }
  });
});
// update route
app.put('/jokes/:id', (req, res) => {
  req.body.joke.content = req.sanitize(req.body.joke.content);
  // findByIdAndUpdate(id, newData, callback);
  Joke.findByIdAndUpdate(req.params.id, req.body.joke, (err, updatedJoke) => {
    if (err) {
      res.redirect('/jokes');
    } else {
      res.redirect(`/jokes/${updatedJoke._id}`);
    }
  });
});
// delete route
app.delete('/jokes/:id', (req, res) => {
  Joke.findByIdAndRemove(req.params.id, err => {
    if (err) {
      console.log(err);
      res.redirect('/jokes');
    } else {
      res.redirect('/jokes');
    }
  });
});

app.listen(port, () => console.log('Jokes server started on port ', port));
