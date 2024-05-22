function attachSolutionButtonListeners_answer1(button) {
  button.addEventListener('click', function() {
      const solutionInfoId = this.dataset.solutionInfoId;
      const correctAnswer = this.dataset.correctAnswer;
      checkAnswer1(correctAnswer, solutionInfoId, this.dataset.solutionText);
  });
}

function checkAnswer1(correctAnswer, solutionInfoId, solutionText) {
  const selectedAnswer = document.querySelector('input[name="answer1"]:checked');
  
  if (!selectedAnswer) {
      console.error("No option selected");
      return;
  }

  const userAnswer = selectedAnswer.value;

  const isCorrect = userAnswer === correctAnswer;

  const solutionInfo = document.getElementById(solutionInfoId);
  if (isCorrect) {
      solutionInfo.innerHTML = solutionText;
      solutionInfo.classList.remove('incorrect');
      solutionInfo.classList.add('highlight');
      score += 1; // Ajouter un point si la réponse est correcte
  } else {
      const userAnswerText = `Your answer: ${getDisplayText(userAnswer)}.<br><br>Correct answer: ${getDisplayText(correctAnswer)}`;
      solutionInfo.innerHTML = `${userAnswerText}.<br><br>${solutionText}`;
      solutionInfo.classList.remove('highlight');
      solutionInfo.classList.add('incorrect');
  }

  solutionInfo.style.display = 'block';
  showFinalScore();
}

function getDisplayText(value) {
  const options = {
      "item1.1": "A. LACP teaming mode",
      "item1.2": "B. Switch Embedded Teaming (SET)",
      "item1.3": "C. load balancing and failover (LBFO)",
      "item1.4": "D. Static teaming mode"
  };
  return options[value] || value;
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.solutionButton').forEach(button => {
      attachSolutionButtonListeners_answer1(button);
  });
});

function showFinalScore() {
  const finalScoreElement = document.getElementById('finalScore');
  if (finalScoreElement) {
      const percentage = (score / totalQuestions) * 100;
      finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
  }
}
