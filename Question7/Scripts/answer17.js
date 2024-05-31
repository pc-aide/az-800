function attachSolutionButtonListeners_question17(button) {
    button.addEventListener('click', function() {
        // Réinitialiser les couleurs des réponses
        document.querySelectorAll('.question-row').forEach(row => {
            row.classList.remove('incorrect', 'highlight');
        });

        // Vérifier la réponse
        let allCorrect = true;
        const selectedAnswer = document.querySelector('input[name="question17"]:checked');
        if (selectedAnswer) {
            if (selectedAnswer.value === 'Install the Data Deduplication server role') {
                selectedAnswer.parentElement.classList.add('highlight');
            } else {
                selectedAnswer.parentElement.classList.add('incorrect');
                allCorrect = false;
            }
        } else {
            allCorrect = false;
        }

        // Si la réponse est correcte, mettre le texte en jaune et ajouter un point au score
        const solutionInfoElement = document.getElementById('solutionInfo_question17');
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