function attachSolutionButtonListeners_answer1(button) {
  button.addEventListener('click', function() {
      const solutionInfoId = this.dataset.solutionInfoId;
      const correctAnswer = this.dataset.correctAnswer.split(',');
      checkAnswer1(correctAnswer, solutionInfoId, this.dataset.solutionText);
  });
}

function checkAnswer1(correctAnswer, solutionInfoId, solutionText) {
  const userAnswers = [
      document.querySelector('input[name="user1Read"]:checked') ? document.querySelector('input[name="user1Read"]:checked').value : '',
      document.querySelector('input[name="user3Delete"]:checked') ? document.querySelector('input[name="user3Delete"]:checked').value : '',
      document.querySelector('input[name="user2List"]:checked') ? document.querySelector('input[name="user2List"]:checked').value : ''
  ];

  const isCorrect = userAnswers.length === correctAnswer.length && userAnswers.every((val, index) => val === correctAnswer[index]);

  const solutionInfo = document.getElementById(solutionInfoId);
  if (isCorrect) {
      solutionInfo.innerHTML = solutionText;
      solutionInfo.classList.remove('incorrect');
      solutionInfo.classList.add('highlight');
      score += 1; // Ajouter un point si la réponse est correcte
  } else {
      const userAnswersText = `Your answers: User1 can read the files in share1: ${userAnswers[0]}, User3 can delete files in Share1: ${userAnswers[1]}, If User2 connects to \\\\Server1.adatum.com from File Explorer, Share1 will be listed: ${userAnswers[2]}.<br>`;
      const correctAnswersText = `Correct answers: User1 can read the files in share1: ${correctAnswer[0]}, User3 can delete files in Share1: ${correctAnswer[1]}, If User2 connects to \\\\Server1.adatum.com from File Explorer, Share1 will be listed: ${correctAnswer[2]}.<br>`;
      const explanationText = `Explanation: Box 1: Yes - Group1 has Read access to Folder1 and Change access to Share1. Therefore, User1 can read the files in Share1. Box 2: No - Group3 has Full Control access to Share1. However, Group3 has no permissions configured Folder1. Therefore, User3 cannot access the files in Share1. Group2 has write permission to Folder1. However, Group2 has no permission on Share1. Therefore, users in Group2 cannot access files in the shared folder. Access Based Enumeration when enabled hides files and folders that users do not have permission to access. However, Access Based Enumeration is not enabled on Share1. This is indicated by the FolderEnumerationMode ג€&quot; Unrestricted setting. Therefore, the share will be visible to User2 even though User2 cannot access the shared folder.<br><br>Ref: <a href='https://learn.microsoft.com/en-us/azure/storage/files/storage-files-identity-ad-ds-configure-permissions' target='_blank'>Microsoft Documentation</a>.`;
      solutionInfo.innerHTML = `${userAnswersText}<br>${correctAnswersText}<br>${explanationText}`;
      solutionInfo.classList.remove('highlight');
      solutionInfo.classList.add('incorrect');
  }

  solutionInfo.style.display = 'block';
  showFinalScore();
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.solutionButton').forEach(button => {
      attachSolutionButtonListeners_answer1(button);
  });
});

function showFinalScore() {
  const finalScoreElement = document.getElementById('finalScore');
  if (finalScoreElement) {
      const percentage = (score / totalQuestions) * 100;
      finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
  }
}
