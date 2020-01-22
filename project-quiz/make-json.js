const myQuestions = {
  q1: {
    question: 'Who is the strongest?',
    answers: {
      a: 'Superman',
      b: 'The Terminator',
      c: 'Waluigi, obviously'
    },
    correct: 'c'
  },
  q2: {
    question: 'What is the best site ever created?',
    answers: {
      a: 'SitePoint',
      b: 'Simple Steps Code',
      c: "Trick question; they're both the best"
    },
    correct: 'c'
  },
  q3: {
    question: 'Where is Waldo really?',
    answers: {
      a: 'Antarctica',
      b: 'Exploring the Pacific Ocean',
      c: 'Sitting in a tree',
      d: 'Minding his own business, so stop asking'
    },
    correct: 'd'
  },
  q4: {
    question:
      "Which famous con-artist's life is the film Catch Me If You Can based on?",
    answers: {
      a: 'Bernard Madoff',
      b: 'Al Capone',
      c: 'Frank Abagnale',
      d: 'Steven Walcott'
    },
    correct: 'c'
  },
  q5: {
    question: 'How many stars does the U.S flag have?',
    answers: {
      a: '52',
      b: '50',
      c: '51',
      d: '49'
    },
    correct: 'b'
  },
  q6: {
    question: 'Who painted The Persistence of Memory',
    answers: {
      a: 'Picasso',
      b: 'Edvard Munch',
      c: 'Salvador Dali',
      d: 'Rene Magritte'
    },
    correct: 'c'
  },
  q7: {
    question: 'How long is the Great Wall of China?',
    answers: {
      a: '4000 miles',
      b: '4500 miles',
      c: '5500 miles',
      d: '6000 miles'
    },
    correct: 'a'
  },
  q8: {
    question: 'What is the most fractured human bone?',
    answers: {
      a: 'Peroneal',
      b: 'Ribs',
      c: 'Tibia',
      d: 'Clavicula'
    },
    correct: 'c'
  },
  q9: {
    question: 'What is the name of the Indian holy river?',
    answers: {
      a: 'Niles',
      b: 'Ganges',
      c: 'Euphrates',
      d: 'Tigris'
    },
    correct: 'c'
  },
  q10: {
    question:
      '	What is both a French wine region and a luxury American automobile?',
    answers: {
      a: 'Cadillac',
      b: 'Pontiac',
      c: 'Chevrolet',
      d: 'Lexus'
    },
    correct: 'a'
  }
};
let questionsString = JSON.stringify(myQuestions);

let fs = require('fs');
fs.writeFile('project-quiz/quiz.json', questionsString, err => {
  if (err) throw err;
  console.log('The file has been saved!');
});
