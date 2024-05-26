function attachSolutionButtonListeners_question5(button) {
  button.addEventListener('click', function() {
      // Réinitialiser les couleurs des réponses
      document.querySelectorAll('.question-row').forEach(row => {
          row.classList.remove('incorrect', 'highlight');
      });

      // Vérifier la réponse
      let allCorrect = true;

      const selectedAnswer = document.querySelector('input[name="fsrm-install"]:checked');
      if (selectedAnswer && selectedAnswer.value === 'C') {
          document.querySelector('input[name="fsrm-install"][value="C"]').parentElement.classList.add('highlight');
      } else {
          document.querySelector('input[name="fsrm-install"][value="C"]').parentElement.classList.add('incorrect');
          allCorrect = false;
      }

      // Mise à jour du score
      if (allCorrect) {
          score++;
      }
      showFinalScore();

      // Afficher l'explication
      document.getElementById('solutionInfo_question5').style.display = 'block';
  });
}
