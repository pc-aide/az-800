function attachSolutionButtonListeners_answer13(button) {
  button.addEventListener('click', function() {
      const solutionInfoId = this.dataset.solutionInfoId;
      const correctAnswers = this.dataset.correctAnswer.split(',');
      checkAnswer13(correctAnswers, solutionInfoId, this.dataset.solutionText);
  });
}

function checkAnswer13(correctAnswers, solutionInfoId, solutionText) {
  const selectedOptions = document.querySelectorAll('input[name="answer"]:checked');
  const userAnswers = Array.from(selectedOptions).map(option => option.value);

  const solutionInfo = document.getElementById(solutionInfoId);
  let isCorrect = correctAnswers.every(answer => userAnswers.includes(answer)) && userAnswers.length === correctAnswers.length;

  if (isCorrect) {
      solutionInfo.innerHTML = solutionText;
      solutionInfo.classList.remove('incorrect');
      solutionInfo.classList.add('highlight');
      score += 1; // Ajouter un point si la réponse est correcte
  } else {
      const userAnswerText = `Your answers: ${userAnswers.join(', ')}`;
      solutionInfo.innerHTML = `${userAnswerText}.<br><br>${solutionText}`;
      solutionInfo.classList.remove('highlight');
      solutionInfo.classList.add('incorrect');
  }

  solutionInfo.style.display = 'block';
  showFinalScore();
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.solutionButton').forEach(button => {
      attachSolutionButtonListeners_answer13(button);
  });
});

function showFinalScore() {
  const finalScoreElement = document.getElementById('finalScore');
  if (finalScoreElement) {
      const percentage = (score / totalQuestions) * 100;
      finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
  }
}
