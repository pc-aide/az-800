function attachSolutionButtonListeners_answer16(button) {
    button.addEventListener('click', function() {
        const solutionInfoId = this.dataset.solutionInfoId;
        const correctAnswer = this.dataset.correctAnswer.split(',');
        checkAnswer16(correctAnswer, solutionInfoId, this.dataset.solutionText);
    });
}

function checkAnswer16(correctAnswer, solutionInfoId, solutionText) {
    const selectRunFrom = document.querySelector('#selectRunFrom').value;
    const selectCmdlet = document.querySelector('#selectCmdlet').value;
    const userAnswer = [selectRunFrom, selectCmdlet];

    const isCorrect = (userAnswer[0] === correctAnswer[0] && userAnswer[1] === correctAnswer[1]);

    const solutionInfo = document.getElementById(solutionInfoId);
    if (isCorrect) {
        solutionInfo.innerHTML = solutionText;
        solutionInfo.classList.remove('incorrect');
        solutionInfo.classList.add('highlight');
        score += 1; // Ajouter un point si la réponse est correcte
    } else {
        const userAnswerText = `Your answer: Run from: ${selectRunFrom}, Cmdlet: ${selectCmdlet}.<br><br>Correct answer: Run from: ${correctAnswer[0]}, Cmdlet: ${correctAnswer[1]}`;
        solutionInfo.innerHTML = `${userAnswerText}.<br><br>${solutionText}`;
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
