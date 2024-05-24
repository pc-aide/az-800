function attachSolutionButtonListeners_answer15(button) {
    button.addEventListener('click', function() {
        const solutionInfoId = this.dataset.solutionInfoId;
        const correctAnswers = this.dataset.correctAnswer.split(',');
        checkAnswer15(correctAnswers, solutionInfoId, this.dataset.solutionText);
    });
}

function checkAnswer15(correctAnswers, solutionInfoId, solutionText) {
    const bitlocker = document.getElementById('bitlocker').value;
    const diskQuotas = document.getElementById('disk-quotas').value;
    const userAnswers = [bitlocker, diskQuotas];

    let isCorrect = true;
    for (let i = 0; i < userAnswers.length; i++) {
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
        solutionInfo.innerHTML = `Your answers: Bitlocker: ${bitlocker}, Disk quotas: ${diskQuotas}.<br><br>Correct answers:<br><br>
        Bitlocker: C, D, & E<br>
        Disk quotas: C & D only<br><br>
        Explanation:<br>
        BitLocker can be used on all NTFS volumes. Disk quotas can only be used on NTFS volumes.<br><br>
        Ref:<br>
        <a href='https://learn.microsoft.com/en-us/windows-server/storage/refs/refs-overview' target='_blank'>ReFS and NTFS Overview</a>`;
        solutionInfo.classList.remove('highlight');
        solutionInfo.classList.add('incorrect');
    }

    solutionInfo.style.display = 'block';
    showFinalScore();
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.solutionButton').forEach(button => {
        attachSolutionButtonListeners_answer15(button);
    });
});

function showFinalScore() {
    const finalScoreElement = document.getElementById('finalScore');
    if (finalScoreElement) {
        const percentage = (score / totalQuestions) * 100;
        finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
    }
}
