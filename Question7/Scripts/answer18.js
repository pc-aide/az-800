function attachSolutionButtonListeners_answer18(button) {
    button.addEventListener('click', function() {
        const solutionInfoId = this.dataset.solutionInfoId;
        const correctAnswer = this.dataset.correctAnswer;
        checkAnswer18(correctAnswer, solutionInfoId, this.dataset.solutionText);
    });
}

function checkAnswer18(correctAnswer, solutionInfoId, solutionText) {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    const userAnswer = selectedAnswer ? selectedAnswer.value : null;

    const isCorrect = userAnswer === correctAnswer;

    const solutionInfo = document.getElementById(solutionInfoId);
    if (isCorrect) {
        solutionInfo.innerHTML = solutionText;
        solutionInfo.classList.remove('incorrect');
        solutionInfo.classList.add('highlight');
        score += 1; // Ajouter un point si la réponse est correcte
    } else {
        const userAnswerText = userAnswer ? `Your answer: ${selectedAnswer.nextElementSibling.textContent}` : "No answer selected.";
        solutionInfo.innerHTML = `${userAnswerText}<br><br>Correct answer: ${correctAnswer}.<br><br>Explanation: On the File Screening Management node of the File Server Resource Manager MMC snap-in, you can perform the following tasks: Create file screens to control the types of files that users can save, and generate notifications when users attempt to save unauthorized files. Define file screening templates that can be applied to new volumes or folders and that can be used across an organization. Create file screening exceptions that extend the flexibility of the file screening rules.<br><br>Ref: <a href='https://docs.microsoft.com/en-us/windows-server/storage/fsrm/file-screening-management' target='_blank'>File Screening Management</a>`;
        solutionInfo.classList.remove('highlight');
        solutionInfo.classList.add('incorrect');
    }

    solutionInfo.style.display = 'block';
    showFinalScore();
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
