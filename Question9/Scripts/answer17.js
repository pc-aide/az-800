document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.solutionButton').forEach(button => {
        button.addEventListener('click', function() {
            const solutionInfoId = this.dataset.solutionInfoId;
            const correctAnswer = this.dataset.correctAnswer;
            checkAnswer17(correctAnswer, solutionInfoId, this.dataset.solutionText);
        });
    });
});

function checkAnswer17(correctAnswer, solutionInfoId, solutionText) {
    const selectedOption = document.querySelector('input[name="question17"]:checked');
    const solutionInfo = document.getElementById(solutionInfoId);

    if (selectedOption) {
        const userAnswer = selectedOption.value;
        if (userAnswer === correctAnswer) {
            solutionInfo.innerHTML = solutionText;
            solutionInfo.classList.remove('incorrect');
            solutionInfo.classList.add('highlight');
            score += 1; // Ajouter un point si la réponse est correcte
        } else {
            solutionInfo.innerHTML = `Your answer: ${userAnswer}.<br><br>${solutionText}`;
            solutionInfo.classList.remove('highlight');
            solutionInfo.classList.add('incorrect');
        }
    } else {
        solutionInfo.innerHTML = 'No answer selected.<br><br>' + solutionText;
        solutionInfo.classList.remove('highlight');
        solutionInfo.classList.add('incorrect');
    }

    solutionInfo.style.display = 'block';
    showFinalScore();
}

function showFinalScore() {
    const finalScoreElement = document.getElementById('finalScore');
    if (finalScoreElement) {
        const percentage = (score / totalQuestions) * 100;
        finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
    }
}
