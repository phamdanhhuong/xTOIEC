
//Bộ đếm ngược thời gian
let timeRemaining = 2 * 3600;  // 2 giờ

function updateTimer() {
    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;
  
    document.getElementById('timeRemain').textContent = `Time Remain: ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  if (timeRemaining > 0) {
    timeRemaining--;
  }
}



//Load câu hỏi, đáp án và kiểm tra đáp án
const questions = [
  {
    question: "Thủ đô của Việt Nam là gì?",
    answers: ["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Huế"],
    correctAnswer: 0,
    score: 1,
    userScoce: 0
  },
  {
    question: "Thành phố nào lớn nhất Việt Nam?",
    answers: ["Đà Nẵng", "Hà Nội", "TP. Hồ Chí Minh", "Hải Phòng"],
    correctAnswer: 2,
    score: 1,
    userScoce: 0
  },
  {
    question: "Con sông dài nhất thế giới là gì?",
    answers: ["Amazon", "Nile", "Mekong", "Danube"],
    correctAnswer: 1,
    score: 1,
    userScoce: 0
  }
];

let timer;
const timeLimit = 3000; // 3 giây
let userOverrallScore = 0;

//Đổi màu khi chọn đáp án
function selectContainer(radio) {
  document.querySelectorAll('.radioContainer').forEach(container => {
      container.classList.remove('selected');
  });
  radio.closest('.radioContainer').classList.add('selected');
}

function displayQuestion(index) {
  let currentQuesHTML = document.getElementById('recentQuestion');
  currentQuesHTML.innerHTML = `${index + 1}/${questions.length}`;
  const quizContainer = document.getElementById('questionArea');
  const currentQuestion = questions[index];
  let questionHTML = `<div class="titleBold">Quesion</div><div class="question">${currentQuestion.question}</div><div class="answers">`;

  currentQuestion.answers.forEach((answer, i) => {
    questionHTML += `
      <label>
        <div class="radioContainer">
          <input type="radio" name="answer" value="${i}" onclick="selectContainer(this)">
          ${answer}
        </div>
      </label>`;
  });



  questionHTML += `</div>`;
  quizContainer.innerHTML = questionHTML;

  clearTimeout(timer);
  timer = setTimeout(() => {
    autoNextQuestion(index);
  }, timeLimit);
}

function autoNextQuestion(index) {
  submitAnswer(index);
  moveToNextQuestion(index);
}

function submitAnswer(index) {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (selectedAnswer) {
    const userAns = parseInt(selectedAnswer.value);
    const correctAns = questions[index].correctAnswer;
    if (userAns === correctAns) {
      userOverrallScore += questions[index].score;
    }
  }
}

function moveToNextQuestion(index) {
  if (index < questions.length - 1) {
    displayQuestion(index + 1);
  } else {
    document.getElementById('questionArea').innerHTML = `<p>Đã hoàn thành bài trắc nghiệm! Điểm của bạn là ${userOverrallScore}</p>`;
    clearInterval(timerInterval);
  }
}

const timerInterval = setInterval(updateTimer, 1000);
displayQuestion(0);