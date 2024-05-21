function attachSolutionButtonListeners_answer14(button) {
    button.addEventListener('click', function() {
        const solutionInfoId = this.dataset.solutionInfoId;
        const correctAnswer = this.dataset.correctAnswer.split(',');
        checkAnswer14(correctAnswer, solutionInfoId, this.dataset.solutionText);
    });
}

function checkAnswer14(correctAnswer, solutionInfoId, solutionText) {
    const selectAzurePortal = document.querySelector('#selectAzurePortal').value;
    const selectOnVM1 = document.querySelector('#selectOnVM1').value;
    const userAnswer = [selectAzurePortal, selectOnVM1];

    const isCorrect = (userAnswer[0] === correctAnswer[0] && userAnswer[1] === correctAnswer[1]);

    const solutionInfo = document.getElementById(solutionInfoId);
    if (isCorrect) {
        solutionInfo.innerHTML = solutionText;
        solutionInfo.classList.remove('incorrect');
        solutionInfo.classList.add('highlight');
        score += 1; // Ajouter un point si la réponse est correcte
    } else {
        const userAnswerText = `Your answer: From the Azure portal: ${selectAzurePortal}, On VM1: ${selectOnVM1}.<br><br>Correct answer: From the Azure portal: ${correctAnswer[0]}, On VM1: ${correctAnswer[1]}`;
        solutionInfo.innerHTML = `${userAnswerText}.<br><br>${solutionText}`;
        solutionInfo.classList.remove('highlight');
        solutionInfo.classList.add('incorrect');
    }

    solutionInfo.style.display = 'block';
    showFinalScore();
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.solutionButton').forEach(button => {
        attachSolutionButtonListeners_answer14(button);
    });
});

function showFinalScore() {
    const finalScoreElement = document.getElementById('finalScore');
    if (finalScoreElement) {
        const percentage = (score / totalQuestions) * 100;
        finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
    }
}
