function attachSolutionButtonListeners_answer12(button) {
    button.addEventListener('click', function() {
        const solutionInfoId = this.dataset.solutionInfoId;
        const correctAnswers = this.dataset.correctAnswer.split(',');
        checkAnswer12(correctAnswers, solutionInfoId, this.dataset.solutionText);
    });
}

function checkAnswer12(correctAnswers, solutionInfoId, solutionText) {
    const userAnswers = [
        document.querySelector('input[name="vpn1"]:checked') ? document.querySelector('input[name="vpn1"]:checked').value : null,
        document.querySelector('input[name="vpn2"]:checked') ? document.querySelector('input[name="vpn2"]:checked').value : null,
        document.querySelector('input[name="vpn3"]:checked') ? document.querySelector('input[name="vpn3"]:checked').value : null,
    ];

    const solutionInfo = document.getElementById(solutionInfoId);
    let isCorrect = true;

    userAnswers.forEach((answer, index) => {
        if (answer !== correctAnswers[index]) {
            isCorrect = false;
        }
    });

    if (isCorrect) {
        solutionInfo.innerHTML = solutionText;
        solutionInfo.classList.remove('incorrect');
        solutionInfo.classList.add('highlight');
        score += 1; // Ajouter un point si la réponse est correcte
    } else {
        const userAnswerText = `Your answers: VPN1: ${userAnswers[0]}, VPN2: ${userAnswers[1]}, VPN3: ${userAnswers[2]}`;
        solutionInfo.innerHTML = `${userAnswerText}.<br><br>${solutionText}`;
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
