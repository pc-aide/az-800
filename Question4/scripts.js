var score = 0; // Initialiser le score à 0
var totalQuestions = 20; // Nombre total de questions

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

function sortQuestions() {
    const container = document.getElementById('questionContainer');
    const questions = Array.from(container.children);

    questions.sort((a, b) => {
        const numA = parseInt(a.querySelector('h2').textContent.match(/\d+/)[0]);
        const numB = parseInt(b.querySelector('h2').textContent.match(/\d+/)[0]);
        return numA - numB;
    });

    questions.forEach(question => container.appendChild(question));
}

function loadQuestions(files) {
    // Trier les fichiers dans l'ordre croissant
    files.sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)[0]);
        const numB = parseInt(b.match(/\d+/)[0]);
        return numA - numB;
    });

    let loadedCount = 0;

    files.forEach(file => {
        fetch(file)
            .then(response => response.text())
            .then(data => {
                const div = document.createElement('div');
                div.innerHTML = data;
                document.getElementById('questionContainer').appendChild(div);
                enableDragAndDrop();

                loadedCount++;
                if (loadedCount === files.length) {
                    sortQuestions(); // Appel de la fonction pour trier les questions après le chargement de toutes les questions
                }

                // Re-attacher les écouteurs d'événements pour chaque bouton "Solution"
                var solutionButtons = div.querySelectorAll('.solutionButton');
                solutionButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        var solutionInfoId = this.dataset.solutionInfoId;
                        var correctAnswer = this.dataset.correctAnswer.split(',');
                        let isCorrect = true;
                        let userAnswer = [];

                        if (this.dataset.answerName === 'answer1') {
                            const select1 = document.querySelector('#select1Option1').value;
                            const select2 = document.querySelector('#select1Option2').value;
                            userAnswer = [select1, select2];

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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br><br>Explanation: To use Application Proxy, you need a Windows server running Windows Server 2012 R2 or later. You'll install the Application Proxy connector on the server.`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }

                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        }
                        else if (this.dataset.answerName === 'answer2') {
                            const select1 = document.querySelector('#select2Option1').value;
                            const select2 = document.querySelector('#select2Option2').value;
                            userAnswer = [select1, select2];
                        
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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br><br>Explanation: Before you enable Automation State Configuration, we would like you to know that a newer version of DSC is now generally available, managed by a feature of Azure Policy named guest configuration. The guest configuration service combines features of DSC Extension, Azure Automation State Configuration, and the most commonly requested features from customer feedback. Guest configuration also includes hybrid machine support through Arc-enabled servers.`;
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
    loadQuestions([
        'question1.html', 'question2.html', 'question3.html', 'question4.html', 'question5.html',
        'question6.html', 'question7.html', 'question8.html', 'question9.html', 'question10.html',
        'question11.html', 'question12.html', 'question13.html', 'question14.html', 'question15.html',
        'question16.html', 'question17.html', 'question18.html', 'question19.html', 'question20.html'
    ]);
});
