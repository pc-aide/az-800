function attachSolutionButtonListeners_answer14(button) {
    button.addEventListener('click', function() {
        const solutionInfoId = this.dataset.solutionInfoId;
        const correctAnswers = this.dataset.correctAnswer.split(',');
        checkAnswer14(correctAnswers, solutionInfoId, this.dataset.solutionText);
    });
}

function checkAnswer14(correctAnswers, solutionInfoId, solutionText) {
    const file2Server1 = document.getElementById('file2-server1').value;
    const file1Server2 = document.getElementById('file1-server2').value;
    const file3Server1 = document.getElementById('file3-server1').value;
    const userAnswers = [file2Server1, file1Server2, file3Server1];

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
        solutionInfo.innerHTML = `Your answers: File2.docx in D:\\Folder1 on Server1: ${file2Server1}, File1.docx in D:\\Data1 on Server2: ${file1Server2}, File3.docx will sync to Server1: ${file3Server1}.<br><br>${solutionText}`;
        solutionInfo.classList.remove('highlight');
        solutionInfo.classList.add('incorrect');
    }

    solutionInfo.style.display = 'block';
    showFinalScore();
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.solutionButton').forEach(button => {
        attachSolutionButtonListeners_answer14(button);
    });
});

function showFinalScore() {
    const finalScoreElement = document.getElementById('finalScore');
    if (finalScoreElement) {
        const percentage = (score / totalQuestions) * 100;
        finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
    }
}
