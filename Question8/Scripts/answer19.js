function attachSolutionButtonListeners_answer19(button) {
    button.addEventListener('click', function() {
        const solutionInfoId = this.dataset.solutionInfoId;
        const correctAnswer = this.dataset.correctAnswer.split(',');
        const userAnswerStorageAccounts = document.querySelector('select[name="storageAccounts"]').value;
        const userAnswerCloudEndpoints = document.querySelector('select[name="cloudEndpoints"]').value;
        const solutionText = this.dataset.solutionText;

        const userAnswers = [userAnswerStorageAccounts, userAnswerCloudEndpoints];
        const solutionInfo = document.getElementById(solutionInfoId);

        if (userAnswers.length > 0) {
            const isCorrect = userAnswers.every((answer, index) => answer === correctAnswer[index]);

            if (isCorrect) {
                solutionInfo.innerHTML = solutionText;
                solutionInfo.classList.remove('incorrect');
                solutionInfo.classList.add('highlight');
                score += 1; // Ajouter un point si la réponse est correcte
            } else {
                solutionInfo.innerHTML = `Your answers: ${userAnswers.join(', ')}.<br><br>${solutionText}`;
                solutionInfo.classList.remove('highlight');
                solutionInfo.classList.add('incorrect');
            }

            solutionInfo.style.display = 'block';
            showFinalScore();
        } else {
            solutionInfo.innerHTML = 'Your answers: indéfini.<br><br>Correct answers: ' + correctAnswer.join(', ') + '<br><br>' + solutionText;
            solutionInfo.classList.remove('highlight');
            solutionInfo.classList.add('incorrect');
            solutionInfo.style.display = 'block';
        }
    });
}

function showFinalScore() {
    const finalScore = document.getElementById('finalScore');
    finalScore.textContent = `Final Score: ${score}/20 (${((score / 20) * 100).toFixed(2)}%)`;
}

// Assuming this will be called after the page loads
document.addEventListener('DOMContentLoaded', function() {
    const solutionButton = document.querySelector('.solutionButton');
    if (solutionButton) {
        attachSolutionButtonListeners_answer19(solutionButton);
    }
});
