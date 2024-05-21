function attachSolutionButtonListeners_answer9(button) {
  button.addEventListener('click', function() {
      const solutionInfoId = this.dataset.solutionInfoId;
      const correctAnswer = this.dataset.correctAnswer.split(',');
      checkAnswer9(correctAnswer, solutionInfoId, this.dataset.solutionText);
  });
}

function checkAnswer9(correctAnswer, solutionInfoId, solutionText) {
  const select1 = document.querySelector('#select1').value;
  const select2 = document.querySelector('#select2').value;
  const userAnswer = [select1, select2];

  const solutionInfo = document.getElementById(solutionInfoId);
  if (JSON.stringify(userAnswer) === JSON.stringify(correctAnswer)) {
      solutionInfo.innerHTML = solutionText;
      solutionInfo.classList.remove('incorrect');
      solutionInfo.classList.add('highlight');
      score += 1; // Ajouter un point si la réponse est correcte
  } else {
      const userAnswerText = `VMs that run Windows SRV 2022 Azure Edition: ${select1}, VMs that run Windows SRV 2019 or Windows SRV 2022: ${select2}`;
      solutionInfo.innerHTML = `${userAnswerText}.<br><br>${solutionText}`;
      solutionInfo.classList.remove('highlight');
      solutionInfo.classList.add('incorrect');
  }

  solutionInfo.style.display = 'block';
  showFinalScore();
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.solutionButton').forEach(button => {
      attachSolutionButtonListeners_answer9(button);
  });
});

function showFinalScore() {
  const finalScoreElement = document.getElementById('finalScore');
  if (finalScoreElement) {
      const percentage = (score / totalQuestions) * 100;
      finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
  }
}
