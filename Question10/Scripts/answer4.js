function attachSolutionButtonListeners_question4(button) {
    button.addEventListener('click', function() {
        // Réinitialiser les couleurs des réponses
        document.querySelectorAll('.question-row').forEach(row => {
            row.classList.remove('incorrect', 'highlight');
        });

        // Vérifier la réponse
        let allCorrect = true;

        const cmdletAnswer = document.getElementById('cmdletAnswer').value;
        const vm1Answer = document.getElementById('vm1Answer').value;

        if (cmdletAnswer === 'Set-VMProcessor') {
            document.querySelector('select#cmdletAnswer').classList.add('highlight');
        } else {
            document.querySelector('select#cmdletAnswer').classList.add('incorrect');
            allCorrect = false;
        }

        if (vm1Answer === '-ExposeVirtualizationExtension') {
            document.querySelector('select#vm1Answer').classList.add('highlight');
        } else {
            document.querySelector('select#vm1Answer').classList.add('incorrect');
            allCorrect = false;
        }

        // Mise à jour du score
        if (allCorrect) {
            score++;
        }
        showFinalScore();

        // Afficher l'explication
        document.getElementById('solutionInfo_question4').style.display = 'block';
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.solutionButton').forEach(button => {
        attachSolutionButtonListeners_question4(button);
    });
});

function showFinalScore() {
    const finalScoreElement = document.getElementById('finalScore');
    if (finalScoreElement) {
        const percentage = (score / totalQuestions) * 100;
        finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
    }
}
