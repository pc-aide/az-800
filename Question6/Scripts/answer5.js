function attachSolutionButtonListeners_question5(button) {
    button.addEventListener('click', function() {
        // Réinitialiser les couleurs des réponses
        document.querySelectorAll('.question-row').forEach(row => {
            row.classList.remove('incorrect', 'highlight');
        });
  
        // Vérifier la réponse
        let allCorrect = true;
  
        const selectedAnswer = document.querySelector('input[name="question5"]:checked');
        if (selectedAnswer && selectedAnswer.value === 'Azure Extended Network') {
            document.querySelector('input[name="question5"][value="Azure Extended Network"]').parentElement.classList.add('highlight');
        } else {
            if (selectedAnswer) {
                document.querySelector('input[name="question5"][value="' + selectedAnswer.value + '"]').parentElement.classList.add('incorrect');
            }
            allCorrect = false;
        }
  
        // Afficher l'explication
        const solutionInfoElement = document.getElementById('solutionInfo_question5');
        if (solutionInfoElement) {
            if (allCorrect) {
                solutionInfoElement.classList.add('highlight');
                solutionInfoElement.classList.remove('incorrect');
                score++;
            } else {
                solutionInfoElement.classList.add('incorrect');
                solutionInfoElement.classList.remove('highlight');
            }
            solutionInfoElement.style.display = 'block';
        }
  
        showFinalScore();
    });
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.solutionButton').forEach(button => {
        attachSolutionButtonListeners_question5(button);
    });
  });
  
  function showFinalScore() {
    const finalScoreElement = document.getElementById('finalScore');
    if (finalScoreElement) {
        const percentage = (score / totalQuestions) * 100;
        finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
    }
  }
  