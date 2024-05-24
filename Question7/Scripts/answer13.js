function attachSolutionButtonListeners_answer13(button) {
    button.addEventListener('click', function() {
        const solutionInfoId = this.dataset.solutionInfoId;
        const correctAnswers = this.dataset.correctAnswer.split(',');
        checkAnswer13(correctAnswers, solutionInfoId, this.dataset.solutionText);
    });
}

function checkAnswer13(correctAnswers, solutionInfoId, solutionText) {
    const file1Location = document.getElementById('file1-location').value;
    const file3Location = document.getElementById('file3-location').value;
    const userAnswers = [file1Location, file3Location];

    let isCorrect = true;
    for (let i = 0; i < userAnswers.length; i++) {
        if (userAnswers[i] !== correctAnswers[i]) {
            isCorrect = false;
            break;
        }
    }

    const solutionInfo = document.getElementById(solutionInfoId);
    if (isCorrect) {
        solutionInfo.innerHTML = solutionText;
        solutionInfo.classList.remove('incorrect');
        solutionInfo.classList.add('highlight');
        score += 1; // Ajouter un point si la réponse est correcte
    } else {
        solutionInfo.innerHTML = `Your answers: File1: ${file1Location}, File3: ${file3Location}.<br><br>${solutionText}`;
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
