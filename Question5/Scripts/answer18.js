function attachSolutionButtonListeners_answer18(button) {
    button.addEventListener('click', function() {
        const solutionInfoId = this.dataset.solutionInfoId;
        const correctAnswer = this.dataset.correctAnswer.split(',');
        checkAnswer18(correctAnswer, solutionInfoId, this.dataset.solutionText);
    });
}

function checkAnswer18(correctAnswer, solutionInfoId, solutionText) {
    const selectImage1 = document.querySelector('#listDeroulante18_0');
    const selectImage2 = document.querySelector('#listDeroulante18_1');

    if (!selectImage1 || !selectImage2) {
        console.error("One or both of the dropdowns are not found");
        return;
    }

    const userAnswer = [selectImage1.value, selectImage2.value];
    console.log("User Answer: ", userAnswer); // Debugging message

    const isCorrect = (userAnswer[0] === correctAnswer[0] && userAnswer[1] === correctAnswer[1]);

    const solutionInfo = document.getElementById(solutionInfoId);
    if (isCorrect) {
        solutionInfo.innerHTML = solutionText;
        solutionInfo.classList.remove('incorrect');
        solutionInfo.classList.add('highlight');
        score += 1; // Ajouter un point si la réponse est correcte
    } else {
        const userAnswerText = `Your answer: Image1: ${getDisplayText(selectImage1.value)}, Image2: ${getDisplayText(selectImage2.value)}.<br><br>Correct answer: Image1: ${getDisplayText(correctAnswer[0])}, Image2: ${getDisplayText(correctAnswer[1])}`;
        solutionInfo.innerHTML = `${userAnswerText}.<br><br>${solutionText}`;
        solutionInfo.classList.remove('highlight');
        solutionInfo.classList.add('incorrect');
    }

    solutionInfo.style.display = 'block';
    showFinalScore();
}

function getDisplayText(value) {
    const options = {
        "item18.1": "Hyper-V isolation only",
        "item18.2": "Process isolation only",
        "item18.3": "Hyper-V isolation or process isolation",
        "item18.4": "Hyper-V isolation only",
        "item18.5": "Process isolation only",
        "item18.6": "Hyper-V isolation or process isolation"
    };
    return options[value] || value;
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.solutionButton').forEach(button => {
        attachSolutionButtonListeners_answer18(button);
    });
});

function showFinalScore() {
    const finalScoreElement = document.getElementById('finalScore');
    if (finalScoreElement) {
        const percentage = (score / totalQuestions) * 100;
        finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
    }
}
