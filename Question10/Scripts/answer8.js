function attachSolutionButtonListeners_question8(button) {
  button.addEventListener('click', function() {
      // Réinitialiser les couleurs des réponses
      document.querySelectorAll('.question-row').forEach(row => {
          row.classList.remove('incorrect', 'highlight');
      });

      // Vérifier la réponse
      let allCorrect = true;

      const selectedAnswer = document.querySelector('input[name="question8"]:checked');
      if (selectedAnswer && selectedAnswer.value === 'just in time (JIT) VM access') {
          document.querySelector('input[name="question8"][value="just in time (JIT) VM access"]').parentElement.classList.add('highlight');
      } else {
          document.querySelector('input[name="question8"][value="just in time (JIT) VM access"]').parentElement.classList.add('incorrect');
          allCorrect = false;
      }

      // Mise à jour du score
      if (allCorrect) {
          score++;
      }
      showFinalScore();

      // Afficher l'explication
      document.getElementById('solutionInfo_question8').style.display = 'block';
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.solutionButton').forEach(button => {
      attachSolutionButtonListeners_question8(button);
  });
});

function showFinalScore() {
  const finalScoreElement = document.getElementById('finalScore');
  if (finalScoreElement) {
      const percentage = (score / totalQuestions) * 100;
      finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
  }
}
