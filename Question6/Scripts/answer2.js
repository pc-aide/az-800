function attachSolutionButtonListeners_question2(button) {
    button.addEventListener('click', function() {
        // Réinitialiser les couleurs des réponses
        document.querySelectorAll('.answer-area').forEach(row => {
            row.classList.remove('incorrect', 'highlight');
        });
  
        // Vérifier la réponse
        let allCorrect = true;
        const correctAnswers = {
            "dhcp-scopes": "2",
            "dhcp-relays": "2"
        };
  
        for (let key in correctAnswers) {
            const selectedAnswer = document.getElementById(key).value;
            if (selectedAnswer === correctAnswers[key]) {
                document.getElementById(key).parentElement.classList.add('highlight');
            } else {
                document.getElementById(key).parentElement.classList.add('incorrect');
                allCorrect = false;
            }
        }
  
        // Afficher l'explication
        const solutionInfo = document.getElementById('solutionInfo_question2');
        if (solutionInfo) {
            if (allCorrect) {
                solutionInfo.classList.add('highlight');
                solutionInfo.classList.remove('incorrect');
                score++;
            } else {
                solutionInfo.classList.add('incorrect');
                solutionInfo.classList.remove('highlight');
            }
            solutionInfo.style.display = 'block';
        }
  
        showFinalScore();
    });
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.solutionButton').forEach(button => {
        attachSolutionButtonListeners_question2(button);
    });
  });
  
  function showFinalScore() {
    const finalScoreElement = document.getElementById('finalScore');
    if (finalScoreElement) {
        const percentage = (score / totalQuestions) * 100;
        finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
    }
  }
  