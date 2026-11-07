const general = [
  {
    question: "Apa ibu kota negara Jepang?",
    options: ["Seoul", "Tokyo", "Beijing", "Bangkok"],
    answer: "Tokyo",
  },
  {
    question: "Planet apa yang dikenal sebagai Planet Merah?",
    options: ["Venus", "Jupiter", "Mars", "Saturnus"],
    answer: "Mars",
  },
  {
    question: "Apa nama samudra terbesar di dunia?",
    options: ["Samudra Atlantik","Samudra Hindia","Samudra Arktik","Samudra Pasifik"],
    answer: "Samudra Pasifik",
  },
  {
    question: "Hewan apa yang dikenal sebagai mamalia terbesar di dunia",
    options: ["Gajah Afrika", "Paus biru", "Jerapah", "Hiu Putih"],
    answer: "Paus biru",
  },
  {
    question: "Berapa Jumlah warna pada pelangi yang umum dikenal?",
    options: ["5", "6", "7", "8"],
    answer: "7",
  },
];

const getQuestion = document.getElementById("general");
let score = parseInt(localStorage.getItem('score')) || 0;
let indexQuestion = parseInt(localStorage.getItem('indexQuestion')) || 0;
let correct = parseInt(localStorage.getItem('correct')) || 0;
let wrong = parseInt(localStorage.getItem('wrong')) || 0;
let answeredQuestions = JSON.parse(localStorage.getItem('answeredQuestions')) || [];

const showQuestion = () => {
  const data = general[indexQuestion];
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
  localStorage.setItem('answeredQuestions', JSON.stringify(answeredQuestions));
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
    localStorage.setItem('indexQuestion', indexQuestion);
    localStorage.setItem('score', score);
    localStorage.setItem('correct', correct);
    localStorage.setItem('wrong', wrong);

    showNextBtn()
};

const showNextBtn = () => {
  const btnNext = document.createElement("button");
  btnNext.className = "w-64 bg-purple-700 hover:bg-purple-600 p-2 rounded-2xl mt-5 text-emerald-300";
  getQuestion.appendChild(btnNext);

  if (indexQuestion === general.length - 1) {
        btnNext.textContent = `Lihat Hasil`;
    } else {
        btnNext.textContent = `Soal Berikutnya`;
    }

  btnNext.addEventListener("click", () => {
    indexQuestion++;
    if (indexQuestion < general.length) {
      localStorage.setItem('indexQuestion', indexQuestion);
      getQuestion.innerHTML = "";
      showQuestion();
    } else {
      localStorage.removeItem('indexQuestion');
      localStorage.removeItem('score');
      localStorage.removeItem('correct');
      localStorage.removeItem('wrong');
      localStorage.removeItem('answeredQuestions');
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
