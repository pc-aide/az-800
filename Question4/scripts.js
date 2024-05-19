else if (this.dataset.answerName === 'answer17') {
    const dropzone1 = document.querySelector('#dropzoneAction17.8').dataset.action;
    const dropzone2 = document.querySelector('#dropzoneAction17.9').dataset.action;
    const dropzone3 = document.querySelector('#dropzoneAction17.10').dataset.action;
    const dropzone4 = document.querySelector('#dropzoneAction17.11').dataset.action;
    userAnswer = [dropzone1, dropzone2, dropzone3, dropzone4];

    userAnswer.forEach((answer, index) => {
        if (answer !== correctAnswer[index]) {
            isCorrect = false;
        }
    });

    const solutionText = this.dataset.solutionText;
    const solutionInfo = document.getElementById(solutionInfoId);
    if (isCorrect) {
        solutionInfo.innerHTML = solutionText;
        solutionInfo.classList.remove('incorrect');
        solutionInfo.classList.add('highlight');
        score += 1; // Ajouter un point si la réponse est correcte
    } else {
        const userAnswerText = userAnswer.length ? userAnswer.join(', ') : "non défini";
        solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answers: ${correctAnswer.join(', ')}.<br><br>Explanation: 1. From Server1, Stop VM1. (You need to stop VM1 to release the NVMe storage device from the virtual machine.)<br>2. From Server1, run the Remove-VMAssignableDevice cmdlet. (This step detaches the device from the virtual machine.)<br>3. From Server1, run the Mount-VMHostAssignableDevice cmdlet. (Now that the device is no longer assigned to VM1, This makes the NVMe storage device available to Server1.)<br>4. From Server1, enable the device by using Device Manager. (Once the device is attached to Server1, you should enable it in Device Manager to make it usable by the host server.)<br><br>For reference: <a href='https://docs.microsoft.com/en-us/windows-server/virtualization/hyper-v/deploy/deploying-storage-devices-using-dda' target='_blank'>Deploying Storage Devices Using DDA</a>, <a href='https://docs.microsoft.com/en-us/windows-server/virtualization/hyper-v/deploy/deploying-graphics-devices-using-dda#removing-a-device-and-returning-it-to-the-host' target='_blank'>Removing a Device and Returning it to the Host</a>`;
        solutionInfo.classList.remove('highlight');
        solutionInfo.classList.add('incorrect');
    }

    solutionInfo.style.display = 'block';
    showFinalScore();
}
