function attachSolutionButtonListeners_question20(button) {
  button.addEventListener('click', function() {
      // Réinitialiser les couleurs des réponses
      document.querySelectorAll('.question-row').forEach(row => {
          row.classList.remove('incorrect', 'highlight');
      });

      // Vérifier la réponse
      let allCorrect = true;
      const correctAnswer = "C";
      const selectedAnswer = document.querySelector('input[name="question20"]:checked');

      if (selectedAnswer) {
          if (selectedAnswer.value === correctAnswer) {
              selectedAnswer.parentElement.classList.add('highlight');
          } else {
              selectedAnswer.parentElement.classList.add('incorrect');
              allCorrect = false;
          }
      } else {
          document.querySelectorAll('.question-row').forEach(row => {
              row.classList.add('incorrect');
          });
          allCorrect = false;
      }

      // Afficher l'explication
      const solutionInfo = document.getElementById('solutionInfo_question20');
      if (solutionInfo) {
          if (allCorrect) {
              solutionInfo.classList.add('highlight');
              solutionInfo.classList.remove('incorrect');
              score++;
          } else {
              solutionInfo.classList.add('incorrect');
              solutionInfo.classList.remove('highlight');
          }
          solutionInfo.style.display = 'block';
      }

      showFinalScore();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.solutionButton').forEach(button => {
      attachSolutionButtonListeners_question20(button);
  });
});

function showFinalScore() {
  const finalScoreElement = document.getElementById('finalScore');
  if (finalScoreElement) {
      const percentage = (score / totalQuestions) * 100;
      finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
  }
}
