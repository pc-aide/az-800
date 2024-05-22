function attachSolutionButtonListeners_answer2(button) {
    button.addEventListener('click', function() {
        const solutionInfoId = this.dataset.solutionInfoId;
        const correctAnswer = this.dataset.correctAnswer.split(',');
        checkAnswer2(correctAnswer, solutionInfoId, this.dataset.solutionText);
    });
}

function checkAnswer2(correctAnswer, solutionInfoId, solutionText) {
    const selectScopes = document.querySelector('#listDeroulante2_0');
    const selectRelays = document.querySelector('#listDeroulante2_1');

    if (!selectScopes || !selectRelays) {
        console.error("One or both of the dropdowns are not found");
        return;
    }

    const userAnswer = [selectScopes.value, selectRelays.value];

    const isCorrect = (userAnswer[0] === correctAnswer[0] && userAnswer[1] === correctAnswer[1]);

    const solutionInfo = document.getElementById(solutionInfoId);
    if (isCorrect) {
        solutionInfo.innerHTML = solutionText;
        solutionInfo.classList.remove('incorrect');
        solutionInfo.classList.add('highlight');
        score += 1; // Ajouter un point si la réponse est correcte
    } else {
        const userAnswerText = `Your answer: DHCP scopes: ${getDisplayText(userAnswer[0], 'scopes')}, DHCP relays: ${getDisplayText(userAnswer[1], 'relays')}.<br><br>Correct answer: DHCP scopes: ${getDisplayText(correctAnswer[0], 'scopes')}, DHCP relays: ${getDisplayText(correctAnswer[1], 'relays')}`;
        solutionInfo.innerHTML = `${userAnswerText}.<br><br>${solutionText}`;
        solutionInfo.classList.remove('highlight');
        solutionInfo.classList.add('incorrect');
    }

    solutionInfo.style.display = 'block';
    showFinalScore();
}

function getDisplayText(value, type) {
    const options = {
        "scopes": {
            "item2.1": "1",
            "item2.2": "2",
            "item2.3": "3",
            "item2.4": "4"
        },
        "relays": {
            "item2.5": "1",
            "item2.6": "2",
            "item2.7": "3",
            "item2.8": "4"
        }
    };
    return options[type][value] || value;
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.solutionButton').forEach(button => {
        attachSolutionButtonListeners_answer2(button);
    });
});

function showFinalScore() {
    const finalScoreElement = document.getElementById('finalScore');
    if (finalScoreElement) {
        const percentage = (score / totalQuestions) * 100;
        finalScoreElement.textContent = `Final Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
    }
}
