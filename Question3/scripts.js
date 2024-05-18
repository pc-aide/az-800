var score = 0; // Initialiser le score à 0
var totalQuestions = 2; // Nombre total de questions

function enableDragAndDrop() {
    document.querySelectorAll('.actions .draggable').forEach(draggable => {
        draggable.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.dataset.action);
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
            const draggedElement = document.querySelector(`.draggable[data-action='${data}']`);
            if (draggedElement) {
                e.target.textContent = draggedElement.textContent;
                e.target.dataset.action = data;
                dropzone.classList.remove('highlight');
            }
        });
    });
}

function showFinalScore() {
    var percentage = (score / totalQuestions) * 100; // Calculer le score en pourcentage
    document.getElementById('finalScore').textContent = "Final Score: " + score + "/" + totalQuestions + " (" + percentage.toFixed(2) + "%)";
    document.getElementById('finalScoreHeader').textContent = "Final Score: " + score + "/" + totalQuestions + " (" + percentage.toFixed(2) + "%)"; // Afficher le score final dans le header
}

function loadQuestions(files) {
    // Trier les fichiers dans l'ordre croissant
    files.sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)[0]);
        const numB = parseInt(b.match(/\d+/)[0]);
        return numA - numB;
    });

    files.forEach((file, index) => {
        fetch(file)
            .then(response => response.text())
            .then(data => {
                const div = document.createElement('div');
                div.innerHTML = data;
                document.getElementById('questionContainer').appendChild(div);
                enableDragAndDrop();
                // Re-attacher les écouteurs d'événements pour chaque bouton "Solution"
                var solutionButtons = div.querySelectorAll('.solutionButton');
                solutionButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        var solutionInfoId = this.dataset.solutionInfoId;
                        var correctAnswer = this.dataset.correctAnswer.split(',');
                        let isCorrect = true;
                        let userAnswer = [];

                        if (this.dataset.answerName === 'answer1') {
                            const dropzone1 = document.querySelector('#dropzoneAction1').dataset.action;
                            const dropzone2 = document.querySelector('#dropzoneAction2').dataset.action;
                            const dropzone3 = document.querySelector('#dropzoneAction3').dataset.action;
                            const dropzone4 = document.querySelector('#dropzoneAction4').dataset.action;
                            const dropzone5 = document.querySelector('#dropzoneAction5').dataset.action;
                            userAnswer = [dropzone1, dropzone2, dropzone3, dropzone4, dropzone5];

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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br>For reference: <a href='https://learn.microsoft.com/en-us/troubleshoot/windows-server/identity/transfer-or-seize-operation-master-roles-in-ad-ds#seize-or-transfer-operation-master-roles' target='_blank'>Seize or transfer operation master roles</a>`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }

                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        } else if (this.dataset.answerName === 'answer2') {
                            const selectedAnswer = document.querySelector('input[name="answer2"]:checked');
                            if (selectedAnswer) {
                                userAnswer.push(selectedAnswer.value);
                                if (selectedAnswer.value !== correctAnswer[0]) {
                                    isCorrect = false;
                                }
                            } else {
                                isCorrect = false;
                            }

                            const solutionText = this.dataset.solutionText;
                            const solutionInfo = document.getElementById(solutionInfoId);
                            if (isCorrect) {
                                solutionInfo.innerHTML = solutionText;
                                solutionInfo.classList.remove('incorrect');
                                solutionInfo.classList.add('highlight');
                                score += 1; // Ajouter un point si la réponse est correcte
                            } else {
                                const userAnswerText = userAnswer.length ? userAnswer.join(', ') : "non défini";
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br>For reference: <a href='https://learn.microsoft.com/en-us/entra/identity/hybrid/cloud-sync/what-is-cloud-sync' target='_blank'>What is Cloud Sync?</a>`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }

                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        }
                    });
                });
            })
            .catch(error => console.error('Error loading question:', error));
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Charger toutes les questions
    loadQuestions(['question1.html', 'question2.html']);
});
