function attachSolutionButtonListeners_question2(button) {
  button.addEventListener('click', function() {
      // Réinitialiser les couleurs des réponses
      document.querySelectorAll('.answer-area').forEach(row => {
          row.classList.remove('incorrect', 'highlight');
      });

      // Réinitialiser les couleurs du texte
      const registryTextElement = document.getElementById('registry-text');
      if (registryTextElement) {
          registryTextElement.classList.remove('incorrect', 'highlight');
      }

      // Vérifier la réponse
      let allCorrect = true;
      const correctAnswers = {
          "command": "docker",
          "operation": "push"
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
          registryTextElement.classList.add('highlight');
      } else {
          registryTextElement.classList.add('incorrect');
      }

      // Mise à jour du score
      if (allCorrect) {
          score++;
      }
      showFinalScore();

      // Afficher l'explication
      document.getElementById('solutionInfo_question2').style.display = 'block';
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.solutionButton').forEach(button => {
      attachSolutionButtonListeners_question2(button);
  });
});

function showFinalScore() {
  const finalScoreElement = document.getElementById('finalScore');
  if (finalScoreElement) {
      const percentage = (score / totalQuestions) * 100;
      finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
  }
}
