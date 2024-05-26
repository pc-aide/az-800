function attachSolutionButtonListeners_question20(button) {
    button.addEventListener('click', function() {
        // Réinitialiser les couleurs des réponses
        document.querySelectorAll('.question-row').forEach(row => {
            row.classList.remove('incorrect', 'highlight');
        });

        // Vérifier la réponse
        let allCorrect = true;

        const selectedGroup3Answer = document.querySelector('select[name="group3"]');
        const selectedGroup5Answer = document.querySelector('select[name="group5"]');

        if (selectedGroup3Answer && selectedGroup3Answer.value === 'Group1, Group2, Group4, & Group5 only') {
            selectedGroup3Answer.classList.add('highlight');
        } else {
            selectedGroup3Answer.classList.add('incorrect');
            allCorrect = false;
        }

        if (selectedGroup5Answer && selectedGroup5Answer.value === 'Group4 only') {
            selectedGroup5Answer.classList.add('highlight');
        } else {
            selectedGroup5Answer.classList.add('incorrect');
            allCorrect = false;
        }

        // Mise à jour du score
        if (allCorrect) {
            score++;
        }
        showFinalScore();

        // Afficher l'explication
        document.getElementById('solutionInfo_question20').style.display = 'block';
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.solutionButton').forEach(button => {
        attachSolutionButtonListeners_question20(button);
    });
});

function showFinalScore() {
    const finalScoreElement = document.getElementById('finalScore');
    if (finalScoreElement) {
        const percentage = (score / totalQuestions) * 100;
        finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
    }
}
