function attachSolutionButtonListeners_answer20(button) {
  button.addEventListener('click', function() {
      const solutionInfoId = this.dataset.solutionInfoId;
      const correctAnswer = this.dataset.correctAnswer.split(',');
      checkAnswer20(correctAnswer, solutionInfoId, this.dataset.solutionText);
  });
}

function checkAnswer20(correctAnswer, solutionInfoId, solutionText) {
  const selectedActions = [
      document.getElementById('dropzone1').textContent.trim(),
      document.getElementById('dropzone2').textContent.trim(),
      document.getElementById('dropzone3').textContent.trim()
  ];

  const isCorrect = selectedActions.length === correctAnswer.length && selectedActions.every((val, index) => val === correctAnswer[index]);

  const solutionInfo = document.getElementById(solutionInfoId);
  if (isCorrect) {
      solutionInfo.innerHTML = solutionText;
      solutionInfo.classList.remove('incorrect');
      solutionInfo.classList.add('highlight');
      score += 1; // Ajouter un point si la réponse est correcte
  } else {
      const userAnswersText = `Your answers: ${selectedActions.join(', ')}.<br>`;
      const correctAnswersText = `Correct answers: ${correctAnswer.join(', ')}.<br>`;
      const explanationText = `Explanation: Create a storage pool. (This combines the HDDs and SSDs into a single pool of storage.)<br>Create a virtual disk. (This is done within the storage pool and allows you to configure the type of resiliency, size, and tiering for performance.)<br>Create a simple volume. (This is done on the virtual disk you created and allows you to assign a drive letter and use the storage.)<br><br>Ref: <a href='https://redmondmag.com/articles/2018/07/31/storage-spaces-windows-server-2016-1.aspx' target='_blank'>Redmondmag</a>, <a href='https://redmondmag.com/articles/2018/08/02/storage-spaces-windows-server-2016-2.aspx' target='_blank'>Redmondmag</a>, <a href='https://docs.microsoft.com/en-us/learn/modules/implement-storage-spaces-storage-spaces-direct/4-implement-storage-spaces' target='_blank'>Microsoft Learn</a>`;
      solutionInfo.innerHTML = `${userAnswersText}<br>${correctAnswersText}<br>${explanationText}`;
      solutionInfo.classList.remove('highlight');
      solutionInfo.classList.add('incorrect');
  }

  solutionInfo.style.display = 'block';
  showFinalScore();
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.solutionButton').forEach(button => {
      attachSolutionButtonListeners_answer20(button);
  });

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
              dropzone.classList.remove('highlight');
          }
      });
  });
});

function showFinalScore() {
  const finalScoreElement = document.getElementById('finalScore');
  if (finalScoreElement) {
      const percentage = (score / totalQuestions) * 100;
      finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
  }
}
