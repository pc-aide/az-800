function attachSolutionButtonListeners_question6(button) {
  button.addEventListener('click', function() {
      // Réinitialiser les couleurs des réponses
      document.querySelectorAll('.question-row').forEach(row => {
          row.classList.remove('incorrect', 'highlight');
      });

      // Vérifier la réponse
      let allCorrect = true;
      const correctAnswers = ['Configure the DNS Servers settings for Vnet1', 'On DC3, install the DNS Server role'];
      const selectedAnswers = Array.from(document.querySelectorAll('input[name="question6"]:checked')).map(input => input.value);

      correctAnswers.forEach(answer => {
          if (!selectedAnswers.includes(answer)) {
              document.querySelector(`input[name="question6"][value="${answer}"]`).parentElement.classList.add('incorrect');
              allCorrect = false;
          } else {
              document.querySelector(`input[name="question6"][value="${answer}"]`).parentElement.classList.add('highlight');
          }
      });

      // Mise à jour du score
      if (allCorrect) {
          score++;
      }
      showFinalScore();

      // Afficher l'explication
      document.getElementById('solutionInfo_question6').style.display = 'block';
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.solutionButton').forEach(button => {
      attachSolutionButtonListeners_question6(button);
  });
});

function showFinalScore() {
  const finalScoreElement = document.getElementById('finalScore');
  if (finalScoreElement) {
      const percentage = (score / totalQuestions) * 100;
      finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
  }
}
