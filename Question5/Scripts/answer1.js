function attachSolutionButtonListeners_answer2(button) {
    button.addEventListener('click', function() {
        const solutionInfoId = this.dataset.solutionInfoId;
        const correctAnswer = this.dataset.correctAnswer.split(',');
        checkAnswer2(correctAnswer, solutionInfoId, this.dataset.solutionText);
    });
}

function checkAnswer2(correctAnswer, solutionInfoId, solutionText) {
    let isCorrect = true;
    const select1 = document.querySelector('#select2Option1').value;
    const select2 = document.querySelector('#select2Option2').value;
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
        solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br><br>Explanation: Push the image to your registry. Now that you've tagged the image with the fully qualified path to your private registry, you can push it to the registry with docker push:<br>docker push myregistry.azurecr.io/samples/nginx<br><br>For reference: <a href='https://docs.microsoft.com/en-us/azure/container-registry/container-registry-get-started-docker-cli?tabs=azure-cli#push-the-image-to-your-registry' target='_blank'>Push the image to your registry</a>.`;
        solutionInfo.classList.remove('highlight');
        solutionInfo.classList.add('incorrect');
    }

    solutionInfo.style.display = 'block';
    showFinalScore();
}
