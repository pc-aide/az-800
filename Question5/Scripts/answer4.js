function enableDragAndDrop() {
  document.querySelectorAll('.draggable').forEach(draggable => {
      draggable.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('text/plain', e.target.id);
          e.dataTransfer.effectAllowed = 'move';
      });
  });

  document.querySelectorAll('.dropzone').forEach(dropzone => {
      dropzone.addEventListener('dragover', (e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
          dropzone.classList.add('highlight');
      });

      dropzone.addEventListener('dragleave', () => {
          dropzone.classList.remove('highlight');
      });

      dropzone.addEventListener('drop', (e) => {
          e.preventDefault();
          const data = e.dataTransfer.getData('text/plain');
          const draggedElement = document.getElementById(data);
          if (draggedElement) {
              e.target.textContent = draggedElement.dataset.action;
              e.target.dataset.action = draggedElement.dataset.action;
              e.target.dataset.itemId = draggedElement.id;
              dropzone.classList.remove('highlight');
          }
      });
  });
}

function attachSolutionButtonListeners_question4(button) {
  button.addEventListener('click', function() {
      // Réinitialiser les couleurs des réponses
      document.querySelectorAll('.dropzone').forEach(zone => {
          zone.classList.remove('incorrect', 'highlight');
      });

      // Vérifier la réponse
      let allCorrect = true;
      const correctAnswers = [
          "Create & attach a new data disk",
          "Initialize the disk",
          "Create a new simple volume"
      ];

      correctAnswers.forEach((answer, index) => {
          const dropZone = document.getElementById(`dropZone4.${index + 1}`);
          if (dropZone && dropZone.textContent.trim() === answer) {
              dropZone.classList.add('highlight');
          } else {
              dropZone.classList.add('incorrect');
              allCorrect = false;
          }
      });

      // Si toutes les réponses sont correctes, mettre le texte en jaune
      const solutionInfoElement = document.getElementById('solutionInfo_question4');
      if (solutionInfoElement) {
          if (allCorrect) {
              solutionInfoElement.classList.add('highlight');
          } else {
              solutionInfoElement.classList.add('incorrect');
          }
      }

      // Mise à jour du score
      if (allCorrect) {
          score++;
      }
      showFinalScore();

      // Afficher l'explication
      solutionInfoElement.style.display = 'block';
  });
}

document.addEventListener('DOMContentLoaded', function() {
  enableDragAndDrop();
  document.querySelectorAll('.solutionButton').forEach(button => {
      attachSolutionButtonListeners_question4(button);
  });
});

function showFinalScore() {
  const finalScoreElement = document.getElementById('finalScore');
  if (finalScoreElement) {
      const percentage = (score / totalQuestions) * 100;
      finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
  }
}
