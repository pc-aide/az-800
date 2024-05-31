function attachSolutionButtonListeners_question13(button) {
  button.addEventListener('click', function() {
      // Réinitialiser les couleurs des réponses
      document.querySelectorAll('.question-row').forEach(row => {
          row.classList.remove('incorrect', 'highlight');
      });

      // Vérifier la réponse
      let allCorrect = true;
      const correctAnswers = ['B. Create a conditional forwarder for fabrikam.com on DC1.', 'E. Deploy an Azure virtual machine that runs Windows Server. Configure the virtual machine as a DNS forwarder.'];
      const selectedAnswers = Array.from(document.querySelectorAll('input[name="question13"]:checked')).map(input => input.value);

      correctAnswers.forEach((answer) => {
          const answerElement = document.querySelector(`input[name="question13"][value="${answer}"]`).parentElement;
          if (selectedAnswers.includes(answer)) {
              answerElement.classList.add('highlight');
          } else {
              answerElement.classList.add('incorrect');
              allCorrect = false;
          }
      });

      const solutionInfoElement = document.getElementById('solutionInfo_question13');
      if (allCorrect) {
          solutionInfoElement.classList.add('highlight');
          solutionInfoElement.classList.remove('incorrect');
          score++;
      } else {
          solutionInfoElement.classList.add('incorrect');
          solutionInfoElement.classList.remove('highlight');
      }

      // Afficher l'explication
      if (solutionInfoElement) {
          solutionInfoElement.style.display = 'block';
      }

      showFinalScore();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.solutionButton').forEach(button => {
      attachSolutionButtonListeners_question13(button);
  });
});

function showFinalScore() {
  const finalScoreElement = document.getElementById('finalScore');
  if (finalScoreElement) {
      const percentage = (score / totalQuestions) * 100;
      finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
  }
}
