function attachSolutionButtonListeners_question9(button) {
    button.addEventListener('click', function() {
        // Réinitialiser les couleurs des réponses
        document.querySelectorAll('.answer-area').forEach(row => {
            row.classList.remove('incorrect', 'highlight');
        });

        // Vérifier la réponse
        let allCorrect = true;
        const correctAnswers = ["B. On the router in each office, configure a DHCP relay.", "E. On each DHCP scope, configure DHCP failover."];

        document.querySelectorAll('input[type="checkbox"]:checked').forEach(selectedAnswer => {
            if (correctAnswers.includes(selectedAnswer.value)) {
                document.querySelector(`input[value="${selectedAnswer.value}"]`).parentElement.classList.add('highlight');
            } else {
                document.querySelector(`input[value="${selectedAnswer.value}"]`).parentElement.classList.add('incorrect');
                allCorrect = false;
            }
        });

        correctAnswers.forEach(correctAnswer => {
            if (!document.querySelector(`input[value="${correctAnswer}"]:checked`)) {
                document.querySelector(`input[value="${correctAnswer}"]`).parentElement.classList.add('incorrect');
                allCorrect = false;
            }
        });

        // Mise à jour du score
        if (allCorrect) {
            score++;
        }
        showFinalScore();

        // Afficher l'explication
        document.getElementById('solutionInfo_question9').style.display = 'block';
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.solutionButton').forEach(button => {
        attachSolutionButtonListeners_question9(button);
    });
});

function showFinalScore() {
    const finalScoreElement = document.getElementById('finalScore');
    if (finalScoreElement) {
        const percentage = (score / totalQuestions) * 100;
        finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
    }
}
