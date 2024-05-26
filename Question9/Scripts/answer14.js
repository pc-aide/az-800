function attachSolutionButtonListeners_question14(button) {
    button.addEventListener('click', function() {
        // Réinitialiser les couleurs des réponses
        document.querySelectorAll('.question-row').forEach(row => {
            row.classList.remove('incorrect', 'highlight');
        });

        // Vérifier la réponse
        let allCorrect = true;

        const selectedAnswer = document.querySelector('input[name="dc-deployment"]:checked');
        if (selectedAnswer && selectedAnswer.value === 'B') {
            document.querySelector('input[name="dc-deployment"][value="B"]').parentElement.classList.add('highlight');
        } else {
            document.querySelector('input[name="dc-deployment"][value="B"]').parentElement.classList.add('incorrect');
            allCorrect = false;
        }

        // Mise à jour du score
        if (allCorrect) {
            score++;
        }
        showFinalScore();

        // Afficher l'explication
        document.getElementById('solutionInfo_question14').style.display = 'block';
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.solutionButton').forEach(button => {
        attachSolutionButtonListeners_question14(button);
    });
});
