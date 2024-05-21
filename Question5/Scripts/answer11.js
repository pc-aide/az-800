function attachSolutionButtonListeners_answer11(button) {
  button.addEventListener('click', function() {
      const solutionInfoId = this.dataset.solutionInfoId;
      const correctAnswer = this.dataset.correctAnswer;
      checkAnswer11(correctAnswer, solutionInfoId, this.dataset.solutionText);
  });
}

function checkAnswer11(correctAnswer, solutionInfoId, solutionText) {
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  const userAnswer = selectedOption ? selectedOption.value : null;

  const solutionInfo = document.getElementById(solutionInfoId);
  if (userAnswer === correctAnswer) {
      solutionInfo.innerHTML = solutionText;
      solutionInfo.classList.remove('incorrect');
      solutionInfo.classList.add('highlight');
      score += 1; // Ajouter un point si la réponse est correcte
  } else {
      const userAnswerText = userAnswer ? `Your answer: ${selectedOption.nextElementSibling.textContent.trim()}` : "No answer selected";
      solutionInfo.innerHTML = `${userAnswerText}.<br><br>${solutionText}`;
      solutionInfo.classList.remove('highlight');
      solutionInfo.classList.add('incorrect');
  }

  solutionInfo.style.display = 'block';
  showFinalScore();
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.solutionButton').forEach(button => {
      attachSolutionButtonListeners_answer11(button);
  });
});

function showFinalScore() {
  const finalScoreElement = document.getElementById('finalScore');
  if (finalScoreElement) {
      const percentage = (score / totalQuestions) * 100;
      finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
  }
}