function attachSolutionButtonListeners_answer7(button) {
    button.addEventListener('click', function() {
        const solutionInfoId = this.dataset.solutionInfoId;
        const correctAnswers = this.dataset.correctAnswer.split(',');
        checkAnswer7(correctAnswers, solutionInfoId, this.dataset.solutionText);
    });
}

function checkAnswer7(correctAnswers, solutionInfoId, solutionText) {
    const selectedOptions = document.querySelectorAll('input[name="answer"]:checked');
    const userAnswers = Array.from(selectedOptions).map(option => option.value);
    const isCorrect = correctAnswers.every(answer => userAnswers.includes(answer)) && userAnswers.length === correctAnswers.length;

    const solutionInfo = document.getElementById(solutionInfoId);
    if (isCorrect) {
        solutionInfo.innerHTML = solutionText;
        solutionInfo.classList.remove('incorrect');
        solutionInfo.classList.add('highlight');
        score += 1; // Ajouter un point si la réponse est correcte
    } else {
        const userAnswerText = userAnswers.length > 0 ? `Your answers: ${userAnswers.map(value => document.querySelector(`label[for="option${value}"]`).textContent).join(', ')}` : "No answers selected";
        solutionInfo.innerHTML = `${userAnswerText}.<br><br>${solutionText}`;
        solutionInfo.classList.remove('highlight');
        solutionInfo.classList.add('incorrect');
    }

    solutionInfo.style.display = 'block';
    showFinalScore();
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.solutionButton').forEach(button => {
        attachSolutionButtonListeners_answer7(button);
    });
});

function showFinalScore() {
    const finalScoreElement = document.getElementById('finalScore');
    if (finalScoreElement) {
        const percentage = (score / totalQuestions) * 100;
        finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
    }
}
