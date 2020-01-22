// class Question {
//   constructor(desc, questionBody, answers, correctAnswer) {
//     Object.assign(this, { desc, questionBody, answers, correctAnswer });
//   }
// }
// const fs = require('fs');
// const fileContents = fs.readFileSync('project-quiz/quiz.json', 'utf8');

// const questions = [];

// try {
//   const data = JSON.parse(fileContents);
//   for ([key, value] of Object.entries(data)) {
//     questions.push(
//       new Question(key, value.question, value.answers, value.correct)
//     );
//   }
// } catch (err) {
//   console.error(err);
// }
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
class Question {
  constructor(desc, questionBody, answers, correctAnswer) {
    Object.assign(this, { desc, questionBody, answers, correctAnswer });
  }
}

let questions = [];

for ([key, value] of Object.entries(myQuestions)) {
  questions.push(
    new Question(key, value.question, value.answers, value.correct)
  );
}

const form = document.querySelector('.quiz-form');
let html = '';

// render all questions to html
questions.forEach(el => {
  html += `
    <div class="my-5">
    <p class="lead font-weight-normal">${el.desc.substr(
      el.desc.search(/\d{1,}/)
    )}. ${el.questionBody}</p>
  `;
  for ([key, value] of Object.entries(el.answers)) {
    if (key === 'a') {
      html += `
      <div class="form-check my-2 text-white-50">
        <input type="radio" name="${el.desc}" id="${
        el.desc
      }-${key}" value="${key.toUpperCase()}" checked>
      `;
    } else {
      html += `
      <div class="form-check my-2 text-white-50">
        <input type="radio" name="${el.desc}" id="${
        el.desc
      }-${key}" value="${key.toUpperCase()}">
      `;
    }
    html += `
      <label for="${el.desc}-${key}" class="form-check-label">${value}</label>
      </div>
    `;
  }
  html += '</div>';
});
html += `
  <div class="text-center">
  <input type="submit" class="btn btn-light">
  </div>
`;
form.innerHTML += html;

const result = document.querySelector('.result');
const resultDisplay = result.querySelector('span');
form.addEventListener('submit', e => {
  e.preventDefault();
  let score = 0;
  let answers = [];
  let answersValues = document.querySelectorAll('.form-check input');
  answersValues.forEach(answer => {
    if (answer.checked === true) {
      answers.push(answer.value);
    }
  });
  answers.forEach((answer, index) => {
    if (answer === questions[index].correctAnswer.toUpperCase()) {
      score += 10;
    }
  });
  // show result on page
  scrollTo(0, 0);
  result.classList.remove('d-none');
  let output = 0;
  const timer = setInterval(() => {
    resultDisplay.textContent = `${output}%`;
    output++;
    if (output > score) {
      clearInterval(timer);
    }
  }, 10);

  form.reset();
});

// let i = 0;
// const timer = setInterval(() => {
//   console.log('hello');
//   i++;
//   if (i === 5) {
//     clearInterval(timer);
//   }
// }, 1000);
