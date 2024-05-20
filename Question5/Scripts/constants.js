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

                // Attacher les écouteurs d'événements pour chaque bouton "Solution"
                const solutionButtons = div.querySelectorAll('.solutionButton');
                solutionButtons.forEach(button => {
                    const answerName = button.dataset.answerName;
                    const functionName = `attachSolutionButtonListeners_${answerName}`;
                    if (typeof window[functionName] === 'function') {
                        window[functionName](button);
                    } else {
                        console.error(`Function ${functionName} is not defined`);
                    }
                });
            })
            .catch(error => console.error('Error loading question:', error));
    });
}

function loadScripts(scripts) {
    return Promise.all(scripts.map(script => {
        return new Promise((resolve, reject) => {
            const scriptTag = document.createElement('script');
            scriptTag.src = 'Scripts/' + script;
            scriptTag.onload = resolve;
            scriptTag.onerror = () => reject(new Error(`Failed to load script: ${script}`));
            document.body.appendChild(scriptTag);
        });
    }));
}

document.addEventListener('DOMContentLoaded', function() {
    // Charger tous les scripts de réponse
    loadScripts([
        'answer1.js', 'answer2.js', 'answer3.js', 'answer4.js', 'answer5.js',
        'answer6.js', 'answer7.js', 'answer8.js', 'answer9.js', 'answer10.js',
        'answer11.js', 'answer12.js', 'answer13.js', 'answer14.js', 'answer15.js',
        'answer16.js', 'answer17.js', 'answer18.js', 'answer19.js', 'answer20.js'
    ])
    .then(() => {
        // Charger toutes les questions après que tous les scripts de réponse sont chargés
        loadQuestions([
            'question1.html', 'question2.html', 'question3.html', 'question4.html', 'question5.html',
            'question6.html', 'question7.html', 'question8.html', 'question9.html', 'question10.html',
            'question11.html', 'question12.html', 'question13.html', 'question14.html', 'question15.html',
            'question16.html', 'question17.html', 'question18.html', 'question19.html', 'question20.html'
        ]);
    })
    .catch(error => console.error('Error loading scripts:', error));
});
