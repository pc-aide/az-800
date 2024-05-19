var score = 0; // Initialiser le score à 0
var totalQuestions = 15; // Nombre total de questions

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
                            const dropzone1 = document.querySelector('#dropzone1-1').dataset.action;
                            const dropzone2 = document.querySelector('#dropzone1-2').dataset.action;
                            const dropzone3 = document.querySelector('#dropzone1-3').dataset.action;
                            const dropzone4 = document.querySelector('#dropzone1-4').dataset.action;
                            const dropzone5 = document.querySelector('#dropzone1-5').dataset.action;
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
                        } else if (this.dataset.answerName === 'answer3') {
                            const checkboxes = document.querySelectorAll('input[name="answer3"]:checked');
                            checkboxes.forEach(checkbox => userAnswer.push(checkbox.value));
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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br>For reference: <a href='https://learn.microsoft.com/en-us/powershell/module/activedirectory/new-aduser?view=windowsserver2022-ps' target='_blank'>New-ADUser</a>, <a href='https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/adac/advanced-ad-ds-management-using-active-directory-administrative-center--level-200-' target='_blank'>AD Administrative Center</a>`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }

                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        } else if (this.dataset.answerName === 'answer4') {
                            const select1 = document.querySelector('#select4Option1').value;
                            const select2 = document.querySelector('#select4Option2').value;
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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br>For reference: <a href='https://learn.microsoft.com/en-us/entra/identity/authentication/howto-password-ban-bad-on-premises-deploy#read-only-domain-controller-considerations' target='_blank'>Read-only domain controller considerations</a><br><a href='https://learn.microsoft.com/en-us/entra/identity/authentication/howto-password-ban-bad-on-premises-deploy#microsoft-entra-connect-agent-updater-prerequisites' target='_blank'>Microsoft Entra Connect Agent Updater Prerequisites</a>`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }

                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        } else if (this.dataset.answerName === 'answer5') {
                            const select1 = document.querySelector('#select5Option1').value;
                            const select2 = document.querySelector('#select5Option2').value;
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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br>For reference: <a href='https://www.youtube.com/watch?v=zYy0KAZBLQ0' target='_blank'>YouTube Video</a>, <a href='https://raw.githubusercontent.com/pc-aide/az-800/main/q54_test_attribute_on_User.png' target='_blank'>Image 1</a>, <a href='https://raw.githubusercontent.com/pc-aide/az-800/main/editor_of_sync_cfg.png' target='_blank'>Image 2</a>, <a href='https://raw.githubusercontent.com/pc-aide/az-800/main/test_sync_force_if_attribute_was_sync_to_AAD_user.png' target='_blank'>Image 3</a>`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }

                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        } else if (this.dataset.answerName === 'answer6') {
                            const answer1 = document.querySelector('input[name="answer6_1"]:checked');
                            const answer2 = document.querySelector('input[name="answer6_2"]:checked');
                            const answer3 = document.querySelector('input[name="answer6_3"]:checked');
                            userAnswer = [answer1 ? answer1.value : null, answer2 ? answer2.value : null, answer3 ? answer3.value : null];

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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br>Explanation: No granular password policies are mentioned. So the Default Domain Policy is leading. In this case, the minimal password length is 8.<br><br>To add to this, only 1 password policy can be in effect for a domain and can only be defined in the default domain policy, or in another GPO linked to the root domain and that would be given precedence.<br>The only way to have multiple is to use fine grained policies.`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }

                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        } else if (this.dataset.answerName === 'answer7') {
                            const select1 = document.querySelector('#select7Option1').value;
                            const select2 = document.querySelector('#select7Option2').value;
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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br>Explanation: <br>Trust1: Forest trust or external trust only.<br>Trust2: Forest trust only.`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }

                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        } else if (this.dataset.answerName === 'answer8') {
                            const answer1 = document.querySelector('input[name="answer8_1"]:checked');
                            const answer2 = document.querySelector('input[name="answer8_2"]:checked');
                            const answer3 = document.querySelector('input[name="answer8_3"]:checked');
                            userAnswer = [answer1 ? answer1.value : null, answer2 ? answer2.value : null, answer3 ? answer3.value : null];

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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br>Explanation: Enforced. If the GPO link is enforced, it cannot be blocked at a lower-level (in the Group Policy processing hierarchy) container.<br><br>For reference: <a href='https://learn.microsoft.com/en-us/powershell/module/grouppolicy/set-gplink?view=windowsserver2022-ps' target='_blank'>Set-GPLink</a>`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }

                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        } else if (this.dataset.answerName === 'answer9') {
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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br>Explanation: When determining the minimum password length that User1 should use when changing to a new password, the following precedence order should be considered:<br><br>Password Settings object applied directly to the user (User1).<br>Password Settings object applied to the user's group (Group1).<br>Group Policy linked to the user's organizational unit (OU1).<br>Default Domain Policy.<br>Default Domain Controllers Policy.<br><br>Based on the precedence order and the configuration provided:<br>Password Settings object applied to User1: 7<br>Password Settings object applied to Group1: 14<br>Group Policy linked to OU1: 8<br>Default Domain Policy: 10<br>Default Domain Controllers Policy: 12<br><br>User1's minimum password length will be determined by the Password Settings object applied directly to the user (User1), which specifies a minimum password length of 7 characters. Therefore, User1 should use a minimum password length of 7 characters when changing to a new password.`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }

                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        } else if (this.dataset.answerName === 'answer10') {
                            const select1 = document.querySelector('#select10Option1').value;
                            const select2 = document.querySelector('#select10Option2').value;
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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br><br>Explanation: On-Premises: Install Windows Admin Center and configure Azure Network Adapter.<br>Azure: Create an existing virtual network gateway.<br><br>For reference:<br><a href='https://learn.microsoft.com/en-us/windows-server/manage/windows-admin-center/azure/use-azure-network-adapter' target='_blank'>Windows Admin Center - Azure Network Adapter</a><br><a href='https://learn.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-howto-point-to-site-resource-manager-portal' target='_blank'>Azure VPN Gateway - Point-to-Site</a>`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }

                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        } else if (this.dataset.answerName === 'answer11') {
                            const dropzone1 = document.querySelector('#dropzone11-1').dataset.action;
                            const dropzone2 = document.querySelector('#dropzone11-2').dataset.action;
                            const dropzone3 = document.querySelector('#dropzone11-3').dataset.action;
                            userAnswer = [dropzone1, dropzone2, dropzone3];

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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br><br>Explanation: In my test on Windows Server 2022:<br>1. Request New Certificate, Open certificate and Copy Thumbprint<br>2. Go to Apps & Features, click Windows Admin Center, click Modify, click Next<br>3. Click Change, Paste Thumbprint, click Change, click Finish, Ready.<br><br>For reference:<br><a href='http://coryretherford.com/Lists/Posts/Post.aspx?ID=418' target='_blank'>Replace certificate in Windows Admin Center</a><br><img src='https://raw.githubusercontent.com/pc-aide/az-800/main/q2.png' alt='Step 1' width='600'><br><img src='https://raw.githubusercontent.com/pc-aide/az-800/main/q2_2.png' alt='Step 2' width='600'><br><img src='https://raw.githubusercontent.com/pc-aide/az-800/main/q2_3.png' alt='Step 3' width='600'>`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }

                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        }
                        else if (this.dataset.answerName === 'answer12') {
                            const select1 = document.querySelector('#select12Option1').value;
                            const select2 = document.querySelector('#select12Option2').value;
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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br><br>For reference: <a href='https://docs.microsoft.com/en-us/windows-server/manage/windows-admin-center/azure/azure-monitor' target='_blank'>Azure Monitor with Windows Admin Center</a>`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }
                        
                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        }
                        else if (this.dataset.answerName === 'answer13') {
                            const selectedAnswer = document.querySelector('input[name="answer13"]:checked');
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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br><br>Explanation: The question asks that "Admin1", a user account, has the appropriate permissions. The role of Azure Connected Machine Onboarding can only be assigned to a service principal, as confirmed by the link given to justify the wrong answer. Admin1 cannot be assigned this role, it's impossible, check it for yourself. Admin1, as a local server admin, has all the rights he/she needs. The correct answer is "A", generate a new onboarding script. One can onboard more than one server with the same script. Onboarding two certainly doesn't impose an administrative burden to use this method.<br>For reference: <a href='https://learn.microsoft.com/en-us/azure/azure-arc/servers/onboard-portal' target='_blank'>Azure Arc Onboarding</a>`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }
                        
                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        }
                        else if (this.dataset.answerName === 'answer14') {
                            const select1 = document.querySelector('#select14Option1').value;
                            const select2 = document.querySelector('#select14Option2').value;
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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br><br>For reference: <a href='https://docs.microsoft.com/en-us/windows-server/manage/windows-admin-center/configure/user-access-control#:~:text=To%20configure%20Resource,Get%2DADComputer%20wac' target='_blank'>Configure Resource-Based Constrained Delegation</a>`;
                                solutionInfo.classList.remove('highlight');
                                solutionInfo.classList.add('incorrect');
                            }
                        
                            solutionInfo.style.display = 'block';
                            showFinalScore();
                        }
                        else if (this.dataset.answerName === 'answer15') {
                            const select1 = document.querySelector('#select15Option1').value;
                            const select2 = document.querySelector('#select15Option2').value;
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
                                solutionInfo.innerHTML = `Your answer: ${userAnswerText}.<br><br>Correct answer: ${correctAnswer.join(', ')}.<br><br>Explanation: The question clearly states the session configuration (.PSSC) file has been created. You must register the session. Answers are Register-PSSessionConfiguration and .pssc.<br>For reference: <a href='https://learn.microsoft.com/en-us/powershell/scripting/security/remoting/jea/register-jea?view=powershell-7.2' target='_blank'>Register JEA</a>`;
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
        'question11.html', 'question12.html', 'question13.html', 'question14.html', 'question15.html'
    ]);
});
