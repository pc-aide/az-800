function attachSolutionButtonListeners_question7(button) {
    button.addEventListener('click', function() {
        // Réinitialiser les couleurs des réponses
        document.querySelectorAll('.question-row').forEach(row => {
            row.classList.remove('incorrect', 'highlight');
        });

        // Vérifier la réponse
        let allCorrect = true;
        const correctAnswers = ['A. a forwarder', 'B. a conditional forwarder'];

        document.querySelectorAll('input[name="question7"]:checked').forEach(selectedAnswer => {
            if (correctAnswers.includes(selectedAnswer.value)) {
                selectedAnswer.parentElement.classList.add('highlight');
            } else {
                selectedAnswer.parentElement.classList.add('incorrect');
                allCorrect = false;
            }
        });

        correctAnswers.forEach(answer => {
            if (!document.querySelector(`input[name="question7"][value="${answer}"]:checked`)) {
                document.querySelector(`input[name="question7"][value="${answer}"]`).parentElement.classList.add('incorrect');
                allCorrect = false;
            }
        });

        // Afficher l'explication
        const solutionInfoElement = document.getElementById('solutionInfo_question7');
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
        attachSolutionButtonListeners_question7(button);
    });
});

function showFinalScore() {
    const finalScoreElement = document.getElementById('finalScore');
    if (finalScoreElement) {
        const percentage = (score / totalQuestions) * 100;
        finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
    }
}
