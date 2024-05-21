function attachSolutionButtonListeners_answer12(button) {
    button.addEventListener('click', function() {
        const solutionInfoId = this.dataset.solutionInfoId;
        const correctAnswer = this.dataset.correctAnswer.split(',');
        checkAnswer12(correctAnswer, solutionInfoId, this.dataset.solutionText);
    });
}

function checkAnswer12(correctAnswer, solutionInfoId, solutionText) {
    const select1 = document.querySelector('#select12-1').value;
    const select2 = document.querySelector('#select12-2').value;
    const userAnswer = [select1, select2];

    const isCorrect = (userAnswer[0] === correctAnswer[0] && userAnswer[1] === correctAnswer[1]);

    const solutionInfo = document.getElementById(solutionInfoId);
    if (isCorrect) {
        solutionInfo.innerHTML = solutionText;
        solutionInfo.classList.remove('incorrect');
        solutionInfo.classList.add('highlight');
        score += 1; // Ajouter un point si la réponse est correcte
    } else {
        const userAnswerText = `Your answer: ProcessA: ${getOptionText(select1)}, ProcessC: ${getOptionText(select2)}.<br><br>Correct answer: ProcessA: ${getOptionText(correctAnswer[0])}, ProcessC: ${getOptionText(correctAnswer[1])}`;
        solutionInfo.innerHTML = `${userAnswerText}.<br><br>${solutionText}`;
        solutionInfo.classList.remove('highlight');
        solutionInfo.classList.add('incorrect');
    }

    solutionInfo.style.display = 'block';
    showFinalScore();
}

function getOptionText(value) {
    const selectElements = document.querySelectorAll('select');
    for (const select of selectElements) {
        const option = select.querySelector(`option[value="${value}"]`);
        if (option) {
            return option.textContent;
        }
    }
    return value;
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.solutionButton').forEach(button => {
        attachSolutionButtonListeners_answer12(button);
    });
});

function showFinalScore() {
    const finalScoreElement = document.getElementById('finalScore');
    if (finalScoreElement) {
        const percentage = (score / totalQuestions) * 100;
        finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
    }
}
