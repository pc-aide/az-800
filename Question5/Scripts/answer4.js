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

function attachSolutionButtonListeners_answer4(button) {
  button.addEventListener('click', function() {
      const solutionInfoId = this.dataset.solutionInfoId;
      const correctAnswer = this.dataset.correctAnswer.split(',');
      checkAnswer4(correctAnswer, solutionInfoId, this.dataset.solutionText);
  });
}

function checkAnswer4(correctAnswer, solutionInfoId, solutionText) {
  let isCorrect = true;
  const dropzone1 = document.querySelector('#dropzone1').textContent.trim();
  const dropzone2 = document.querySelector('#dropzone2').textContent.trim();
  const dropzone3 = document.querySelector('#dropzone3').textContent.trim();
  const userAnswer = [dropzone1, dropzone2, dropzone3];

  userAnswer.forEach((answer, index) => {
      if (answer !== correctAnswer[index]) {
          isCorrect = false;
      }
  });

  const solutionInfo = document.getElementById(solutionInfoId);
  if (isCorrect) {
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
      attachSolutionButtonListeners_answer4(button);
  });
});
