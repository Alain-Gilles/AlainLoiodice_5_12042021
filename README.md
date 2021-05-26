# AlainLoiodice_5_12042021
Openclassrooms projet 5 Orinoco


## Consignes pour installer environnement de test du projet orinoco sur un server local


******************************************************************************************
************                       Prérequis                                  ************
******************************************************************************************

Remarque cette documentation part du principe que nodejs est installé sur votre ordinateur.
Vous pouvez que node et npm sont installés en tapant les commandes suivantes à partir de votre terminal
$ npm -v doit afficher la version du pgm
$ node -v doit afficher la version du pgm
Si les programmes ne sont pas installés : 
Aller sur https://nodejs.org et télécharger la dernière version stable : version LTS (installe entre autre Node.js, npm package manager..)


********************************************************
* Première étape cloner le front-end du projet orinoco *
********************************************************

A l'aide d'un terminal Cygwin64 ou Git Bash  créer un répertoire vide qui s'appelle orinoco sur c:
Avec Cygwin64
Se positionner sur c
$ cd c:  
  
Créer le répertoire orinoco                                        
$ mkdir orinoco

Se positionner sur le répertoire orinoco
$ cd orinoco

Cloner le repository du frontend de l'application dans un répertoire local
$ git clone https://github.com/Alain-Gilles/AlainLoiodice_5_12042021.git

Le dossier AlainLoiodice_5_12042021 a été créé dans orinoco.

***********************************************
* Seconde étape cloner le back-end du projet  *
***********************************************

Vérifier que l'on est toujours sur le répertoire orinoco  par $ pwd

Cloner le repository du backend de l'application dans un répertoire local
$ git clone https://github.com/OpenClassrooms-Student-Center/JWDP5.git

Le dossier JWDP5 a été créé dans orinoco

********************************************
* Troisième étape renommer les répertoires *
********************************************

Nous allons renommer le répertoire AlainLoiodice_5_12042021 en frontend
 $ mv AlainLoiodice_5_12042021 frontend

Et renommer le fichier JWDP5 en backend
$ mv JWDP5 backend 

***********************************************************************
*Quatrième étape installer les dépendances dans le repertoire backend *
***********************************************************************

Se positionner sur le répertoire backend
$ cd backend

Installation des dépendances
$ npm install

**********************************************************
* Cinquième étape mise en route du server local          *
**********************************************************

Mise en route du serveur
$ node server

Le serveur est lancé sur le port 3000. Listening on port 3000

***************************************************
* Sixième étape ouvrir votre navigateur           *
***************************************************

Ouvrir votre navigateur et entrer l'adresse suivante :  file:///C:/orinoco/frontend/index.html


*********************************************
* Pour finir (pour arrêter le serveur)      *
*********************************************

Lorsque vous voudrez arrêter le serveur il faudra aller sur le terminal et taper ctrl c

Si vous souhaitez le relancer pour effectuer de nouveaux tests sur orinoco

Il faudra ouvrir le terminal ex Cygwin64, se positionner sur c:/orinoco/backend
$ cd c:
$ cd orinoco
$ cd backend
Puis entrer la commande $ node server pour lancer le server sur le port 3000
Ensuite ouvrir votre navigateur et entrer l'adresse 
c:/orinoco/frontend/index.html

