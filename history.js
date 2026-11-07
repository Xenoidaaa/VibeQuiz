const history = [
  {
    question: "Pada tanggal berapa Indonesia memproklamasikan Kemerdekaan?",
    options: ["17 Agustus 1945","20 Mei 1908","28 Oktober 1928","1 Juni 1945"],
    answer: "17 Agustus 1945",
  },
  {
    question: "Siapakah Presiden pertama Republik Indonesia?",
    options: ["Mohammad Hatta","Soekarno","Soeharto","B.J Habibie"],
    answer: "Soekarno",
  },
  {
    question: "Peradaban Mesir Kuno berkembang di sekitar sungai apa?",
    options: ["Sungai Amazon","Sungai Gangga","Sungai Nil","Sungai Eufrat"],
    answer: "Sungai Nil",
  },
  {
    question: "Siapakah tokoh yang dikenal sebagai penemu benua Amerika dalam sejarah Eropa?",
    options: ["Vasco da Gama","Christopher Columbus","Ferdinand Magellan","James Cook"],
    answer: "Christopher Columbus",
  },
  {
    question: "Tembok besar merupakan bangunan bersejarah dari negara mana?",
    options: ["India","Jepang","Korea","Tiongkok"],
    answer: "Tiongkok",
  },
];

const getQuestion = document.getElementById("history");
let score = parseInt(localStorage.getItem('history_score')) || 0;
let indexQuestion = parseInt(localStorage.getItem('history_indexQuestion')) || 0;
let correct = parseInt(localStorage.getItem('history_correct')) || 0;
let wrong = parseInt(localStorage.getItem('history_wrong')) || 0;
let answeredQuestions = JSON.parse(localStorage.getItem('history_answeredQuestions')) || [];

const showQuestion = () => {
  const data = history[indexQuestion];
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
  localStorage.setItem('history_answeredQuestions', JSON.stringify(answeredQuestions));
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
    localStorage.setItem('history_indexQuestion', indexQuestion);
    localStorage.setItem('history_score', score);
    localStorage.setItem('history_correct', correct);
    localStorage.setItem('history_wrong', wrong);

    showNextBtn()
};

const showNextBtn = () => {
  const btnNext = document.createElement("button");
  btnNext.className = "w-64 bg-purple-700 hover:bg-purple-600 p-2 rounded-2xl mt-5 text-emerald-300";
  getQuestion.appendChild(btnNext);

  if (indexQuestion === history.length - 1) {
        btnNext.textContent = `Lihat Hasil`;
    } else {
        btnNext.textContent = `Soal Berikutnya`;
    }

  btnNext.addEventListener("click", () => {
    indexQuestion++;
    if (indexQuestion < history.length) {
      localStorage.setItem('history_indexQuestion', indexQuestion);
      getQuestion.innerHTML = "";
      showQuestion();
    } else {
      localStorage.removeItem('history_indexQuestion');
      localStorage.removeItem('history_score');
      localStorage.removeItem('history_correct');
      localStorage.removeItem('history_wrong');
      localStorage.removeItem('history_answeredQuestions');
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

