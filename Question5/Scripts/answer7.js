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
              e.target.dataset.itemId = draggedElement.id;
              dropzone.classList.remove('highlight');
          }
      });
  });
}

function attachSolutionButtonListeners_answer7(button) {
  button.addEventListener('click', function() {
      const solutionInfoId = this.dataset.solutionInfoId;
      const correctAnswer = this.dataset.correctAnswer.split(',');
      checkAnswer7(correctAnswer, solutionInfoId, this.dataset.solutionText);
  });
}

function checkAnswer7(correctAnswer, solutionInfoId, solutionText) {
  const dropzone1 = document.querySelector('#dropzone7\\2e 7').dataset.itemId;
  const dropzone2 = document.querySelector('#dropzone7\\2e 8').dataset.itemId;
  const dropzone3 = document.querySelector('#dropzone7\\2e 9').dataset.itemId;
  const dropzone4 = document.querySelector('#dropzone7\\2e 10').dataset.itemId;
  const userAnswer = [dropzone1, dropzone2, dropzone3, dropzone4];

  const solutionInfo = document.getElementById(solutionInfoId);
  if (JSON.stringify(userAnswer) === JSON.stringify(correctAnswer)) {
      solutionInfo.innerHTML = solutionText;
      solutionInfo.classList.remove('incorrect');
      solutionInfo.classList.add('highlight');
      score += 1; // Ajouter un point si la réponse est correcte
  } else {
      const userAnswerText = userAnswer.length ? userAnswer.join(', ') : "non défini";
      solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>${solutionText}`;
      solutionInfo.classList.remove('highlight');
      solutionInfo.classList.add('incorrect');
  }

  solutionInfo.style.display = 'block';
  showFinalScore();
}

function showFinalScore() {
  const finalScoreElement = document.getElementById('finalScore');
  if (finalScoreElement) {
      const percentage = (score / totalQuestions) * 100;
      finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  enableDragAndDrop();

  document.querySelectorAll('.solutionButton').forEach(button => {
      attachSolutionButtonListeners_answer7(button);
  });
});
