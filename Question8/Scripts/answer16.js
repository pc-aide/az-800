function attachSolutionButtonListeners_answer16(button) {
    button.addEventListener('click', function() {
        const solutionInfoId = this.dataset.solutionInfoId;
        const correctAnswer = this.dataset.correctAnswer;
        const selectedOption = document.querySelector('input[name="answer"]:checked');
        const solutionText = this.dataset.solutionText;

        const solutionInfo = document.getElementById(solutionInfoId);

        if (selectedOption) {
            const userAnswer = selectedOption.value;
            const isCorrect = userAnswer === correctAnswer;

            if (isCorrect) {
                solutionInfo.innerHTML = solutionText;
                solutionInfo.classList.remove('incorrect');
                solutionInfo.classList.add('highlight');
                score += 1; // Ajouter un point si la réponse est correcte
            } else {
                solutionInfo.innerHTML = `Your answer: ${userAnswer}.<br><br>${solutionText}`;
                solutionInfo.classList.remove('highlight');
                solutionInfo.classList.add('incorrect');
            }

            solutionInfo.style.display = 'block';
            showFinalScore();
        } else {
            solutionInfo.innerHTML = 'Your answer: indéfini.<br><br>Correct answer: ' + correctAnswer + '<br><br>' + solutionText;
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
        attachSolutionButtonListeners_answer16(solutionButton);
    }
});
