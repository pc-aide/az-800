// Constants
var score = 0; // Initialiser le score à 0
var totalQuestions = 20; // Nombre total de questions

// Functions
function showFinalScore() {
    var percentage = (score / totalQuestions) * 100; // Calculer le score en pourcentage
    document.getElementById('finalScore').textContent = "Final Score: " + score + "/" + totalQuestions + " (" + percentage.toFixed(2) + "%)";
}

function loadQuestions(files) {
    files.forEach(file => {
        fetch('Questionnaire/' + file)
            .then(response => response.text())
            .then(data => {
                const div = document.createElement('div');
                div.innerHTML = data;
                document.getElementById('questionContainer').appendChild(div);

                // Re-attacher les écouteurs d'événements pour chaque bouton "Solution"
                var solutionButtons = div.querySelectorAll('.solutionButton');
                solutionButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        const solutionInfoId = this.dataset.solutionInfoId;
                        const correctAnswer = this.dataset.correctAnswer.split(',');

                        if (this.dataset.answerName === 'answer1') {
                            checkAnswer1(correctAnswer, solutionInfoId, this.dataset.solutionText);
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
