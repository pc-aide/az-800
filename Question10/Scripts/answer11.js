function attachSolutionButtonListeners_question11(button) {
    button.addEventListener('click', function() {
        // Réinitialiser les couleurs des réponses
        document.querySelectorAll('.question-row').forEach(row => {
            row.classList.remove('incorrect', 'highlight');
        });

        // Vérifier la réponse
        let allCorrect = true;

        const selectedAnswer = document.querySelector('input[name="question11"]:checked');
        if (selectedAnswer && selectedAnswer.value === 'D and E only') {
            document.querySelector('input[name="question11"][value="D and E only"]').parentElement.classList.add('highlight');
        } else {
            document.querySelector('input[name="question11"][value="D and E only"]').parentElement.classList.add('incorrect');
            allCorrect = false;
        }

        // Mise à jour du score
        if (allCorrect) {
            score++;
        }
        showFinalScore();

        // Afficher l'explication
        document.getElementById('solutionInfo_question11').style.display = 'block';
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
