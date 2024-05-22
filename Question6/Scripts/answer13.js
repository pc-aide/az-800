function attachSolutionButtonListeners_answer13(button) {
    button.addEventListener('click', function() {
        const solutionInfoId = this.dataset.solutionInfoId;
        const correctAnswers = this.dataset.correctAnswer.split(',');
        checkAnswer13(correctAnswers, solutionInfoId, this.dataset.solutionText);
    });
}

function checkAnswer13(correctAnswers, solutionInfoId, solutionText) {
    const userAnswers = [
        document.querySelector('input[name="answer"]:checked') ? document.querySelector('input[name="answer"]:checked').value : null
    ];

    const solutionInfo = document.getElementById(solutionInfoId);
    let isCorrect = true;

    correctAnswers.forEach((answer, index) => {
        if (!userAnswers.includes(answer)) {
            isCorrect = false;
        }
    });

    if (isCorrect) {
        solutionInfo.innerHTML = solutionText;
        solutionInfo.classList.remove('incorrect');
        solutionInfo.classList.add('highlight');
        score += 1; // Ajouter un point si la réponse est correcte
    } else {
        const userAnswerText = `Your answers: ${userAnswers.join(', ')}`;
        solutionInfo.innerHTML = `${userAnswerText}.<br><br>${solutionText}`;
        solutionInfo.classList.remove('highlight');
        solutionInfo.classList.add('incorrect');
    }

    solutionInfo.style.display = 'block';
    showFinalScore();
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.solutionButton').forEach(button => {
        attachSolutionButtonListeners_answer13(button);
    });
});

function showFinalScore() {
    const finalScoreElement = document.getElementById('finalScore');
    if (finalScoreElement) {
        const percentage = (score / totalQuestions) * 100;
        finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
    }
}
