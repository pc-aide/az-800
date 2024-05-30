function attachSolutionButtonListeners_question10(button) {
  button.addEventListener('click', function() {
      // Réinitialiser les couleurs des réponses
      document.querySelectorAll('.answer-area').forEach(row => {
          row.classList.remove('incorrect', 'highlight');
      });

      // Vérifier la réponse
      let allCorrect = true;
      const correctAnswers = {
          "production-checkpoints": "VM1, VM2, & VM3",
          "hibernation": "Only VM1 & VM2"
      };

      for (let key in correctAnswers) {
          const selectedAnswer = document.getElementById(key).value;
          if (selectedAnswer === correctAnswers[key]) {
              document.getElementById(key).parentElement.classList.add('highlight');
          } else {
              document.getElementById(key).parentElement.classList.add('incorrect');
              allCorrect = false;
          }
      }

      // Mise à jour du score
      if (allCorrect) {
          score++;
      }
      showFinalScore();

      // Afficher l'explication
      document.getElementById('solutionInfo_question10').style.display = 'block';
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.solutionButton').forEach(button => {
      attachSolutionButtonListeners_question10(button);
  });
});

function showFinalScore() {
  const finalScoreElement = document.getElementById('finalScore');
  if (finalScoreElement) {
      const percentage = (score / totalQuestions) * 100;
      finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
  }
}
