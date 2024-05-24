function attachSolutionButtonListeners_answer9(button) {
    button.addEventListener('click', function() {
        const solutionInfoId = this.dataset.solutionInfoId;
        const correctAnswers = this.dataset.correctAnswer.split(',');
        checkAnswer9(correctAnswers, solutionInfoId, this.dataset.solutionText);
    });
}

function checkAnswer9(correctAnswers, solutionInfoId, solutionText) {
    const selectedAnswers = [];
    for (let i = 1; i <= correctAnswers.length; i++) {
        const selectedOption = document.querySelector(`input[name="answer${i}"]:checked`);
        selectedAnswers.push(selectedOption ? selectedOption.value : null);
    }

    let isCorrect = true;
    selectedAnswers.forEach((answer, index) => {
        if (answer !== correctAnswers[index]) {
            isCorrect = false;
        }
    });

    const solutionInfo = document.getElementById(solutionInfoId);
    if (isCorrect) {
        solutionInfo.innerHTML = solutionText;
        solutionInfo.classList.remove('incorrect');
        solutionInfo.classList.add('highlight');
        score += 1; // Ajouter un point si la réponse est correcte
    } else {
        const userAnswerText = selectedAnswers.length ? selectedAnswers.join(', ') : "No answers selected";
        solutionInfo.innerHTML = `Your answers: ${userAnswerText}.<br><br>${solutionText}`;
        solutionInfo.classList.remove('highlight');
        solutionInfo.classList.add('incorrect');
    }

    solutionInfo.style.display = 'block';
    showFinalScore();
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.solutionButton').forEach(button => {
        attachSolutionButtonListeners_answer9(button);
    });
});

function showFinalScore() {
    const finalScoreElement = document.getElementById('finalScore');
    if (finalScoreElement) {
        const percentage = (score / totalQuestions) * 100;
        finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
    }
}
