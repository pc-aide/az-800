function attachSolutionButtonListeners_answer12(button) {
    button.addEventListener('click', function() {
        const solutionInfoId = this.dataset.solutionInfoId;
        const correctAnswers = this.dataset.correctAnswer.split(',');
        checkAnswer12(correctAnswers, solutionInfoId, this.dataset.solutionText);
    });
}

function checkAnswer12(correctAnswers, solutionInfoId, solutionText) {
    const answers = [
        document.querySelector('input[name="q12s1"]:checked'),
        document.querySelector('input[name="q12s2"]:checked'),
        document.querySelector('input[name="q12s3"]:checked')
    ];
    const userAnswers = answers.map(answer => answer ? answer.value : "No answer selected");

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
        solutionInfo.innerHTML = `Your answers: ${userAnswers.join(', ')}.<br><br>${solutionText}`;
        solutionInfo.classList.remove('highlight');
        solutionInfo.classList.add('incorrect');
    }

    solutionInfo.style.display = 'block';
    showFinalScore();
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
