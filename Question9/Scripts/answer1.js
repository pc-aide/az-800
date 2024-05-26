function attachSolutionButtonListeners_question1(button) {
  button.addEventListener('click', function() {
      // Réinitialiser les couleurs des réponses
      document.querySelectorAll('.question-row').forEach(row => {
          row.classList.remove('incorrect', 'highlight');
      });

      // Vérifier les réponses
      let allCorrect = true;

      const file1Deduplication = document.querySelector('input[name="file1-deduplication"]:checked');
      if (file1Deduplication && file1Deduplication.value === 'yes') {
          document.querySelector('input[name="file1-deduplication"][value="yes"]').parentElement.classList.add('highlight');
      } else {
          document.querySelector('input[name="file1-deduplication"][value="yes"]').parentElement.classList.add('incorrect');
          allCorrect = false;
      }

      const file3Deduplication = document.querySelector('input[name="file3-deduplication"]:checked');
      if (file3Deduplication && file3Deduplication.value === 'no') {
          document.querySelector('input[name="file3-deduplication"][value="no"]').parentElement.classList.add('highlight');
      } else {
          document.querySelector('input[name="file3-deduplication"][value="no"]').parentElement.classList.add('incorrect');
          allCorrect = false;
      }

      const file4Deduplication = document.querySelector('input[name="file4-deduplication"]:checked');
      if (file4Deduplication && file4Deduplication.value === 'yes') {
          document.querySelector('input[name="file4-deduplication"][value="yes"]').parentElement.classList.add('highlight');
      } else {
          document.querySelector('input[name="file4-deduplication"][value="yes"]').parentElement.classList.add('incorrect');
          allCorrect = false;
      }

      // Mise à jour du score
      if (allCorrect) {
          score++;
      }
      showFinalScore();

      // Afficher l'explication
      document.getElementById('solutionInfo_question1').style.display = 'block';
  });
}
