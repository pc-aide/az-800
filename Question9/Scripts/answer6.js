function attachSolutionButtonListeners_question6(button) {
  button.addEventListener('click', function() {
      // Réinitialiser les couleurs des réponses
      document.querySelectorAll('.answer-row').forEach(row => {
          row.classList.remove('incorrect', 'highlight');
      });

      // Vérifier les réponses
      let allCorrect = true;

      const selectedDisk1 = document.querySelector('select[name="disk1"]').value;
      const selectedDisk2 = document.querySelector('select[name="disk2"]').value;

      if (selectedDisk1 === '2') {
          document.querySelector('select[name="disk1"]').parentElement.classList.add('highlight');
      } else {
          document.querySelector('select[name="disk1"]').parentElement.classList.add('incorrect');
          allCorrect = false;
      }

      if (selectedDisk2 === '1') {
          document.querySelector('select[name="disk2"]').parentElement.classList.add('highlight');
      } else {
          document.querySelector('select[name="disk2"]').parentElement.classList.add('incorrect');
          allCorrect = false;
      }

      // Mise à jour du score
      if (allCorrect) {
          score++;
      }
      showFinalScore();

      // Afficher l'explication
      document.getElementById('solutionInfo_question6').style.display = 'block';
  });
}
