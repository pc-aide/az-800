function attachSolutionButtonListeners_question4(button) {
    button.addEventListener('click', function() {
        // Réinitialiser les couleurs des réponses
        document.querySelectorAll('.dropzone').forEach(dropzone => {
            dropzone.classList.remove('incorrect', 'highlight');
        });

        // Vérifier les réponses
        let allCorrect = true;

        const dropZone4_1 = document.getElementById('dropZone4_1');
        const dropZone4_2 = document.getElementById('dropZone4_2');
        const dropZone4_3 = document.getElementById('dropZone4_3');

        if (dropZone4_1.dataset.itemId === 'item4.2') {
            dropZone4_1.classList.add('highlight');
        } else {
            dropZone4_1.classList.add('incorrect');
            allCorrect = false;
        }

        if (dropZone4_2.dataset.itemId === 'item4.4') {
            dropZone4_2.classList.add('highlight');
        } else {
            dropZone4_2.classList.add('incorrect');
            allCorrect = false;
        }

        if (dropZone4_3.dataset.itemId === 'item4.6') {
            dropZone4_3.classList.add('highlight');
        } else {
            dropZone4_3.classList.add('incorrect');
            allCorrect = false;
        }

        // Mise à jour du score
        if (allCorrect) {
            score++;
        }
        showFinalScore();

        // Afficher l'explication
        document.getElementById('solutionInfo_question4').style.display = 'block';
    });
}
