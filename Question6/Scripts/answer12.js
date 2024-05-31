function attachSolutionButtonListeners_question12(button) {
    button.addEventListener('click', function() {
        // Réinitialiser les couleurs des réponses
        document.querySelectorAll('.question-row').forEach(row => {
            row.classList.remove('incorrect', 'highlight');
        });

        // Vérifier la réponse
        let allCorrect = true;
        const correctAnswers = {
            vpn1: 'No',
            vpn2: 'Yes',
            vpn3: 'No'
        };

        for (let key in correctAnswers) {
            const selectedAnswer = document.querySelector(`input[name="${key}"]:checked`);
            const solutionInfoElement = document.getElementById('solutionInfo_question12');
            if (selectedAnswer) {
                if (selectedAnswer.value === correctAnswers[key]) {
                    selectedAnswer.parentElement.classList.add('highlight');
                } else {
                    selectedAnswer.parentElement.classList.add('incorrect');
                    allCorrect = false;
                }
            } else {
                allCorrect = false;
            }
        }

        const solutionInfoElement = document.getElementById('solutionInfo_question12');
        if (allCorrect) {
            solutionInfoElement.classList.add('highlight');
            solutionInfoElement.classList.remove('incorrect');
            score++;
        } else {
            solutionInfoElement.classList.add('incorrect');
            solutionInfoElement.classList.remove('highlight');
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
