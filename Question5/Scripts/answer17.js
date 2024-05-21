function attachSolutionButtonListeners_answer17(button) {
  button.addEventListener('click', function() {
      const solutionInfoId = this.dataset.solutionInfoId;
      const correctAnswer = this.dataset.correctAnswer.split(',');
      console.log("Button clicked"); // Debugging message
      checkAnswer17(correctAnswer, solutionInfoId, this.dataset.solutionText);
  });
}

function checkAnswer17(correctAnswer, solutionInfoId, solutionText) {
  const selectCommand = document.querySelector('#listDeroulante17_0');
  const selectOption = document.querySelector('#listDeroulante17_1');

  if (!selectCommand) {
      console.error("Dropdown #listDeroulante17_0 not found");
  } else {
      console.log("Dropdown #listDeroulante17_0 found");
  }

  if (!selectOption) {
      console.error("Dropdown #listDeroulante17_1 not found");
  } else {
      console.log("Dropdown #listDeroulante17_1 found");
  }

  if (!selectCommand || !selectOption) {
      console.error("One or both of the dropdowns are not found");
      return;
  }

  const userAnswer = [selectCommand.value, selectOption.value];
  console.log("User Answer: ", userAnswer); // Debugging message

  const isCorrect = (userAnswer[0] === correctAnswer[0] && userAnswer[1] === correctAnswer[1]);

  const solutionInfo = document.getElementById(solutionInfoId);
  if (isCorrect) {
      solutionInfo.innerHTML = solutionText;
      solutionInfo.classList.remove('incorrect');
      solutionInfo.classList.add('highlight');
      score += 1; // Ajouter un point si la réponse est correcte
  } else {
      const userAnswerText = `Your answer: Command: ${getDisplayText(selectCommand.value)}, Option: ${getDisplayText(selectOption.value)}.<br><br>Correct answer: Command: ${getDisplayText(correctAnswer[0])}, Option: ${getDisplayText(correctAnswer[1])}`;
      solutionInfo.innerHTML = `${userAnswerText}.<br><br>${solutionText}`;
      solutionInfo.classList.remove('highlight');
      solutionInfo.classList.add('incorrect');
  }

  solutionInfo.style.display = 'block';
  showFinalScore();
}

function getDisplayText(value) {
  const options = {
      "item17.1": "Set-VM VM1",
      "item17.2": "Set-VMFirmware VM1",
      "item17.3": "Set-VMHost Server1",
      "item17.4": "Set-VMProcessor VM1",
      "item17.5": "Set-VMSecurity VM1",
      "item17.6": "-EnableEnhancedSessionMode",
      "item17.7": "-EnableHostResourceProtection",
      "item17.8": "-ExposeVirtualizationExtensions",
      "item17.9": "-compatibilityForOlderOperatingSystemEnabled"
  };
  return options[value] || value;
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.solutionButton').forEach(button => {
      attachSolutionButtonListeners_answer17(button);
  });
});

function showFinalScore() {
  const finalScoreElement = document.getElementById('finalScore');
  if (finalScoreElement) {
      const percentage = (score / totalQuestions) * 100;
      finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
  }
}
