function attachSolutionButtonListeners_answer6(button) {
    button.addEventListener('click', function() {
        const solutionInfoId = this.dataset.solutionInfoId;
        const correctAnswers = this.dataset.correctAnswer.split(',');
        checkAnswer6(correctAnswers, solutionInfoId, this.dataset.solutionText);
    });
}

function checkAnswer6(correctAnswers, solutionInfoId, solutionText) {
    const dropdown1 = document.getElementById('dropdown1').value;
    const dropdown2 = document.getElementById('dropdown2').value;

    const userAnswers = [dropdown1, dropdown2];
    const selectedOptions = [
        document.querySelector(`#dropdown1 option[value="${dropdown1}"]`).textContent,
        document.querySelector(`#dropdown2 option[value="${dropdown2}"]`).textContent
    ];

    let isCorrect = true;
    for (let i = 0; i < correctAnswers.length; i++) {
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
        const userAnswerText = `Your answers: On Server1, you can create additional: ${selectedOptions[0]}. Server1 can access network shares on virtual machines that are connected to: ${selectedOptions[1]}.`;
        solutionInfo.innerHTML = `${userAnswerText}<br><br>${solutionText}`;
        solutionInfo.classList.remove('highlight');
        solutionInfo.classList.add('incorrect');
    }

    solutionInfo.style.display = 'block';
    showFinalScore();
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.solutionButton').forEach(button => {
        attachSolutionButtonListeners_answer6(button);
    });
});

function showFinalScore() {
    const finalScoreElement = document.getElementById('finalScore');
    if (finalScoreElement) {
        const percentage = (score / totalQuestions) * 100;
        finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
    }
}
