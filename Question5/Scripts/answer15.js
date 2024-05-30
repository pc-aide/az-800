function attachSolutionButtonListeners_question15(button) {
  button.addEventListener('click', function() {
      // Réinitialiser les couleurs des réponses
      document.querySelectorAll('.answer-area').forEach(row => {
          row.classList.remove('incorrect', 'highlight');
      });

      // Vérifier la réponse
      let allCorrect = true;
      const correctAnswers = {
          "command15.1": "hvc.exe",
          "ssh15.2": "User2@VM2"
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
      const solutionInfo = document.getElementById('solutionInfo_question15');
      if (solutionInfo) {
          if (allCorrect) {
              solutionInfo.classList.add('highlight');
              solutionInfo.classList.remove('incorrect');
              score++;
          } else {
              solutionInfo.classList.add('incorrect');
              solutionInfo.classList.remove('highlight');
              solutionInfo.innerHTML = `<p><strong>Explanation:</strong></p>
              <p>By default, only Linux has SSH enabled. VM - OS: RHEL & contains a local user named user2.</p>
              <p>Your answers:</p>
              <p>Command: ${userAnswers["command15.1"]}</p>
              <p>SSH: ${userAnswers["ssh15.2"]}</p>
              <p><strong>Reference:</strong></p>
              <ul>
                  <li><a href="https://www.thomasmaurer.ch/2018/04/hvc-ssh-direct-for-linux-vms-on-hyper-v/" target="_blank">HVC SSH Direct for Linux VMs on Hyper-V</a></li>
              </ul>`;
          }
          solutionInfo.style.display = 'block';
      }

      showFinalScore();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.solutionButton').forEach(button => {
      attachSolutionButtonListeners_question15(button);
  });
});

function showFinalScore() {
  const finalScoreElement = document.getElementById('finalScore');
  if (finalScoreElement) {
      const percentage = (score / totalQuestions) * 100;
      finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
  }
}
