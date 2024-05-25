function attachSolutionButtonListeners_answer10(button) {
  button.addEventListener('click', function() {
      const solutionInfoId = this.dataset.solutionInfoId;
      const correctAnswer = this.dataset.correctAnswer.split(', ');
      const group1Answer = document.getElementById('group1').value;
      const domainComputersAnswer = document.getElementById('domainComputers').value;
      const solutionText = this.dataset.solutionText;

      const solutionInfo = document.getElementById(solutionInfoId);

      if (group1Answer && domainComputersAnswer) {
          const userAnswer = [group1Answer, domainComputersAnswer];
          const isCorrect = userAnswer.toString() === correctAnswer.toString();

          if (isCorrect) {
              solutionInfo.innerHTML = solutionText;
              solutionInfo.classList.remove('incorrect');
              solutionInfo.classList.add('highlight');
              score += 1; // Ajouter un point si la réponse est correcte
          } else {
              solutionInfo.innerHTML = `Your answers: Group1: ${group1Answer}, Domain Computers: ${domainComputersAnswer}.<br><br>${solutionText}`;
              solutionInfo.classList.remove('highlight');
              solutionInfo.classList.add('incorrect');
          }

          solutionInfo.style.display = 'block';
          showFinalScore();
      } else {
          solutionInfo.innerHTML = 'Your answers: indéfini.<br><br>Correct answer: Group1: ' + correctAnswer[0] + ', Domain Computers: ' + correctAnswer[1] + '<br><br>' + solutionText;
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
      attachSolutionButtonListeners_answer10(solutionButton);
  }
});
