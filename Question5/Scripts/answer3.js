function attachSolutionButtonListeners_answer3(button) {
  button.addEventListener('click', function() {
      const solutionInfoId = this.dataset.solutionInfoId;
      const correctAnswer = this.dataset.correctAnswer.split(',');
      checkAnswer3(correctAnswer, solutionInfoId, this.dataset.solutionText);
  });
}

function checkAnswer3(correctAnswer, solutionInfoId, solutionText) {
  let isCorrect = true;
  const select1 = document.querySelector('#select3Option1').value;
  const select2 = document.querySelector('#select3Option2').value;
  const userAnswer = [select1, select2];

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
      solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br><br>Explanation: Create a separate virtual data disk for storing the database, logs, and sysvol folder for Active Directory. Do not store these items on the same disk as the operating system.<br><br>By default, data disks that are attached to a VM use write-through caching. However, this form of caching can conflict with the requirements of AD DS. For this reason, set the Host Cache Preference setting on the data disk to None.<br><br>For reference: <a href='https://docs.microsoft.com/en-us/azure/architecture/reference-architectures/identity/adds-extend-domain' target='_blank'>AD DS on Azure</a>, <a href='https://learn.microsoft.com/en-us/windows-server/administration/performance-tuning/role/active-directory-server/hardware-considerations' target='_blank'>Performance Tuning for Active Directory Servers</a>.`;
      solutionInfo.classList.remove('highlight');
      solutionInfo.classList.add('incorrect');
  }

  solutionInfo.style.display = 'block';
  showFinalScore();
}
