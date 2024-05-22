function attachSolutionButtonListeners_answer4(button) {
    button.addEventListener('click', function() {
        const solutionInfoId = this.dataset.solutionInfoId;
        const correctAnswer = this.dataset.correctAnswer;
        checkAnswer4(correctAnswer, solutionInfoId, this.dataset.solutionText);
    });
}

function checkAnswer4(correctAnswer, solutionInfoId, solutionText) {
    const selectedAnswer = document.querySelector('input[name="answer4"]:checked');
    
    if (!selectedAnswer) {
        console.error("No option selected");
        return;
    }

    const userAnswer = selectedAnswer.value;

    const isCorrect = userAnswer === correctAnswer;

    const solutionInfo = document.getElementById(solutionInfoId);
    if (isCorrect) {
        solutionInfo.innerHTML = solutionText;
        solutionInfo.classList.remove('incorrect');
        solutionInfo.classList.add('highlight');
        score += 1; // Ajouter un point si la réponse est correcte
    } else {
        const userAnswerText = `Your answer: ${userAnswer}.<br><br>Correct answer: ${correctAnswer}`;
        solutionInfo.innerHTML = `${userAnswerText}.<br><br>${solutionText}`;
        solutionInfo.classList.remove('highlight');
        solutionInfo.classList.add('incorrect');
    }

    solutionInfo.style.display = 'block';
    showFinalScore();
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.solutionButton').forEach(button => {
        attachSolutionButtonListeners_answer4(button);
    });
});

function showFinalScore() {
    const finalScoreElement = document.getElementById('finalScore');
    if (finalScoreElement) {
        const percentage = (score / totalQuestions) * 100;
        finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
    }
}
