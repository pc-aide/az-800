function attachSolutionButtonListeners_question16(button) {
  button.addEventListener('click', function() {
      // Réinitialiser les couleurs des réponses
      document.querySelectorAll('.answer-area').forEach(row => {
          row.classList.remove('incorrect', 'highlight');
      });

      // Vérifier la réponse
      let allCorrect = true;
      const correctAnswers = {
          "runFrom16.1": "Azure Cloud Shell",
          "cmdlet16.2": "Enable-AzVMPSRemoting"
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
      const solutionInfo = document.getElementById('solutionInfo_question16');
      if (solutionInfo) {
          if (allCorrect) {
              solutionInfo.classList.add('highlight');
              solutionInfo.classList.remove('incorrect');
              score++;
          } else {
              solutionInfo.classList.add('incorrect');
              solutionInfo.classList.remove('highlight');
              solutionInfo.innerHTML = `<p><strong>Explanation:</strong></p>
              <p>There is no command Enable-PSRemoting in Cloud Shell. This command is local to Windows and is needed only on non server Windows. Enable-AzVMPSRemoting is a part of PSCloudShellUtility module. Description says: "Enable all aspects of PowerShell remoting on the given target (NSG Rules, Target WinRM/SSH configs).</p>
              <p>Your answers:</p>
              <p>Run from: ${userAnswers["runFrom16.1"]}</p>
              <p>Cmdlet: ${userAnswers["cmdlet16.2"]}</p>
              <p><strong>Reference:</strong></p>
              <ul>
                  <li><a href="https://techcommunity.microsoft.com/t5/itops-talk-blog/powershell-basics-connecting-to-vms-with-azure-psremoting/ba-p/428403" target="_blank">PowerShell Basics: Connecting to VMs with Azure PSRemoting</a></li>
                  <li><a href="https://learn.microsoft.com/en-us/azure/cloud-shell/overview" target="_blank">Azure Cloud Shell Overview</a></li>
              </ul>`;
          }
          solutionInfo.style.display = 'block';
      }

      showFinalScore();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.solutionButton').forEach(button => {
      attachSolutionButtonListeners_question16(button);
  });
});

function showFinalScore() {
  const finalScoreElement = document.getElementById('finalScore');
  if (finalScoreElement) {
      const percentage = (score / totalQuestions) * 100;
      finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
  }
}
