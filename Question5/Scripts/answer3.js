function attachSolutionButtonListeners_question3(button) {
  button.addEventListener('click', function() {
      // Réinitialiser les couleurs des réponses
      document.querySelectorAll('.answer-area').forEach(row => {
          row.classList.remove('incorrect', 'highlight');
      });

      // Réinitialiser les couleurs du texte
      const solutionInfoElement = document.getElementById('solutionInfo_question3');
      if (solutionInfoElement) {
          solutionInfoElement.classList.remove('incorrect', 'highlight');
      }

      // Vérifier la réponse
      let allCorrect = true;
      const correctAnswers = {
          "volume-db": "F",
          "caching-config": "None"
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

      // Si toutes les réponses sont correctes, mettre le texte en jaune
      if (allCorrect) {
          solutionInfoElement.classList.add('highlight');
      } else {
          solutionInfoElement.classList.add('incorrect');
      }

      // Mise à jour du score
      if (allCorrect) {
          score++;
      }
      showFinalScore();

      // Afficher l'explication
      document.getElementById('solutionInfo_question3').style.display = 'block';
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.solutionButton').forEach(button => {
      attachSolutionButtonListeners_question3(button);
  });
});

function showFinalScore() {
  const finalScoreElement = document.getElementById('finalScore');
  if (finalScoreElement) {
      const percentage = (score / totalQuestions) * 100;
      finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
  }
}
