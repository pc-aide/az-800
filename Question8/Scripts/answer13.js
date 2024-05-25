function attachSolutionButtonListeners_answer13(button) {
  button.addEventListener('click', function() {
      const solutionInfoId = this.dataset.solutionInfoId;
      const correctAnswer = this.dataset.correctAnswer.split(',');
      checkAnswer13(correctAnswer, solutionInfoId, this.dataset.solutionText);
  });
}

function checkAnswer13(correctAnswer, solutionInfoId, solutionText) {
  const vnet1 = document.getElementById('vnet1').value;
  const onPremises = document.getElementById('onPremises').value;
  const selectedAnswers = [vnet1, onPremises];

  let isCorrect = true;
  selectedAnswers.forEach((answer, index) => {
      if (answer !== correctAnswer[index]) {
          isCorrect = false;
      }
  });

  const solutionInfo = document.getElementById(solutionInfoId);
  if (isCorrect) {
      solutionInfo.innerHTML = solutionText;
      solutionInfo.classList.remove('incorrect');
      solutionInfo.classList.add('highlight');
      score += 1; // Ajouter un point si la réponse est correcte
  } else {
      const userAnswerText = selectedAnswers.length ? selectedAnswers.join(', ') : "No answers selected";
      solutionInfo.innerHTML = `Your answers: ${userAnswerText}.<br><br>${solutionText}`;
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
