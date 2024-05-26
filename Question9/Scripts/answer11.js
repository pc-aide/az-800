function attachSolutionButtonListeners_question11(button) {
    button.addEventListener('click', function() {
        // Réinitialiser les couleurs des réponses
        document.querySelectorAll('.question-row').forEach(row => {
            row.classList.remove('incorrect', 'highlight');
        });

        // Vérifier la réponse
        let allCorrect = true;

        const selectedAnswer = document.querySelector('input[name="file-screening"]:checked');
        if (selectedAnswer && selectedAnswer.value === 'D') {
            document.querySelector('input[name="file-screening"][value="D"]').parentElement.classList.add('highlight');
        } else {
            document.querySelector('input[name="file-screening"][value="D"]').parentElement.classList.add('incorrect');
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
