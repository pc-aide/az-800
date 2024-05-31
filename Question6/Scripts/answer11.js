function attachSolutionButtonListeners_question11(button) {
    button.addEventListener('click', function() {
        // Réinitialiser les couleurs des réponses
        document.querySelectorAll('.question-row').forEach(row => {
            row.classList.remove('incorrect', 'highlight');
        });

        // Vérifier la réponse
        let allCorrect = true;
        const selectedAnswer = document.querySelector('input[name="question11"]:checked');
        const solutionInfoElement = document.getElementById('solutionInfo_question11');

        if (selectedAnswer && selectedAnswer.value === 'MAC address') {
            document.querySelector('input[name="question11"][value="MAC address"]').parentElement.classList.add('highlight');
            solutionInfoElement.classList.add('highlight');
            solutionInfoElement.classList.remove('incorrect');
            score++;
        } else {
            if (selectedAnswer) {
                selectedAnswer.parentElement.classList.add('incorrect');
            }
            solutionInfoElement.classList.add('incorrect');
            solutionInfoElement.classList.remove('highlight');
            allCorrect = false;
        }

        // Afficher l'explication
        if (solutionInfoElement) {
            solutionInfoElement.style.display = 'block';
        }

        showFinalScore();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.solutionButton').forEach(button => {
        attachSolutionButtonListeners_question11(button);
    });
});

function showFinalScore() {
    const finalScoreElement = document.getElementById('finalScore');
    if (finalScoreElement) {
        const percentage = (score / totalQuestions) * 100;
        finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
    }
}
