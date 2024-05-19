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
                        else if (this.dataset.answerName === 'answer3') {
                            const selectedAnswer = document.querySelector('input[name="answer3"]:checked');
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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br><br>Explanation: To enable Azure AD users to sign in to Server1 (which is in a workgroup) you need to install AADLoginForWindows extension (full name: Azure AD based Windows Login, recently renamed to: Microsoft Entra login VM)`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }
                        
                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        }
                        else if (this.dataset.answerName === 'answer4') {
                            const selectedAnswers = document.querySelectorAll('input[name="answer4"]:checked');
                            selectedAnswers.forEach(answer => userAnswer.push(answer.value));
                            
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
                        }
                        else if (this.dataset.answerName === 'answer5') {
                            const selectedAnswer = document.querySelector('input[name="answer5"]:checked');
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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br><br>Explanation: Automanage does not support Trusted Launch VMs. Trusted Launch is not supported on Azure VMs and considering the options provided:<br><br>Server1 is a Windows Server 2022 Datacenter with Trusted Launch, so it should not have Azure Automanage enabled.<br>Server2 is a Windows Server 2022 Datacenter with a Standard security type, and Server3 is a Windows Server 2022 Datacenter with a Standard security type. Both Server2 and Server3 can have Azure Automanage enabled.<br>Server4 is a Windows Server 2019 Datacenter, and Trusted Launch is not supported on VMs, so it should not have Azure Automanage enabled.<br>Automanage does not support Trusted Launch VMs.<br><br>For reference: <a href='https://learn.microsoft.com/en-us/azure/automanage/overview-about' target='_blank'>Azure Automanage Overview</a>`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }
                        
                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        }
                        else if (this.dataset.answerName === 'answer6') {
                            const selectedAnswer = document.querySelector('input[name="answer6"]:checked');
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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br><br>Explanation: Just Enough Administration (JEA) is a security technology that enables delegated administration for anything managed by PowerShell.`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }
                        
                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        }      
                        else if (this.dataset.answerName === 'answer7') {
                            const selectedAnswer = document.querySelector('input[name="answer7"]:checked');
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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }
                        
                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        }
                        else if (this.dataset.answerName === 'answer8') {
                            const selectedAnswer = document.querySelector('input[name="answer8"]:checked');
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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br><br>Explanation: A reservation is for a DHCP request. An exclusion is for fixed IP. Create an exclusion range to prevent DHCP from handing out addresses between 192.168.16.242 - 192.168.16.245.`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }
                        
                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        }
                        else if (this.dataset.answerName === 'answer9') {
                            const selectedAnswer = document.querySelector('input[name="answer9"]:checked');
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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br><br>Explanation: I will go with A, because the Questions says to minimize administrative effort.<br>The table in the linked source states that Just Enough Administration (JEA) can provide the best security but requires more detailed configuration.<br>JEA allows you to restrict what commands an administrator can run during a PowerShell session. It can be used to solve the second hop problem.<br><br>For reference: <a href='https://learn.microsoft.com/en-us/powershell/scripting/learn/remoting/ps-remoting-second-hop?view=powershell-7.3' target='_blank'>PS Remoting Second Hop</a>`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }
                        
                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        }
                        else if (this.dataset.answerName === 'answer10') {
                            const selectedAnswer = document.querySelector('input[name="answer10"]:checked');
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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }
                        
                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        }     
                        else if (this.dataset.answerName === 'answer11') {
                            const selectedAnswers = document.querySelectorAll('input[name="answer11"]:checked');
                            selectedAnswers.forEach(answer => userAnswer.push(answer.value));
                            
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
