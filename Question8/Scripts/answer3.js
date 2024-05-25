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
              e.target.textContent = draggedElement.textContent;
              e.target.dataset.item = draggedElement.dataset.item;
              dropzone.classList.remove('highlight');
          }
      });
  });
}

function attachSolutionButtonListeners_answer3(button) {
  button.addEventListener('click', function() {
      const solutionInfoId = this.dataset.solutionInfoId;
      const correctAnswer = this.dataset.correctAnswer.split(',').map(Number);
      checkAnswer3(correctAnswer, solutionInfoId, this.dataset.solutionText);
  });
}

function checkAnswer3(correctAnswer, solutionInfoId, solutionText) {
  const userAnswers = [
      Number(document.getElementById('dropZone3.1').dataset.item),
      Number(document.getElementById('dropZone3.2').dataset.item),
      Number(document.getElementById('dropZone3.3').dataset.item)
  ];

  const isCorrect = userAnswers.length === correctAnswer.length && userAnswers.every((val, index) => val === correctAnswer[index]);

  const solutionInfo = document.getElementById(solutionInfoId);
  if (isCorrect) {
      solutionInfo.innerHTML = solutionText;
      solutionInfo.classList.remove('incorrect');
      solutionInfo.classList.add('highlight');
      score += 1; // Ajouter un point si la réponse est correcte
  } else {
      const userAnswersText = `Your answers: ${userAnswers.join(', ')}<br>`;
      const correctAnswersText = `Correct answer: ${correctAnswer.join(', ')}<br>`;
      const explanationText = `Explanation: Before a server can be used as a server endpoint in an Azure File Sync sync group, it must be registered with a Storage Sync Service. Install the Azure File Sync agent.<br><br>Ref: <a href='https://docs.microsoft.com/en-us/azure/storage/file-sync/file-sync-server-registration' target='_blank'>Microsoft Documentation</a>, <a href='https://docs.microsoft.com/en-us/azure/storage/file-sync/file-sync-server-endpoint-create?tabs=azure-portal' target='_blank'>Microsoft Documentation</a>.`;
      solutionInfo.innerHTML = `${userAnswersText}<br>${correctAnswersText}<br>${explanationText}`;
      solutionInfo.classList.remove('highlight');
      solutionInfo.classList.add('incorrect');
  }

  solutionInfo.style.display = 'block';
  showFinalScore();
}

document.addEventListener('DOMContentLoaded', function() {
  enableDragAndDrop();

  document.querySelectorAll('.solutionButton').forEach(button => {
      attachSolutionButtonListeners_answer3(button);
  });
});

function showFinalScore() {
  const finalScoreElement = document.getElementById('finalScore');
  if (finalScoreElement) {
      const percentage = (score / totalQuestions) * 100;
      finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
  }
}
