function attachSolutionButtonListeners_answer17(button) {
    button.addEventListener('click', function() {
        const solutionInfoId = this.dataset.solutionInfoId;
        const correctAnswer = this.dataset.correctAnswer;
        checkAnswer17(correctAnswer, solutionInfoId, this.dataset.solutionText);
    });
}

function checkAnswer17(correctAnswer, solutionInfoId, solutionText) {
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
        solutionInfo.innerHTML = `${userAnswerText}<br><br>Correct answer: ${correctAnswer}.<br><br>Explanation: To swiftly access all the files on Disk2 after connecting it to Server2, you should install the Data Deduplication server role. Here’s why: Data Deduplication: Disk2 is already configured for deduplication on Server1. When you move Disk2 to Server2, the deduplication settings are retained. The deduplication filter recognizes the volume as an atomic unit, including all deduplication settings. You’ll be able to access the deduplicated files directly without unpacking the entire data. No additional efforts are required.<br><br>Ref: <a href='https://docs.microsoft.com/en-us/windows-server/storage/data-deduplication/overview' target='_blank'>Overview</a>, <a href='https://techcommunity.microsoft.com/t5/storage-at-microsoft/introduction-to-data-deduplication-in-windows-server-2012/ba-p/424257' target='_blank'>Introduction to Data Deduplication in Windows Server 2012</a>`;
        solutionInfo.classList.remove('highlight');
        solutionInfo.classList.add('incorrect');
    }

    solutionInfo.style.display = 'block';
    showFinalScore();
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.solutionButton').forEach(button => {
        attachSolutionButtonListeners_answer17(button);
    });
});

function showFinalScore() {
    const finalScoreElement = document.getElementById('finalScore');
    if (finalScoreElement) {
        const percentage = (score / totalQuestions) * 100;
        finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
    }
}
