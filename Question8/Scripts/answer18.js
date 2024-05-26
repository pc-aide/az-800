function attachSolutionButtonListeners_answer18(button) {
    button.addEventListener('click', function() {
        const solutionInfoId = this.dataset.solutionInfoId;
        const correctAnswer = this.dataset.correctAnswer.split(',');
        const selectedOptions = document.querySelectorAll('input[name="answer"]:checked');
        const solutionText = this.dataset.solutionText;

        const userAnswers = Array.from(selectedOptions).map(option => option.value);
        const solutionInfo = document.getElementById(solutionInfoId);

        if (userAnswers.length > 0) {
            const isCorrect = userAnswers.length === correctAnswer.length && userAnswers.every(answer => correctAnswer.includes(answer));

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
        attachSolutionButtonListeners_answer18(solutionButton);
    }
});
