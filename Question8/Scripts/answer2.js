function attachSolutionButtonListeners_answer2(button) {
    button.addEventListener('click', function() {
        const solutionInfoId = this.dataset.solutionInfoId;
        const correctAnswer = this.dataset.correctAnswer.split(',');
        checkAnswer2(correctAnswer, solutionInfoId, this.dataset.solutionText);
    });
}

function checkAnswer2(correctAnswer, solutionInfoId, solutionText) {
    const userAnswers = [
        document.querySelector('select[name="firstOption"]').value,
        document.querySelector('select[name="secondOption"]').value
    ];

    const isCorrect = userAnswers.length === correctAnswer.length && userAnswers.every((val, index) => val === correctAnswer[index]);

    const solutionInfo = document.getElementById(solutionInfoId);
    if (isCorrect) {
        solutionInfo.innerHTML = solutionText;
        solutionInfo.classList.remove('incorrect');
        solutionInfo.classList.add('highlight');
        score += 1; // Ajouter un point si la réponse est correcte
    } else {
        const userAnswersText = `Your answers: net use m: ${userAnswers[0]}${userAnswers[1]}<br>`;
        const correctAnswersText = `Correct answer: net use m: ${correctAnswer[0]}${correctAnswer[1]}<br>`;
        const explanationText = `Explanation: look at the question again. in the Files namespace (\\contoso\\files), you create a folder named Folder1 that has a target… - so the full namespace is \\contoso\\files\\folder1. The files and folder1 add to the root namespace contoso.com. The target is added to the folder1 as a folder target, but we need none of that information to answer the question.<br><br>Ref: <a href='https://learn.microsoft.com/en-us/windows-server/storage/dfs-namespaces/dfs-overview' target='_blank'>Microsoft Documentation</a>.`;
        solutionInfo.innerHTML = `${userAnswersText}<br>${correctAnswersText}<br>${explanationText}`;
        solutionInfo.classList.remove('highlight');
        solutionInfo.classList.add('incorrect');
    }

    solutionInfo.style.display = 'block';
    showFinalScore();
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.solutionButton').forEach(button => {
        attachSolutionButtonListeners_answer2(button);
    });
});

function showFinalScore() {
    const finalScoreElement = document.getElementById('finalScore');
    if (finalScoreElement) {
        const percentage = (score / totalQuestions) * 100;
        finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
    }
}
