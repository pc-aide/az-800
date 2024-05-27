function attachSolutionButtonListeners_question12(button) {
    button.addEventListener('click', function() {
        // Réinitialiser les couleurs des réponses
        document.querySelectorAll('.question-row').forEach(row => {
            row.classList.remove('incorrect', 'highlight');
        });

        // Vérifier la réponse
        let allCorrect = true;
        const correctAnswers = {
            "question12-1": "No",
            "question12-2": "Yes",
            "question12-3": "No"
        };

        for (let key in correctAnswers) {
            const selectedAnswer = document.querySelector(`input[name="${key}"]:checked`);
            if (selectedAnswer && selectedAnswer.value === correctAnswers[key]) {
                document.querySelector(`input[name="${key}"][value="${correctAnswers[key]}"]`).parentElement.classList.add('highlight');
            } else {
                document.querySelector(`input[name="${key}"][value="${correctAnswers[key]}"]`).parentElement.classList.add('incorrect');
                allCorrect = false;
            }
        }

        // Mise à jour du score
        if (allCorrect) {
            score++;
        }
        showFinalScore();

        // Afficher l'explication
        document.getElementById('solutionInfo_question12').style.display = 'block';
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.solutionButton').forEach(button => {
        attachSolutionButtonListeners_question12(button);
    });
});

function showFinalScore() {
    const finalScoreElement = document.getElementById('finalScore');
    if (finalScoreElement) {
        const percentage = (score / totalQuestions) * 100;
        finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
    }
}
