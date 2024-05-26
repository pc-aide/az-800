function attachSolutionButtonListeners_question18(button) {
  button.addEventListener('click', function() {
      // Réinitialiser les couleurs des réponses
      document.querySelectorAll('.question-row').forEach(row => {
          row.classList.remove('incorrect', 'highlight');
      });

      // Vérifier la réponse
      let allCorrect = true;

      const selectedAnswer = document.querySelector('input[name="question18"]:checked');
      if (selectedAnswer && selectedAnswer.value === 'Admin1 only') {
          document.querySelector('input[name="question18"][value="Admin1 only"]').parentElement.classList.add('highlight');
      } else {
          document.querySelector('input[name="question18"][value="Admin1 only"]').parentElement.classList.add('incorrect');
          allCorrect = false;
      }

      // Mise à jour du score
      if (allCorrect) {
          score++;
      }
      showFinalScore();

      // Afficher l'explication
      document.getElementById('solutionInfo_question18').style.display = 'block';
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.solutionButton').forEach(button => {
      attachSolutionButtonListeners_question18(button);
  });
});

function showFinalScore() {
  const finalScoreElement = document.getElementById('finalScore');
  if (finalScoreElement) {
      const percentage = (score / totalQuestions) * 100;
      finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
  }
}
