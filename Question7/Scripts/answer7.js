function attachSolutionButtonListeners_answer7(button) {
    button.addEventListener('click', function() {
        const solutionInfoId = this.dataset.solutionInfoId;
        const correctAnswer = this.dataset.correctAnswer;
        checkAnswer7(correctAnswer, solutionInfoId, this.dataset.solutionText);
    });
}

function checkAnswer7(correctAnswer, solutionInfoId, solutionText) {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    const userAnswer = selectedOption ? selectedOption.value : null;
    const selectedLabel = selectedOption ? document.querySelector(`label[for="${selectedOption.id}"]`).textContent.trim() : null;

    const solutionInfo = document.getElementById(solutionInfoId);
    if (userAnswer === correctAnswer) {
        solutionInfo.innerHTML = solutionText;
        solutionInfo.classList.remove('incorrect');
        solutionInfo.classList.add('highlight');
        score += 1; // Ajouter un point si la réponse est correcte
    } else {
        const userAnswerText = selectedLabel ? `Your answer: ${selectedLabel}` : "No answer selected";
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
