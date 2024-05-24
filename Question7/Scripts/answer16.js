function attachSolutionButtonListeners_answer16(button) {
    button.addEventListener('click', function() {
        const solutionInfoId = this.dataset.solutionInfoId;
        const correctAnswer = this.dataset.correctAnswer;
        checkAnswer16(correctAnswer, solutionInfoId, this.dataset.solutionText);
    });
}

function checkAnswer16(correctAnswer, solutionInfoId, solutionText) {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    const userAnswer = selectedAnswer ? selectedAnswer.value : null;

    const isCorrect = userAnswer === correctAnswer;

    const solutionInfo = document.getElementById(solutionInfoId);
    if (isCorrect) {
        solutionInfo.innerHTML = solutionText;
        solutionInfo.classList.remove('incorrect');
        solutionInfo.classList.add('highlight');
        score += 1; // Ajouter un point si la réponse est correcte
    } else {
        const userAnswerText = userAnswer ? `Your answer: ${userAnswer}.` : "No answer selected.";
        solutionInfo.innerHTML = `${userAnswerText}<br><br>Correct answer: ${correctAnswer}.<br><br>Explanation: File Server Resource Manager includes the following features: Quota management allows you to limit the space that is allowed for a volume or folder, and they can be automatically applied to new folders that are created on a volume. You can also define quota templates that can be applied to new volumes or folders.<br><br>Ref: <a href='https://docs.microsoft.com/en-us/windows-server/storage/fsrm/fsrm-overview' target='_blank'>FSRM Overview</a>`;
        solutionInfo.classList.remove('highlight');
        solutionInfo.classList.add('incorrect');
    }

    solutionInfo.style.display = 'block';
    showFinalScore();
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.solutionButton').forEach(button => {
        attachSolutionButtonListeners_answer16(button);
    });
});

function showFinalScore() {
    const finalScoreElement = document.getElementById('finalScore');
    if (finalScoreElement) {
        const percentage = (score / totalQuestions) * 100;
        finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
    }
}
