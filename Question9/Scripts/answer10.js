function attachSolutionButtonListeners_question10(button) {
    button.addEventListener('click', function() {
        // Réinitialiser les couleurs des réponses
        document.querySelectorAll('.answer-row').forEach(row => {
            row.classList.remove('incorrect', 'highlight');
        });

        // Vérifier les réponses
        let allCorrect = true;

        const selectedServer1 = document.querySelector('select[name="server1"]').value;
        const selectedServer2 = document.querySelector('select[name="server2"]').value;

        if (selectedServer1 === 'File1.txt, File2.docx, File3.sys, & File4.bmp') {
            document.querySelector('select[name="server1"]').parentElement.classList.add('highlight');
        } else {
            document.querySelector('select[name="server1"]').parentElement.classList.add('incorrect');
            allCorrect = false;
        }

        if (selectedServer2 === 'File1.txt & File3.sys only') {
            document.querySelector('select[name="server2"]').parentElement.classList.add('highlight');
        } else {
            document.querySelector('select[name="server2"]').parentElement.classList.add('incorrect');
            allCorrect = false;
        }

        // Mise à jour du score
        if (allCorrect) {
            score++;
        }
        showFinalScore();

        // Afficher l'explication
        document.getElementById('solutionInfo_question10').style.display = 'block';
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.solutionButton').forEach(button => {
        attachSolutionButtonListeners_question10(button);
    });
});
