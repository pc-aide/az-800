function attachSolutionButtonListeners_answer20(button) {
    button.addEventListener('click', function() {
        const solutionInfoId = this.dataset.solutionInfoId;
        const correctAnswer = this.dataset.correctAnswer;
        checkAnswer20(correctAnswer, solutionInfoId, this.dataset.solutionText);
    });
}

function checkAnswer20(correctAnswer, solutionInfoId, solutionText) {
    const selectedAnswer = document.querySelector('input[name="answer20"]:checked');
    
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
        "item20.1": "A. Deploy Azure Bastion to VNet1.",
        "item20.2": "B. Deploy Azure Extended Network.",
        "item20.3": "C. Configure VNet1 to use the IP address range of 10.0.2.0/24.",
        "item20.4": "D. Configure VNet1 to use an IP address range of 10.0.1.128/25."
    };
    return options[value] || value;
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.solutionButton').forEach(button => {
        attachSolutionButtonListeners_answer20(button);
    });
});

function showFinalScore() {
    const finalScoreElement = document.getElementById('finalScore');
    if (finalScoreElement) {
        const percentage = (score / totalQuestions) * 100;
        finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
    }
}
