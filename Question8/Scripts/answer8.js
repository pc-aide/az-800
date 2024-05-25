function attachSolutionButtonListeners_answer8(button) {
  button.addEventListener('click', function() {
      const solutionInfoId = this.dataset.solutionInfoId;
      const correctAnswer = this.dataset.correctAnswer.split(',');
      const serverOption = document.getElementById('serverOption').value;
      const clientOption = document.getElementById('clientOption').value;
      const userAnswer = [serverOption, clientOption];
      const solutionText = this.dataset.solutionText;

      const solutionInfo = document.getElementById(solutionInfoId);

      if (serverOption && clientOption) {
          const isCorrect = JSON.stringify(userAnswer) === JSON.stringify(correctAnswer);

          if (isCorrect) {
              solutionInfo.innerHTML = solutionText;
              solutionInfo.classList.remove('incorrect');
              solutionInfo.classList.add('highlight');
              score += 1; // Ajouter un point si la réponse est correcte
          } else {
              solutionInfo.innerHTML = `Your answers: On Server1: ${serverOption}, On the client: ${clientOption}.<br><br>${solutionText}`;
              solutionInfo.classList.remove('highlight');
              solutionInfo.classList.add('incorrect');
          }

          solutionInfo.style.display = 'block';
          showFinalScore();
      } else {
          solutionInfo.innerHTML = 'Your answers: indéfini.<br><br>Correct answer: ' + correctAnswer.join(', ') + '<br><br>' + solutionText;
          solutionInfo.classList.remove('highlight');
          solutionInfo.classList.add('incorrect');
          solutionInfo.style.display = 'block';
      }
  });
}

function showFinalScore() {
  const finalScore = document.getElementById('finalScore');
  if (finalScore) {
    finalScore.textContent = `Final Score: ${score}/20 (${((score / 20) * 100).toFixed(2)}%)`;
  }
}

// Assuming this will be called after the page loads
document.addEventListener('DOMContentLoaded', function() {
  const solutionButton = document.querySelector('.solutionButton');
  if (solutionButton) {
      attachSolutionButtonListeners_answer8(solutionButton);
  }
});
