function attachSolutionButtonListeners_answer19(button) {
    button.addEventListener('click', function() {
        const solutionInfoId = this.dataset.solutionInfoId;
        const correctAnswer = this.dataset.correctAnswer.split(',');
        checkAnswer19(correctAnswer, solutionInfoId, this.dataset.solutionText);
    });
}

function checkAnswer19(correctAnswer, solutionInfoId, solutionText) {
    const answers = [];
    const selectedAnswers = document.querySelectorAll('input[name^="answer"]:checked');

    selectedAnswers.forEach(answer => {
        answers.push(answer.value);
    });

    const isCorrect = answers.length === correctAnswer.length && answers.every((val, index) => val === correctAnswer[index]);

    const solutionInfo = document.getElementById(solutionInfoId);
    if (isCorrect) {
        solutionInfo.innerHTML = solutionText;
        solutionInfo.classList.remove('incorrect');
        solutionInfo.classList.add('highlight');
        score += 1; // Ajouter un point si la réponse est correcte
    } else {
        const userAnswersText = answers.map((val, index) => `When User${index + 1} connects: ${val}`).join('.<br>');
        const correctAnswersText = correctAnswer.map((val, index) => `When User${index + 1} connects: ${val}`).join('.<br>');
        solutionInfo.innerHTML = `${userAnswersText}.<br><br>Correct answers:<br>${correctAnswersText}.<br><br>Explanation: User1 can't take ownership (can see file), User2 can see the file, User3 can't see the file.<br><br>Ref: <a href='https://community.spiceworks.com/topic/832081-write-only-shared-folder-permissions-in-education-setting#:~:text=Creator%20Owner%20has%3A%20List%20folder%2Fread%20data%2C%20read%20attrib%2C,saved%20to%20make%20sure%20it%20was%20copied%20successfully' target='_blank'>Spiceworks Community</a>`;
        solutionInfo.classList.remove('highlight');
        solutionInfo.classList.add('incorrect');
    }

    solutionInfo.style.display = 'block';
    showFinalScore();
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
