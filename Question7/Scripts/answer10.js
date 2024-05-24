function enableDragAndDrop() {
    document.querySelectorAll('.draggable').forEach(draggable => {
        draggable.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
            e.dataTransfer.effectAllowed = 'move';
        });
    });

    document.querySelectorAll('.dropzone').forEach(dropzone => {
        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            dropzone.classList.add('highlight');
        });

        dropzone.addEventListener('dragleave', () => {
            dropzone.classList.remove('highlight');
        });

        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            const data = e.dataTransfer.getData('text/plain');
            const draggedElement = document.getElementById(data);
            if (draggedElement) {
                e.target.textContent = draggedElement.textContent;
                e.target.dataset.action = draggedElement.dataset.action;
                e.target.dataset.itemId = draggedElement.id;
                dropzone.classList.remove('highlight');
            }
        });
    });
}

function attachSolutionButtonListeners_answer10(button) {
    button.addEventListener('click', function() {
        const solutionInfoId = this.dataset.solutionInfoId;
        const correctAnswers = this.dataset.correctAnswer.split(',');
        checkAnswer10(correctAnswers, solutionInfoId, this.dataset.solutionText);
    });
}

function checkAnswer10(correctAnswers, solutionInfoId, solutionText) {
    const selectedAnswers = [];
    for (let i = 1; i <= correctAnswers.length; i++) {
        const selectedOption = document.querySelector(`#dropzone10-${i}`).dataset.action;
        selectedAnswers.push(selectedOption ? selectedOption : "Not answered");
    }

    let isCorrect = true;
    selectedAnswers.forEach((answer, index) => {
        if (answer !== correctAnswers[index]) {
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
        const userAnswerText = selectedAnswers.length ? selectedAnswers.join(', ') : "No answers selected";
        solutionInfo.innerHTML = `Your answers: ${userAnswerText}.<br><br>${solutionText}`;
        solutionInfo.classList.remove('highlight');
        solutionInfo.classList.add('incorrect');
    }

    solutionInfo.style.display = 'block';
    showFinalScore();
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.solutionButton').forEach(button => {
        attachSolutionButtonListeners_answer10(button);
    });
    enableDragAndDrop();
});

function showFinalScore() {
    const finalScoreElement = document.getElementById('finalScore');
    if (finalScoreElement) {
        const percentage = (score / totalQuestions) * 100;
        finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
    }
}
