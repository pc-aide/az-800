function attachSolutionButtonListeners_question14(button) {
    button.addEventListener('click', function() {
        // Réinitialiser les couleurs des réponses
        document.querySelectorAll('.question-row').forEach(row => {
            row.classList.remove('incorrect', 'highlight');
        });

        // Vérifier la réponse
        let allCorrect = true;
        const selectedAnswer = document.querySelector('input[name="question14"]:checked');
        if (selectedAnswer && selectedAnswer.value === 'B. Azure Network Adapter') {
            document.querySelector('input[name="question14"][value="B. Azure Network Adapter"]').parentElement.classList.add('highlight');
        } else {
            document.querySelector('input[name="question14"][value="B. Azure Network Adapter"]').parentElement.classList.add('incorrect');
            allCorrect = false;
        }

        const solutionInfoElement = document.getElementById('solutionInfo_question14');
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
        attachSolutionButtonListeners_question14(button);
    });
});

function showFinalScore() {
    const finalScoreElement = document.getElementById('finalScore');
    if (finalScoreElement) {
        const percentage = (score / totalQuestions) * 100;
        finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
    }
}
