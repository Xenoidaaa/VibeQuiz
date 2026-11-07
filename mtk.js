const math = [
  {
    question: "Berapakah hasil dari 15 x 4",
    options: ["45","50","60","65"],
    answer: "60",
  },
  {
    question: "Jika x + 7 = 15. berapakah nilai x",
    options: ["6","7","8","9"],
    answer: "8",
  },
  {
    question: "Berapakah hasil dari 144 / 12?",
    options: ["10","11","12","14"],
    answer: "12",
  },
  {
    question: "Sebuah persegi memiliki sisi 8cm. Berapakah luasnya",
    options: ["16 cm","32 cm","48 cm","64 cm"],
    answer: "64 cm",
  },
  {
    question: "Berapakah hasil dari \u00BE + \u00bc",
    options: ["\u00BD","1","\u00BC","2"],
    answer: "1",
  },
];

const getQuestion = document.getElementById("math");
let score = parseInt(localStorage.getItem('math_score')) || 0;
let indexQuestion = parseInt(localStorage.getItem('math_indexQuestion')) || 0;
let correct = parseInt(localStorage.getItem('math_correct')) || 0;
let wrong = parseInt(localStorage.getItem('math_wrong')) || 0;
let answeredQuestions = JSON.parse(localStorage.getItem('math_answeredQuestions')) || [];

const showQuestion = () => {
  const data = math[indexQuestion];
  const index = document.createElement("div");
  index.className = "text-emerald-300  font-Plus-Jakarta-sans font-semibold";
  index.textContent = `Soal Nomor ${(indexQuestion + 1)}`;
  getQuestion.appendChild(index);
  const questions = document.createElement("div");
  questions.setAttribute("class", "question-text");
  questions.className = "text-center";
  questions.textContent = data.question;
  getQuestion.appendChild(questions);
  data.options.forEach((opsi) => {
    const options = document.createElement("button");
    options.className = "option-btn w-64 bg-purple-700 hover:bg-purple-600 p-2 rounded-2xl font-Plus-Jakarta-sans";
    options.textContent = opsi;

      options.addEventListener("click", () => {
      validateAnswer(options, data.answer);
    });
    getQuestion.appendChild(options);
  });

   if (answeredQuestions.includes(indexQuestion)) {
       showNextBtn()
    }
  getQuestion.style.color = "white";
};

const validateAnswer = (selectedOption, correctAnswer) => {
  if (answeredQuestions.includes(indexQuestion)) {
    return;
  }
  answeredQuestions.push(indexQuestion);
  localStorage.setItem('math_answeredQuestions', JSON.stringify(answeredQuestions));
  const getAllBtn = document.querySelectorAll(".option-btn");
  getAllBtn.forEach((btn) => {
    btn.disabled = true;
  });

  if (selectedOption.textContent === correctAnswer) {
    selectedOption.classList.remove("bg-purple-700", "hover:bg-purple-600");
    selectedOption.classList.add("bg-green-600");
    score += 20;
    correct += 1;
  } else {
    selectedOption.classList.remove("bg-purple-700", "hover:bg-purple-600");
    selectedOption.classList.add("bg-red-600");
    wrong += 1;
  }
    localStorage.setItem('math_indexQuestion', indexQuestion);
    localStorage.setItem('math_score', score);
    localStorage.setItem('math_correct', correct);
    localStorage.setItem('math_wrong', wrong);

    showNextBtn()
};

const showNextBtn = () => {
  const btnNext = document.createElement("button");
  btnNext.className = "w-64 bg-purple-700 hover:bg-purple-600 p-2 rounded-2xl mt-5 text-emerald-300";
  getQuestion.appendChild(btnNext);

  if (indexQuestion === math.length - 1) {
        btnNext.textContent = `Lihat Hasil`;
    } else {
        btnNext.textContent = `Soal Berikutnya`;
    }

  btnNext.addEventListener("click", () => {
    indexQuestion++;
    if (indexQuestion < math.length) {
      localStorage.setItem('math_indexQuestion', indexQuestion);
      getQuestion.innerHTML = "";
      showQuestion();
    } else {
      localStorage.removeItem('math_indexQuestion');
      localStorage.removeItem('math_score');
      localStorage.removeItem('math_correct');
      localStorage.removeItem('math_wrong');
      localStorage.removeItem('math_answeredQuestions');
      getQuestion.innerHTML = "";

      const finish = document.createElement("div");
      finish.textContent = `Hasil`;
      finish.className = "text-emerald-300  font-Plus-Jakarta-sans font-semibold"
      getQuestion.appendChild(finish);

      const yourScore = document.createElement('div');
      yourScore.textContent = `Total Skor: ${score}`;
      getQuestion.appendChild(yourScore);

      const corrects = document.createElement('div');
      corrects.textContent = `Jawaban Benar ${correct}`
      getQuestion.appendChild(corrects);

      const wrongAnswer = document.createElement('div');
      wrongAnswer.textContent = `Jawaban Salah ${wrong}`
      getQuestion.appendChild(wrongAnswer);

      const btnBack = document.createElement('a');
      btnBack.textContent = `Kembali`;
      btnBack.className = "w-64 bg-purple-700 hover:bg-purple-600 p-2 rounded-2xl font-Plus-Jakarta-sans text-center"
      btnBack.href = "quizCategory.html"
      getQuestion.appendChild(btnBack);
    }
  });

}

showQuestion();