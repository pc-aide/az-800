function attachSolutionButtonListeners_question17(button) {
  button.addEventListener('click', function() {
      // Réinitialiser les couleurs des réponses
      document.querySelectorAll('.answer-area').forEach(row => {
          row.classList.remove('incorrect', 'highlight');
      });

      // Vérifier la réponse
      let allCorrect = true;
      const correctAnswers = {
          "command17.1": "Set-VMProcessor VM1",
          "option17.2": "-ExposeVirtualizationExtensions"
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
      const solutionInfo = document.getElementById('solutionInfo_question17');
      if (solutionInfo) {
          if (allCorrect) {
              solutionInfo.classList.add('highlight');
              solutionInfo.classList.remove('incorrect');
              score++;
          } else {
              solutionInfo.classList.add('incorrect');
              solutionInfo.classList.remove('highlight');
              solutionInfo.innerHTML = `<p><strong>Explanation:</strong></p>
              <p>Set-VMProcessor -VMName &lt;VMName&gt; -ExposeVirtualizationExtensions $true</p>
              <p>Your answers:</p>
              <p>Command: ${userAnswers["command17.1"]}</p>
              <p>Option: ${userAnswers["option17.2"]} $true</p>
              <p><strong>Reference:</strong></p>
              <ul>
                  <li><a href="https://learn.microsoft.com/en-us/virtualization/hyper-v-on-windows/user-guide/enable-nested-virtualization" target="_blank">Enable Nested Virtualization</a></li>
              </ul>`;
          }
          solutionInfo.style.display = 'block';
      }

      showFinalScore();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.solutionButton').forEach(button => {
      attachSolutionButtonListeners_question17(button);
  });
});

function showFinalScore() {
  const finalScoreElement = document.getElementById('finalScore');
  if (finalScoreElement) {
      const percentage = (score / totalQuestions) * 100;
      finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
  }
}
