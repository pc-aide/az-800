<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Question 17</title>
    <style>
        .container {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .actions, .answers {
            display: flex;
            gap: 10px;
        }
        .draggable {
            padding: 10px;
            border: 1px solid #ccc;
            cursor: pointer;
        }
        .dropzone {
            padding: 10px;
            border: 1px dashed #ccc;
            min-width: 150px;
            min-height: 50px;
        }
        .highlight {
            border-color: #000;
        }
    </style>
</head>
<body>
    <div>
        <h2>Question 17</h2>
        <p>Your network contains an Active Directory domain, a web app named App1, and a perimeter network. The perimeter network contains a server named Server1 that runs Windows Server.</p>
        <p>You plan to provide external access to App1.</p>
        <p>You need to implement the Web Application Proxy role service on Server1.</p>
        <p>Which role should you add to Server1, and which role should you add to the network? To answer, drag the appropriate roles to the correct targets. Each role may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content.</p>

        <div class="container">
            <div class="actions">
                <div class="draggable" id="item1" draggable="true" data-role="AD Certificate Services">AD Certificate Services</div>
                <div class="draggable" id="item2" draggable="true" data-role="AD FS">AD FS</div>
                <div class="draggable" id="item3" draggable="true" data-role="Network Policy & Access Services">Network Policy & Access Services</div>
                <div class="draggable" id="item4" draggable="true" data-role="Remote Access">Remote Access</div>
            </div>
            <div class="answers">
                <div class="dropzone" id="dropzone1" data-answer="Role on Server1">Role on Server1</div>
                <div class="dropzone" id="dropzone2" data-answer="Role on the network">Role on the network</div>
            </div>
        </div>

        <div id="solutionInfo17"></div>

        <button class="solutionButton" data-solution-info-id="solutionInfo17" data-correct-answer="Remote Access,AD FS" data-answer-name="answer17" data-solution-text="Correct answer: Role on Server1: Remote Access; Role on the network: AD FS.<br><br>Explanation: To deploy Web Application Proxy, you must install the Remote Access role with the Web Application Proxy role service on a server that will act as the Web Application Proxy server.<br><br>You must configure Web Application Proxy to connect to an AD FS server.<br><br>For reference: <a href='https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-r2-and-2012/dn383662(v=ws.11)#install-the-remote-access-role' target='_blank'>Install the Remote Access role</a>.">Solution</button>
    </div>
    <script src="Scripts/answer17.js"></script>
</body>
</html>
