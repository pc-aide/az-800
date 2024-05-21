function attachSolutionButtonListeners_answer19(button) {
    button.addEventListener('click', function() {
        const solutionInfoId = this.dataset.solutionInfoId;
        const correctAnswer = this.dataset.correctAnswer;
        checkAnswer19(correctAnswer, solutionInfoId, this.dataset.solutionText);
    });
}

function checkAnswer19(correctAnswer, solutionInfoId, solutionText) {
    const selectedAnswer = document.querySelector('input[name="answer19"]:checked');
    
    if (!selectedAnswer) {
        console.error("No option selected");
        return;
    }

    const userAnswer = selectedAnswer.value;

    const isCorrect = userAnswer === correctAnswer;

    const solutionInfo = document.getElementById(solutionInfoId);
    if (isCorrect) {
        solutionInfo.innerHTML = solutionText;
        solutionInfo.classList.remove('incorrect');
        solutionInfo.classList.add('highlight');
        score += 1; // Ajouter un point si la réponse est correcte
    } else {
        const userAnswerText = `Your answer: ${getDisplayText(userAnswer)}.<br><br>Correct answer: ${getDisplayText(correctAnswer)}`;
        solutionInfo.innerHTML = `${userAnswerText}.<br><br>${solutionText}`;
        solutionInfo.classList.remove('highlight');
        solutionInfo.classList.add('incorrect');
    }

    solutionInfo.style.display = 'block';
    showFinalScore();
}

function getDisplayText(value) {
    const options = {
        "item19.1": "A. Change the drive letter of the Temporary Storage drive to F.",
        "item19.2": "B. Move pagefile.sys to the Operating System drive.",
        "item19.3": "C. Stop (deallocate) VM1.",
        "item19.4": "D. Expand the Temporary Storage drive."
    };
    return options[value] || value;
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.solutionButton').forEach(button => {
        attachSolutionButtonListeners_answer19(button);
    });
});

function showFinalScore() {
    const finalScoreElement = document.getElementById('finalScore');
    if (finalScoreElement) {
        const percentage = (score / totalQuestions) * 100;
        finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
    }
}
