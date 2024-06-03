# terminology

---

## List
|n|name|desc.|O/P|
|-|----|-----|---|
|1|ADModify.net too|As with the idFix tool, it corrects UPNs in error between on-premise sync to AAD in batches<br/><br/>eg:<br/>user1.local<br/>user2.local<br/>user1.local -> user1.com - .local not work because not routable|<img src="https://i.imgur.com/9oeF3QP.png">|
|2|administrative tmp|.admx file<br/>.adml file<br/>`%systemRoot%\policyDefinitions`<br/>`%systemRoot%\policyDefinitions\<lang>`|PolicyDefinitionsFolder<br/><img src="https://i.imgur.com/5OW7zFT.png"><br/><img src="https://i.imgur.com/qDAFIpu.png">|
|3|Deleted objects container|If groups in AD were mistakenly deleted due to misinformation, this feature allows them to be restored|<img src="https://i.imgur.com/TUO8RzF.png">|
|4|dcdiag|tool will analyze the state of the health of AD DS DCs|<img src="https://i.imgur.com/tOIu3R4.png">|
|5|Entra Connect - sync||<img src="https://i.imgur.com/4tU6MoD.png">|
|6|ESAE forest|Enhanced Security Administrative Environment - ESAE<br/><br/>In a rather uncommon environment, one had to go through another domain in order to gain elevation of privileges for installing a program, for example, because the "std" domain didn't have an ADUser account with those privileges|<img src="https://i.imgur.com/jgkCqZ7.png">|
|7|IdFix tool|When creating a new AD user using a customizable template, there were errors on the UPN side, for example, a space in the UPN. So, errors occurred between AD & AAD, happening at least once a month or more depending on hiring seasons.<br/>Simply by correcting the template, the whole issue could have been easily resolved.|<img src="https://i.imgur.com/t5v6E87.png">|
|8|gpedit.msc (gpo local)||<img src="https://i.imgur.com/R1sSOuw.png">|
|9|GPO|GP tmpl<br/>`%systemRoot%\sysvol\<domain>\policies\<GPOGUID>`<br/><br/>Central Store (new adml, admx to import in):<br/>`\\<FQDN>\sysvol\<FQDN>\Policies\`|
|10|netdom|tool allows you to manage AD DS trust; it can also join a computer to a domain, manage computer accounts, query for domain information such as which DCs hold the FSMO roles, and more|error - the trust relationship between this workstation & the primary domain failed<br/><img src="https://i.imgur.com/qTBSMez.png"><br/>Local Administrator<br/><img src="https://i.imgur.com/AA60QXe.png"><br/>utility netdom<br/>`C:\Windows\System32>netdom.exe resetpwd /s:w2k8r2-dc01 /ud:NOLABNOPARTY\Administrator /pd:*`<br/><img src="https://i.imgur.com/isX9qc9.png">|
|11|PDC Emulator|Pirmary Donmain Controler emulator<br/>|<img src="https://i.imgur.com/fvJtXwE.png"><br/>time synchronization in a domain:<br/><img src="https://i.imgur.com/XyCYLSp.png"><br/>netdom query fsmo:<br/><img src="https://i.imgur.com/ec1o1wZ.png">|
|12|service principle name (SPN)|Sometimes, due to incorrect configuration of the service principal name (SPN), it is unable to establish PS-Remoting on a specific host<br/><br/>To correct this, adjustments need to be made to the SPN of the host in question to enable our remote PowerShell<br/><br/>checkUp<br/>`setspn -l HostName`<br/>bad SPN, so delete it:<br/>`setspn -d HTTP/HostName`<br/>add a SPN:<br/>`setspn -a HTTP/HostName ServiceAccount`|SPN register host<br/><img src="https://i.imgur.com/3E6Jtv8.png">|
|13|repadmin|tool helps you view the service's health & diagnose replication problems between DCs|repadmin /replsummary<br/><img src="https://i.imgur.com/vlLxpOK.png">|
|14|RSoPs||<img src="https://i.imgur.com/EzOxYdg.png">|
