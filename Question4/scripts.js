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
                e.target.dataset.itemId = draggedElement.id;
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

                        if (this.dataset.answerName === 'answer1') {
                            const select1 = document.querySelector('#select1Option1').value;
                            const select2 = document.querySelector('#select1Option2').value;
                            const userAnswer = [select1, select2];

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
                        } else if (this.dataset.answerName === 'answer2') {
                            const select1 = document.querySelector('#select2Option1').value;
                            const select2 = document.querySelector('#select2Option2').value;
                            const userAnswer = [select1, select2];

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
                        } else if (this.dataset.answerName === 'answer3') {
                            const selectedAnswer = document.querySelector('input[name="answer3"]:checked');
                            const userAnswer = selectedAnswer ? [selectedAnswer.value] : [];

                            if (!selectedAnswer || selectedAnswer.value !== correctAnswer[0]) {
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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br><br>Explanation: To enable Azure AD users to sign in to Server1 (which is in a workgroup) you need to install AADLoginForWindows extension (full name: Azure AD based Windows Login, recently renamed to: Microsoft Entra login VM)`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }

                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        } else if (this.dataset.answerName === 'answer4') {
                            const selectedAnswers = document.querySelectorAll('input[name="answer4"]:checked');
                            const userAnswer = Array.from(selectedAnswers).map(answer => answer.value);

                            correctAnswer.forEach(answer => {
                                if (!userAnswer.includes(answer)) {
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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br><br>Explanation: For configuring an Azure runbook in Azure Automation, you can use two primary scripting languages:<br><br>PowerShell: PowerShell is the most commonly used language for creating Azure Automation runbooks. It provides a robust scripting environment with rich capabilities for automating tasks in Azure and other Microsoft environments. PowerShell scripts can interact with Azure resources using Azure cmdlets and APIs.<br>Python: Azure Automation also supports Python as a scripting language for creating runbooks. Python is a popular and versatile language known for its simplicity and readability. With Python scripts, you can automate various tasks in Azure, just like you would with PowerShell.<br><br>For reference: <a href='https://learn.microsoft.com/en-us/azure/automation/automation-runbook-types' target='_blank'>Automation Runbook Types</a>`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }

                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        } else if (this.dataset.answerName === 'answer5') {
                            const selectedAnswer = document.querySelector('input[name="answer5"]:checked');
                            const userAnswer = selectedAnswer ? [selectedAnswer.value] : [];

                            if (!selectedAnswer || selectedAnswer.value !== correctAnswer[0]) {
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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br><br>Explanation: Automanage does not support Trusted Launch VMs. Trusted Launch is not supported on Azure VMs and considering the options provided:<br><br>Server1 is a Windows Server 2022 Datacenter with Trusted Launch, so it should not have Azure Automanage enabled.<br>Server2 is a Windows Server 2022 Datacenter with a Standard security type, and Server3 is a Windows Server 2022 Datacenter with a Standard security type. Both Server2 and Server3 can have Azure Automanage enabled.<br>Server4 is a Windows Server 2019 Datacenter, and Trusted Launch is not supported on VMs, so it should not have Azure Automanage enabled.<br>Automanage does not support Trusted Launch VMs.<br><br>For reference: <a href='https://learn.microsoft.com/en-us/azure/automanage/overview-about' target='_blank'>Azure Automanage Overview</a>`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }

                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        } else if (this.dataset.answerName === 'answer6') {
                            const selectedAnswer = document.querySelector('input[name="answer6"]:checked');
                            const userAnswer = selectedAnswer ? [selectedAnswer.value] : [];

                            if (!selectedAnswer || selectedAnswer.value !== correctAnswer[0]) {
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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br><br>Explanation: Just Enough Administration (JEA) is a security technology that enables delegated administration for anything managed by PowerShell.`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }

                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        } else if (this.dataset.answerName === 'answer7') {
                            const selectedAnswer = document.querySelector('input[name="answer7"]:checked');
                            const userAnswer = selectedAnswer ? [selectedAnswer.value] : [];

                            if (!selectedAnswer || selectedAnswer.value !== correctAnswer[0]) {
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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }

                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        } else if (this.dataset.answerName === 'answer8') {
                            const selectedAnswer = document.querySelector('input[name="answer8"]:checked');
                            const userAnswer = selectedAnswer ? [selectedAnswer.value] : [];

                            if (!selectedAnswer || selectedAnswer.value !== correctAnswer[0]) {
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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br><br>Explanation: A reservation is for a DHCP request. An exclusion is for fixed IP. Create an exclusion range to prevent DHCP from handing out addresses between 192.168.16.242 - 192.168.16.245.`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }

                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        } else if (this.dataset.answerName === 'answer9') {
                            const selectedAnswer = document.querySelector('input[name="answer9"]:checked');
                            const userAnswer = selectedAnswer ? [selectedAnswer.value] : [];

                            if (!selectedAnswer || selectedAnswer.value !== correctAnswer[0]) {
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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br><br>Explanation: I will go with A, because the Questions says to minimize administrative effort.<br>The table in the linked source states that Just Enough Administration (JEA) can provide the best security but requires more detailed configuration.<br>JEA allows you to restrict what commands an administrator can run during a PowerShell session. It can be used to solve the second hop problem.<br><br>For reference: <a href='https://learn.microsoft.com/en-us/powershell/scripting/learn/remoting/ps-remoting-second-hop?view=powershell-7.3' target='_blank'>PS Remoting Second Hop</a>`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }

                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        } else if (this.dataset.answerName === 'answer10') {
                            const selectedAnswer = document.querySelector('input[name="answer10"]:checked');
                            const userAnswer = selectedAnswer ? [selectedAnswer.value] : [];

                            if (!selectedAnswer || selectedAnswer.value !== correctAnswer[0]) {
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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }

                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        } else if (this.dataset.answerName === 'answer11') {
                            const selectedAnswers = document.querySelectorAll('input[name="answer11"]:checked');
                            const userAnswer = Array.from(selectedAnswers).map(answer => answer.value);

                            userAnswer.sort();
                            correctAnswer.sort();

                            if (JSON.stringify(userAnswer) !== JSON.stringify(correctAnswer)) {
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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br><br>Explanation: Open VMConnect. Select the virtual machine that you want to connect to. Click Show options. Select Local resources. Click More. Select the drive that you want to use on the virtual machine and click Ok.<br><br>A. This allows enhanced session mode, which can provide USB redirection and other features.<br>B. When connecting to VM1 using VMConnect, you can configure local resources, including USB devices, through the 'Show Options' menu.<br><br>For reference: <a href='https://docs.microsoft.com/en-us/windows-server/virtualization/hyper-v/learn-more/use-local-resources-on-hyper-v-virtual-machine-with-vmconnect' target='_blank'>Use Local Resources on Hyper-V Virtual Machine with VMConnect</a>`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }

                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        } else if (this.dataset.answerName === 'answer12') {
                            const selectedAnswer = document.querySelector('input[name="answer12"]:checked');
                            const userAnswer = selectedAnswer ? [selectedAnswer.value] : [];

                            if (!selectedAnswer || selectedAnswer.value !== correctAnswer[0]) {
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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br><br>Explanation: To run a container on a Hyper-V virtual machine, you should specify the --isolation parameter with the value hyperv.<br>docker run --isolation hyperv image1<br><br>For reference: <a href='https://docs.microsoft.com/en-us/virtualization/windowscontainers/manage-containers/hyperv-container' target='_blank'>Hyper-V Container Management</a>`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }

                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        } else if (this.dataset.answerName === 'answer13') {
                            const selectedAnswer = document.querySelector('input[name="answer13"]:checked');
                            const userAnswer = selectedAnswer ? [selectedAnswer.value] : [];

                            if (!selectedAnswer || selectedAnswer.value !== correctAnswer[0]) {
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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br><br>Explanation: This is our smallest base container image. As mentioned above, this means less APIs available. For Nano Server, we focused on scenarios where developers will be writing new applications on which the framework can target the specific APIs of Nano Server. Examples of frameworks, languages, or apps that are supported on Nano Server are .Net Core (now called .Net).<br><br>For reference: <a href='https://techcommunity.microsoft.com/t5/containers/nano-server-x-server-core-x-server-which-base-image-is-the-right/ba-p/2835785' target='_blank'>Nano Server x Server Core x Server: Which base image is the right choice?</a>`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }

                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        } else if (this.dataset.answerName === 'answer14') {
                            const selectedAnswer = document.querySelector('input[name="answer14"]:checked');
                            const userAnswer = selectedAnswer ? [selectedAnswer.value] : [];

                            if (!selectedAnswer || selectedAnswer.value !== correctAnswer[0]) {
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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br><br>Explanation: The answer is A. Folder 2 is on D: which by default is the scratch disk that is wiped on a re-boot. A re-size of the VM requires a reboot of the VM, therefore the contents of D will be wiped.<br><br>For reference: <a href='https://www.cloudelicious.net/azure-vms-and-their-temporary-storage/#:~:text=For%20Windows%20Server%2C%20the%20temporary%20disk%20is%20mounted%20as%20D%3A%5C.%20Linux%20based%20VM%E2%80%99s%20have%20the%20temporary%20disk%20mounted%20as%20%E2%80%9C/dev/sdb1%E2%80%9D.%20Of%20course%2C%20the%20same%20principles%20apply%2C%20your%20risk%20losing%20data%20that%20can%E2%80%99t%20be%20recovered%20when%20storing%20data%20on%20this%20disk.' target='_blank'>Azure VMs and Their Temporary Storage</a><br><a href='https://docs.microsoft.com/en-us/answers/questions/235/can-i-use-the-temporary-disk-the-d-drive-by-defaul.html' target='_blank'>Temporary Disk (D: Drive) by Default</a>`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }

                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        } else if (this.dataset.answerName === 'answer15') {
                            const selectedAnswer = document.querySelector('input[name="answer15"]:checked');
                            const userAnswer = selectedAnswer ? [selectedAnswer.value] : [];

                            if (!selectedAnswer || selectedAnswer.value !== correctAnswer[0]) {
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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br><br>Explanation: Data disks can be added and detached without requiring downtime. Changing the VM size requires the VM to be restarted.<br><br>For reference: <a href='https://docs.microsoft.com/en-us/azure/virtual-machines/resize-vm?tabs=portal' target='_blank'>Resize a virtual machine in Azure</a>`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }

                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        } else if (this.dataset.answerName === 'answer16') {
                            const select1 = document.querySelector('select[name="answer16-1"]').value;
                            const select2 = document.querySelector('select[name="answer16-2"]').value;
                            const select3 = document.querySelector('select[name="answer16-3"]').value;
                            const userAnswer = [select1, select2, select3];

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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answers: ${correctAnswer.join(', ')}.<br><br>Explanation: Container1: This is a Windows container that must NOT share a kernel with other containers. To achieve this, you can use Hyper-V isolation.<br>Container2: This is a Linux container that requires two static IP addresses. In Windows Server, Linux containers cannot use Hyper-V isolation; to achieve this, you can only use process isolation.<br>Container3: This is a Windows container that runs a database and requires a static IP address. For Windows containers, you can use either Hyper-V isolation or process isolation, and it depends on your specific requirements. Since there are no specific constraints mentioned, you have the flexibility to choose either isolation mode.<br><br>For reference: <a href='https://learn.microsoft.com/en-us/virtualization/windowscontainers/manage-containers/hyperv-container#hyper-v-isolation' target='_blank'>Hyper-V Isolation</a>, <a href='https://ubuntu.com/tutorials/windows-ubuntu-hyperv-containers#7-run-an-ubuntu-container-on-hyperv' target='_blank'>Ubuntu Containers on Hyper-V</a>, <a href='https://learn.microsoft.com/en-us/virtualization/windowscontainers/manage-containers/hyperv-container' target='_blank'>Windows Containers Management</a>`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }

                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        } else if (this.dataset.answerName === 'answer17') {
                            const dropzone1 = document.querySelector('#dropzone17-1').dataset.itemId;
                            const dropzone2 = document.querySelector('#dropzone17-2').dataset.itemId;
                            const dropzone3 = document.querySelector('#dropzone17-3').dataset.itemId;
                            const dropzone4 = document.querySelector('#dropzone17-4').dataset.itemId;
                            const userAnswer = [dropzone1, dropzone2, dropzone3, dropzone4];

                            const correctAnswerIds = ['item17-1', 'item17-2', 'item17-3', 'item17-4'];

                            userAnswer.forEach((answer, index) => {
                                if (answer !== correctAnswerIds[index]) {
                                    isCorrect = false;
                                }
                            });

                            const solutionText = this.dataset.solutionText;
                            const solutionInfo = document.getElementById(solutionInfoId);
                            if (isCorrect) {
                                solutionInfo.innerHTML = `Your answer: ${userAnswer.join(', ')}.<br><br>Correct answer: ${correctAnswerIds.join(', ')}.<br><br>Explanation: To make the NVMe storage device available to Server1, you need to perform the following actions in sequence:<br>1. From Server1, stop VM1.<br>2. From Server1, run the Remove-VMAssignableDevice cmdlet.<br>3. From Server1, run the Mount-VMHostAssignableDevice cmdlet.<br>4. From Server1, enable the device by using Device Manager.<br><br>For reference: <a href='https://learn.microsoft.com/en-us/troubleshoot/windows-server/identity/transfer-or-seize-operation-master-roles-in-ad-ds#seize-or-transfer-operation-master-roles' target='_blank'>Seize or transfer operation master roles</a>`;
                                solutionInfo.classList.remove('incorrect');
                                solutionInfo.classList.add('highlight');
                                score += 1; // Ajouter un point si la réponse est correcte
                            } else {
                                const userAnswerText = userAnswer.length ? userAnswer.join(', ') : "non défini";
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswerIds.join(', ')}.<br><br>Explanation: To make the NVMe storage device available to Server1, you need to perform the following actions in sequence:<br>1. From Server1, stop VM1.<br>2. From Server1, run the Remove-VMAssignableDevice cmdlet.<br>3. From Server1, run the Mount-VMHostAssignableDevice cmdlet.<br>4. From Server1, enable the device by using Device Manager.<br><br>For reference: <a href='https://learn.microsoft.com/en-us/troubleshoot/windows-server/identity/transfer-or-seize-operation-master-roles-in-ad-ds#seize-or-transfer-operation-master-roles' target='_blank'>Seize or transfer operation master roles</a>`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }

                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        }
                        else if (this.dataset.answerName === 'answer18') {
                            const selectedAnswer = document.querySelector('input[name="answer18"]:checked');
                            const userAnswer = selectedAnswer ? [selectedAnswer.value] : [];
                        
                            if (!selectedAnswer || selectedAnswer.value !== correctAnswer[0]) {
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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br><br>Explanation: Transparent network driver. Containers attached to a network created with the 'transparent' driver will be directly connected to the physical network through an external Hyper-V switch. IPs from the physical network can be assigned statically (requires user-specified --subnet option) or dynamically using an external DHCP server. Option B, as MAC Address Spoofing is required in Transparent mode only.<br><br>For reference: <a href='https://docs.microsoft.com/en-us/virtualization/windowscontainers/container-networking/network-drivers-topologies' target='_blank'>Network drivers and topologies</a>.`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }
                        
                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        }
                        else if (this.dataset.answerName === 'answer19') {
                            const selectedAnswer = document.querySelector('input[name="answer19"]:checked');
                            const userAnswer = selectedAnswer ? [selectedAnswer.value] : [];
                        
                            if (!selectedAnswer || selectedAnswer.value !== correctAnswer[0]) {
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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br><br>Explanation: To automate the deployment and configuration of Azure virtual machines (VMs), you can use a Resource Manager template. These templates let you create consistent deployments each time. Extensions can also be included in templates to automatically configure a VM as part of the deployment. One useful extension joins VMs to a domain, which can be used with Azure Active Directory Domain Services (Azure AD DS) managed domains.<br><br>For reference: <a href='https://www.ludovicmedard.com/create-an-arm-template-of-a-virtual-machine-automatically-joined-to-a-domain/' target='_blank'>Create an ARM template of a virtual machine automatically joined to a domain</a>.`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }
                        
                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        }   
                        else if (this.dataset.answerName === 'answer20') {
                            const selectedAnswer = document.querySelector('input[name="answer20"]:checked');
                            const userAnswer = selectedAnswer ? [selectedAnswer.value] : [];
                        
                            if (!selectedAnswer || selectedAnswer.value !== correctAnswer[0]) {
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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br><br>Explanation: After deploying a server cluster, run the Validate-DCB tool to test networking. After updating a server cluster, depending on your scenario, run both validation options to troubleshoot cluster issues. After setting up replication with Storage Replica, validate that the replication is proceeding normally by checking some specific events and running a couple commands. After creating a server cluster, run the Validate-DCB tool before placing it into production. You can use the Validate-DCB cmdlet to verify that Remote Direct Memory Access (RDMA) and all the required Windows Server settings are configured properly on each server to support an Azure Stack HCI cluster. The Validate-DCB cmdlet checks that the settings on the local computer are configured correctly for Data Center Bridging (DCB) and RDMA. This includes checking for the presence of the required software and hardware, such as the RDMA network adapter and the DCB feature, and verifying that the settings on the network adapter are configured correctly.<br><br>For reference: <a href='https://github.com/Microsoft/Validate-DCB' target='_blank'>Validate-DCB on GitHub</a>, <a href='https://learn.microsoft.com/en-us/azure-stack/hci/deploy/validate#install-and-run-the-validate-dcb-tool' target='_blank'>Install and run the Validate-DCB tool</a>, <a href='https://learn.microsoft.com/en-us/azure-stack/hci/deploy/validate' target='_blank'>Validate Azure Stack HCI</a>.`;
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
