function attachSolutionButtonListeners_answer1(button) {
    button.addEventListener('click', function() {
        const solutionInfoId = this.dataset.solutionInfoId;
        const correctAnswer = this.dataset.correctAnswer.split(',');
        checkAnswer1(correctAnswer, solutionInfoId, this.dataset.solutionText);
    });
}

function checkAnswer1(correctAnswer, solutionInfoId, solutionText) {
    const user1Answer = document.querySelector('input[name="user1"]:checked') ? document.querySelector('input[name="user1"]:checked').value : '';
    const user3Answer = document.querySelector('input[name="user3"]:checked') ? document.querySelector('input[name="user3"]:checked').value : '';
    const user2Answer = document.querySelector('input[name="user2"]:checked') ? document.querySelector('input[name="user2"]:checked').value : '';

    const userAnswers = [user1Answer, user3Answer, user2Answer];
    const isCorrect = userAnswers.length === correctAnswer.length && userAnswers.every((val, index) => val === correctAnswer[index]);

    const solutionInfo = document.getElementById(solutionInfoId);
    if (isCorrect) {
        solutionInfo.innerHTML = solutionText;
        solutionInfo.classList.remove('incorrect');
        solutionInfo.classList.add('highlight');
        score += 1; // Ajouter un point si la réponse est correcte
    } else {
        const userAnswersText = `Your answers: User1 can read the files in share1: ${user1Answer}, User3 can delete files in Share1: ${user3Answer}, If User2 connects to \\Server1.adatum.com from File Explorer, Share1 will be listed: ${user2Answer}.<br>`;
        const correctAnswersText = `Correct answers: User1 can read the files in share1: Yes. User3 can delete files in Share1: No. If User2 connects to \\Server1.adatum.com from File Explorer, Share1 will be listed: No.<br>`;
        const explanationText = `Explanation: Very important are share permissions. User1 has access share and permissions. User2 has only access on file. User3 has access to to share but not permission on folder.<br><br>Ref: <a href='https://learn.microsoft.com/en-us/azure/storage/files/storage-files-identity-ad-ds-configure-permissions' target='_blank'>Microsoft Learn</a>`;
        solutionInfo.innerHTML = `${userAnswersText}<br>${correctAnswersText}<br>${explanationText}`;
        solutionInfo.classList.remove('highlight');
        solutionInfo.classList.add('incorrect');
    }

    solutionInfo.style.display = 'block';
    showFinalScore();
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.solutionButton').forEach(button => {
        attachSolutionButtonListeners_answer1(button);
    });
});

function showFinalScore() {
    const finalScoreElement = document.getElementById('finalScore');
    if (finalScoreElement) {
        const percentage = (score / totalQuestions) * 100;
        finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
    }
}
