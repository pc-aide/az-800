function attachSolutionButtonListeners_question3(button) {
    button.addEventListener('click', function() {
        // Réinitialiser les couleurs des réponses
        document.querySelectorAll('.question-row').forEach(row => {
            row.classList.remove('incorrect', 'highlight');
        });

        // Vérifier la réponse
        let allCorrect = true;

        const server1Answer = document.getElementById('server1Answer').value;
        const server4Answer = document.getElementById('server4Answer').value;

        if (server1Answer === 'Set-Item') {
            document.querySelector('select#server1Answer').classList.add('highlight');
        } else {
            document.querySelector('select#server1Answer').classList.add('incorrect');
            allCorrect = false;
        }

        if (server4Answer === 'Enable-PSRemoting') {
            document.querySelector('select#server4Answer').classList.add('highlight');
        } else {
            document.querySelector('select#server4Answer').classList.add('incorrect');
            allCorrect = false;
        }

        // Mise à jour du score
        if (allCorrect) {
            score++;
        }
        showFinalScore();

        // Afficher l'explication
        document.getElementById('solutionInfo_question3').style.display = 'block';
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.solutionButton').forEach(button => {
        attachSolutionButtonListeners_question3(button);
    });
});

function showFinalScore() {
    const finalScoreElement = document.getElementById('finalScore');
    if (finalScoreElement) {
        const percentage = (score / totalQuestions) * 100;
        finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
    }
}
