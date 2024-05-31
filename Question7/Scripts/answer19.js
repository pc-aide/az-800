function attachSolutionButtonListeners_question19(button) {
  button.addEventListener('click', function() {
      // Réinitialiser les couleurs des réponses
      document.querySelectorAll('.question-row').forEach(row => {
          row.classList.remove('incorrect', 'highlight');
      });

      // Vérifier les réponses
      const answers = {
          "q19_1": "No",
          "q19_2": "Yes",
          "q19_3": "No"
      };

      let allCorrect = true;

      for (const [name, correctAnswer] of Object.entries(answers)) {
          const selectedAnswer = document.querySelector(`input[name="${name}"]:checked`);
          const rowElement = document.querySelector(`input[name="${name}"]`).parentElement.parentElement;
          if (selectedAnswer && selectedAnswer.value === correctAnswer) {
              rowElement.classList.add('highlight');
          } else {
              rowElement.classList.add('incorrect');
              allCorrect = false;
          }
      }

      // Si toutes les réponses sont correctes, mettre le texte en jaune et ajouter un point au score
      const solutionInfoElement = document.getElementById('solutionInfo_question19');
      if (solutionInfoElement) {
          if (allCorrect) {
              solutionInfoElement.classList.add('highlight');
              solutionInfoElement.classList.remove('incorrect');
              score++;
          } else {
              solutionInfoElement.classList.add('incorrect');
              solutionInfoElement.classList.remove('highlight');
          }
          solutionInfoElement.style.display = 'block';
      }

      showFinalScore();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.solutionButton').forEach(button => {
      attachSolutionButtonListeners_question19(button);
  });
});

function showFinalScore() {
  const finalScoreElement = document.getElementById('finalScore');
  if (finalScoreElement) {
      const percentage = (score / totalQuestions) * 100;
      finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
  }
}