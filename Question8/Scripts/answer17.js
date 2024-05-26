function attachSolutionButtonListeners_answer17(button) {
    button.addEventListener('click', function() {
        const solutionInfoId = this.dataset.solutionInfoId;
        const correctAnswer = this.dataset.correctAnswer.split(',');
        const userAnswer1 = document.getElementById('ipamServer').value;
        const userAnswer2 = document.getElementById('provisionedServers').value;
        const solutionText = this.dataset.solutionText;

        const solutionInfo = document.getElementById(solutionInfoId);

        const userAnswer = `${userAnswer1},${userAnswer2}`;
        const isCorrect = userAnswer === this.dataset.correctAnswer;

        if (isCorrect) {
            solutionInfo.innerHTML = solutionText;
            solutionInfo.classList.remove('incorrect');
            solutionInfo.classList.add('highlight');
            score += 1; // Ajouter un point si la réponse est correcte
        } else {
            solutionInfo.innerHTML = `Your answers: Server on which to deploy the IPAM server role: ${userAnswer1}, Servers that must be provisioned for IPAM: ${userAnswer2}.<br><br>${solutionText}`;
            solutionInfo.classList.remove('highlight');
            solutionInfo.classList.add('incorrect');
        }

        solutionInfo.style.display = 'block';
        showFinalScore();
    });
}

function showFinalScore() {
    const finalScore = document.getElementById('finalScore');
    finalScore.textContent = `Final Score: ${score}/20 (${((score / 20) * 100).toFixed(2)}%)`;
}

// Assuming this will be called after the page loads
document.addEventListener('DOMContentLoaded', function() {
    const solutionButton = document.querySelector('.solutionButton');
    if (solutionButton) {
        attachSolutionButtonListeners_answer17(solutionButton);
    }
});
