function attachSolutionButtonListeners_question2(button) {
  button.addEventListener('click', function() {
      // Réinitialiser les couleurs des réponses
      document.querySelectorAll('.question-row').forEach(row => {
          row.classList.remove('incorrect', 'highlight');
      });

      // Vérifier la réponse
      let allCorrect = true;

      const selectedAnswer = document.querySelector('input[name="fsrm-quotas"]:checked');
      if (selectedAnswer && selectedAnswer.value === 'A') {
          document.querySelector('input[name="fsrm-quotas"][value="A"]').parentElement.classList.add('highlight');
      } else {
          document.querySelector('input[name="fsrm-quotas"][value="A"]').parentElement.classList.add('incorrect');
          allCorrect = false;
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
