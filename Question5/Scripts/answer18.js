function attachSolutionButtonListeners_question18(button) {
  button.addEventListener('click', function() {
      // Réinitialiser les couleurs des réponses
      document.querySelectorAll('.answer-area').forEach(row => {
          row.classList.remove('incorrect', 'highlight');
      });

      // Vérifier la réponse
      let allCorrect = true;
      const correctAnswers = {
          "isolation18.1": "Hyper-V isolation or process isolation",
          "isolation18.2": "Hyper-V isolation only"
      };

      const userAnswers = {};

      for (let key in correctAnswers) {
          const selectedAnswer = document.getElementById(key).value;
          userAnswers[key] = selectedAnswer;
          if (selectedAnswer === correctAnswers[key]) {
              document.getElementById(key).parentElement.classList.add('highlight');
          } else {
              document.getElementById(key).parentElement.classList.add('incorrect');
              allCorrect = false;
          }
      }

      // Afficher l'explication
      const solutionInfo = document.getElementById('solutionInfo_question18');
      if (solutionInfo) {
          if (allCorrect) {
              solutionInfo.classList.add('highlight');
              solutionInfo.classList.remove('incorrect');
              score++;
          } else {
              solutionInfo.classList.add('incorrect');
              solutionInfo.classList.remove('highlight');
              solutionInfo.innerHTML = `<p><strong>Explanation:</strong></p>
              <p>Process isolation can run only on the same version of Windows.<br>
              Hyper-V isolation can run the same version or older.</p>
              <p>Your answers:</p>
              <p>Image1: ${userAnswers["isolation18.1"]}</p>
              <p>Image2: ${userAnswers["isolation18.2"]}</p>
              <p><strong>Reference:</strong></p>
              <ul>
                  <li><a href="https://learn.microsoft.com/en-us/virtualization/windowscontainers/deploy-containers/version-compatibility?tabs=windows-server-2022%2Cwindows-11#windows-server-host-os-compatibility" target="_blank">Windows Server Host OS Compatibility</a></li>
              </ul>`;
          }
          solutionInfo.style.display = 'block';
      }

      showFinalScore();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.solutionButton').forEach(button => {
      attachSolutionButtonListeners_question18(button);
  });
});

function showFinalScore() {
  const finalScoreElement = document.getElementById('finalScore');
  if (finalScoreElement) {
      const percentage = (score / totalQuestions) * 100;
      finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
  }
}
