function attachSolutionButtonListeners_answer1(button) {
    button.addEventListener('click', function() {
        const solutionInfoId = this.dataset.solutionInfoId;
        const correctAnswer = this.dataset.correctAnswer.split(',');
        checkAnswer1(correctAnswer, solutionInfoId, this.dataset.solutionText);
    });
}

function checkAnswer1(correctAnswer, solutionInfoId, solutionText) {
    let isCorrect = true;
    const select1 = document.querySelector('#select1Option1').value;
    const select2 = document.querySelector('#select1Option2').value;
    const userAnswer = [select1, select2];

    userAnswer.forEach((answer, index) => {
        if (answer !== correctAnswer[index]) {
            isCorrect = false;
        }
    });

    const solutionInfo = document.getElementById(solutionInfoId);
    if (isCorrect) {
        solutionInfo.innerHTML = solutionText;
        solutionInfo.classList.remove('incorrect');
        solutionInfo.classList.add('highlight');
        score += 1; // Ajouter un point si la réponse est correcte
    } else {
        const userAnswerText = userAnswer.length ? userAnswer.join(', ') : "non défini";
        solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br><br>Explanation: 'Boot diagnostics must be enabled for the VM' and 'The Azure account accessing Serial Console must have Virtual Machine Contributor role for both the VM and the boot diagnostics storage account'.<br><br>For reference: <a href='https://docs.microsoft.com/en-us/troubleshoot/azure/virtual-machines/serial-console-overview' target='_blank'>Serial Console overview</a>.`;
        solutionInfo.classList.remove('highlight');
        solutionInfo.classList.add('incorrect');
    }

    solutionInfo.style.display = 'block';
    showFinalScore();
}
