//
// definition des variables globales
// une variable globale est défini en début de script une variable locale est définit à l'interieur d'une fonction
// et n'est utilisable que dans la fonction
//
// premier variable boolene initialisée à true
//
let premier = true;
let createcard;
let liste, texte;
//
// fonction qui construit un article
//
function const_article(a_id,a_nom,a_descriptif,a_prix,a_img,a_opt,a_qte) {
    this.id=a_id;
    this.nom=a_nom;
    this.descriptif=a_descriptif;
    this.prix=a_prix;
    this.img=a_img;
    this.opt=a_opt;
    this.qte=a_qte;
}
//
// Fonction de création d'un Noeud
// Dans un document HTML, la méthode document.createElement() 
// crée un élément HTML du type spécifié par tagName ou un HTMLUnknownElement si tagName n’est pas reconnu
//
function createNode(element) {
    return document.createElement(element);
}
// 
// Fonction d'ajout d'un noeud enfant à un noeud parent
// La méthode Node.appendChild() ajoute un nœud à la fin de la liste des enfants d'un nœud parent
// spécifié.
//
function append(parent, el) {
  return parent.appendChild(el);
}
//
// Récupération des paramètres de l'url
// exemple récupération id produit et nom de 
// https://AlainLoiodice_5_12042021/produit.html?_id=5be9cc611c9d440000c1421ename=Cross%20Table
// par propriété searchParams de l'interface URL qui retourne un objet
// URLSearchParams permettant d'accéder aux arguments décodés de la requête GET
// contenu dans l'URL ici _id et name
//
let params = (new URL(document.location)).searchParams;
let idproduit = params.get('_id');
let nomproduit = params.get('name');
//
// constitution de l'adresse url contenant en parametre l'id du produit
//
const url = 'http://localhost:3000/api/furniture'+'/'+idproduit;
const section = document.getElementById('ficheproduits');
//
// cette fonction effectue un appel Ajax vers une URL d'une API
// appel de la fonction en mode asynchrone 
// En JavaScript, les opérations asynchrones sont placées dans des files d’attentes
// qui vont s’exécuter après que le fil d’exécution principal ou la tâche principale 
// (le « main thread » en anglais) ait terminé ses opérations. 
// Elles ne bloquent donc pas l’exécution du reste du code JavaScript.
//
async function loadParamApi (url) {
    //
    // elle retourne une promesse avec deux variables en paramètres  resolve en cas de succès et reject si echec
    //
    return new Promise(function (resolve, reject) {
        //
        // Gestion de la promesse
        //
        let request = new XMLHttpRequest();
        // 
        // onreadystatechange propriété qui définit une fonction a exécuter lorsque le statut de XMLHttpRequest change
        // (readyState 0 UNSENT :requete non initialisée, 1 OPENED :connection serveur établie 2 HEADER_RECEIVED :requète receptionnée 
        // 3 LOADING :traitement requete   4 DONE :requète terminée et reponse prette)
        //
        request.onreadystatechange = function() {
            //
            //Si le traitement est terminé
            //
            if(request.readyState == 4){
                //
                // Si le traitement est un succès
                // status contient le statut de l'objet XMLHttpRequest ( 200 : OK ,  403 : interdit , 404 : page non trouvee ..)
                //
                if(request.status == 200){
                    //
                    // On résoud la promesse et on renvoie la réponse
                    //
                    //var reponse = JSON.parse(this.responseText);
                    //console.log(reponse);
                    resolve(request.responseText);
                }else{
                    //
                    // On résoud la promesse et on envoie l'erreur
                    //
                    reject(request);
                }
            }
        }
        //
        // Si une erreur est survenue
        //
        request.onerror = function(error){
            //
            // On résoud la promesse  et on renvoie l'erreur
            //
            reject(error);
        }
        //
        // La méthode open() de XMLHttpRequest instancie une nouvelle requête ou réinitialise un déjà existante.
        // XMLHttpRequest.open(method, url) ou XMLHttpRequest.open(method, url, async) ou XMLHttpRequest.open(method, url, async, user, password)
        //
        // La méthode  XMLHttpRequest send() envoie la requête au serveur.  Si la requête est asynchrone (elle l'est par défaut), 
        // la méthode envoie un retour dés que la requête est partie et le résultat est intégré en utilisant les évènements.
        // 
        request.open("GET", url, true);
        request.send(null);    
    });
}

//
// On demande une connection à URL pour récupérer les données de l'API
// par appel de la fonction loadParamApi en lui passant en paramètre l'url de connection
// pour exploiter les résultats de la promesse on utilise la méthode "then" qui va gérer
// la réussite de l'appel et la méthode catch pour gérer l'échec.
// 
loadParamApi(url).then(reponse => {
    //
    // On reçoit une réponse 
    // La méthode JSON.parse() analyse une chaîne de caractères JSON et construit
    // la valeur JavaScript ou l'objet décrit par cette chaîne. 
    // on met la reponse parse dans selectproduit et on traite la réponse 
    //
    let selectproduit = JSON.parse(reponse);
    console.log('selectproduit',selectproduit);
    //
    // <div class="card w-75 mx-auto mt-5"></div>
    //
    let divcard = createNode('div');
    divcard.classList.add("card","w-75","mx-auto","mt-5"); 
    append(section, divcard); 
    //
    // <div class="row no-gutters"></div>
    //
    let divrow = createNode('div');
    divrow.classList.add("row", "no-gutters");
    append(divcard, divrow);
    //
    // <div class="col-md-5"></div>
    //
    let divcol5 = createNode('div');
    divcol5.classList.add("col-md-5");
    append(divrow, divcol5);
    //
    // <img src="http://localhost:3000/images/oak_2.jpg" class="card-img-top h-100">
    //
    let image = createNode('img');
    let _img =  selectproduit.imageUrl; 
    image.src = selectproduit.imageUrl;
    image.classList.add("card-img-top", "h-100");
    append(divcol5, image); 
    //
    // <div class="col-md7"></div>
    //   
    let divcol7 = createNode('div');
    divcol7.classList.add("col-md-7");
    append(divrow, divcol7);
    //
    // <div class="card-body"></div>
    //
    let divcardbody = createNode('div');
    divcardbody.classList.add("card-body");
    append(divcol7, divcardbody);
    //
    // recuperatio id produit
    //
    let _id = selectproduit._id;
    let h5cardtitle = createNode('h5');
    //
    // <5h class="card-title">selectproduit.name</h5>
    //
    let _nomprod = selectproduit.name;
    h5cardtitle.classList.add("card-title");
    h5cardtitle.textContent += selectproduit.name;
    append(divcardbody, h5cardtitle);
    //
    // <p class="card-text">"Lorem ipsum dolor sit amet,...."</p>
    //
    let _decrprod = selectproduit.description;
    let pcardtexte = createNode('p');
    pcardtexte.classList.add("card-text");
    pcardtexte.textContent += selectproduit.description;
    append(divcardbody, pcardtexte);
    //
    // Recuperation prix produit
    //
    let prix = parseFloat(selectproduit.price);
    prix = prix / 100;
    //
    // <p class="card-text">Prix : prix</p>
    //
    let pcardprix = createNode('p');
    pcardprix.classList.add("card-text");
    pcardprix.textContent += 'Prix : '+prix+'€';
    append(divcardbody, pcardprix);
    //
    // Traitment de la liste d'option
    //
    let listprodopt = selectproduit.varnish;
    //
    // boucle de parcour de la table listprodopt
    // pour chaque élement
    // avec un traitement particulier sur la premier élement
    //
    for (var i =0; i < listprodopt.length; i++) {
        if (premier) { 
            //
            // <form></form>
            //
            let cardform = createNode('form');
            append(divcardbody, cardform);
            //
            // <label for="optionform" class="mr-2">Choisir une option : </label>
            //
            let cardlabel = createNode('label');
            cardlabel.htmlFor +='optionform';
            cardlabel.textContent='Choisir une option : ';
            cardlabel.classList.add("mr-2"); 
            append(cardform, cardlabel);
            //
            // <select name="optionform" id="optionform" size="1"></select>
            //
            let cardselect = createNode('select');
            createcard = cardselect;
            cardselect.name += 'optionform';
            cardselect.id +='optionform';
            cardselect.size += '1';
            append(cardform, cardselect);
            premier = false;
            //
            // sauvegarde de la premiere option (defaut)
            //
            liste=listprodopt[0];
            }
        //
        // Pour chaque option
        // <option>Nom option</option>
        //    
        let cardoption = createNode('option');
        cardoption.textContent += listprodopt[i];
        append(createcard, cardoption); 
    }
    //
    // si click sur selection couleur récupéartion de l'option choisie par défaut option = listprodopt[0]
    //
    let _opt;
    _opt=liste;
    document.getElementById("optionform").addEventListener("click", function() {
        liste=document.getElementById("optionform");
        texte=liste.options[optionform.selectedIndex].text;
        _opt=texte;
        console.log(_opt);
    });
    //
    // creation de la liste de choix pour la qte produit
    //
    //
    // <form></form>
    //
    let cardformqte = createNode('form');
    append(divcardbody, cardformqte);
    //
    // <label for="optionqte" class="mr-2">Choisir une quantité : </label>
    //
    let cardlabelqte = createNode('label');
    cardlabelqte.htmlFor +='optionqte';
    cardlabelqte.textContent='Choisir une quantité : ';
    cardlabelqte.classList.add("mr-2"); 
    append(cardformqte, cardlabelqte);

    //
    // <select name="optionform" id="optionform" size="1"></select>
    //
    let cardselectqte = createNode('select');
    createcardqte = cardselectqte;
    cardselectqte.name += 'optionqte';
    cardselectqte.id +='optionqte';
    cardselectqte.size += '1';
    append(cardformqte, cardselectqte);
    for (let pas = 0; pas < 9; pas++){ 
        let cardoptionqte = createNode('option');
        cardoptionqte.textContent += pas+1;
        append(createcardqte, cardoptionqte); 
    }
    //
    // si click sur selection qte récupération de l'option choisie par défaut qte = 1
    //
    let _optqte;
    _optqte=1;
    document.getElementById("optionqte").addEventListener("click", function() {
        listeqte=document.getElementById("optionqte");
        texteqte=listeqte.options[optionqte.selectedIndex].text;
        _optqte=texteqte;
        _optqte=parseInt(_optqte);
        console.log(_optqte);
        //
        // Mise à jour de la qte dans la qte affichée dans la fenetre modale
        //
         var QteAModifier = document.getElementById("ConfirmAjoutQte");
         console.log("QteAModifier",QteAModifier);
         QteAModifier.textContent.replace=`Quantité à ajouter au panier :${_optqte}`;


       // PConfirmAjoutcardbtn.textContent+='Ajouter au panier';
    });
    //
    // Creation du bouton ajouter au panier
    // <button type="button" class="btn btn-primary" id="btn-panier" data-toggle="modal" data-target="#BtnFenetreModal">Launch demo modal</button>
    //
    
    var cardbtn = createNode('button');  
    cardbtn.type='button';
    cardbtn.classList.add("mt-5","btn","btn-primary");
    cardbtn.id='btn-panier';
    cardbtn.setAttribute('data-toggle','modal');
    cardbtn.setAttribute('data-target','#BtnFenetreModal');
    cardbtn.textContent+='Ajouter au panier';
    append(divcardbody, cardbtn);
    //
    // Création de la fenètre modale
    // <div class="modal fade" id="BtnFenetreModal" tabindex="-1" role="dialog" aria-labelledby="BtnFenetreModalLabel" aria-hidden="true">
    var divClassModalFade = createNode('div');
    divClassModalFade.classList.add("modal", "fade");
    divClassModalFade.id='BtnFenetreModal';
    divClassModalFade.setAttribute('tabindex','-1');
    divClassModalFade.setAttribute('role','dialog');
    divClassModalFade.setAttribute('aria-labelledby','BtnFenetreModalLabel');
    divClassModalFade.setAttribute('aria-hidden','true');
    append(divcardbody,divClassModalFade);
    //
    // <div class="modal-dialog" role="document">
    // 
    var divClassModalDialog = createNode('div');
    divClassModalDialog.classList.add("modal-dialog");
    divClassModalDialog.setAttribute('role','document');
    append(divClassModalFade,divClassModalDialog);
    //
    // <div class="modal-content">
    //
    var divClassModalContent = createNode('div');
    divClassModalContent.classList.add("modal-content");
    append(divClassModalDialog,divClassModalContent);
    //
    // <div class="modal-header">
    //
    var divClassModalHeader = createNode('div');
    divClassModalHeader.classList.add("modal-header");
    append(divClassModalContent,divClassModalHeader);
    //
    //  <h5 class="modal-title" id="BtnFenetreModalLabel">Confirmation Ajout au panier</h5>
    //
    var divClassModalTitle = createNode('h5');
    divClassModalTitle.classList.add("modal-title");
    divClassModalTitle.id+='BtnFenetreModalLabel';
    divClassModalTitle.textContent='Confirmation Ajout au panier ';
    append(divClassModalHeader,divClassModalTitle);
    //
    // <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    //
    var ModalButtonTitle = createNode('button');  
    ModalButtonTitle.type='button';
    ModalButtonTitle.classList.add("close");
    ModalButtonTitle.setAttribute('data-dismiss','modal');
    ModalButtonTitle.setAttribute('aria-label','Close');
    append(divClassModalHeader, ModalButtonTitle);
    //
    //  <span aria-hidden="true">&times;</span>
    //
    var ModalSpanAriaHidden = createNode('span');
    ModalSpanAriaHidden.setAttribute('aria-hidden','true');
    ModalSpanAriaHidden.textContent='&times';
    append(ModalButtonTitle, ModalSpanAriaHidden);
    //
    // <div class="modal-body" id="ConfirmProdQTe">
    //
    var Modalbody = createNode('div');
    Modalbody.classList.add("modal-body");
    Modalbody.id+='ConfirmProdQTe';
    append(divClassModalContent, Modalbody);
    //
    // <p id="ConfirmAjout">Confirmez l'ajout ${_nomprod} au panier.</p>
    //
    var ModalConfirmAjout = createNode('p');
    ModalConfirmAjout.id+='ConfirmAjout';
    ModalConfirmAjout.textContent=`Confirmez l'ajout ${_nomprod} au panier.`;
    append(Modalbody, ModalConfirmAjout);
    //
    // <p id="ConfirmAjoutQte">Quantité à ajouter au panier :<span>${_optqte}</span></p>
    //
    var ModalConfirmAjoutQte = createNode('p');
    ModalConfirmAjoutQte.id+='ConfirmAjoutQte';
    ModalConfirmAjoutQte.textContent=`Quantité à ajouter au panier :${_optqte}`;
    append(Modalbody, ModalConfirmAjoutQte);
    //
    // <div class="modal-footer">
    //
    var Modalfooter = createNode('div');
    Modalfooter.classList.add("modal-footer");
    append(divClassModalContent, Modalfooter);
    //
    // <button type="button" class="btn btn-secondary" data-dismiss="modal">Abandon</button>
    //
    var ModalButtonFooterAbandon = createNode('button');  
    ModalButtonFooterAbandon.type='button';
    ModalButtonFooterAbandon.classList.add("btn","btn-secondary");
    ModalButtonFooterAbandon.setAttribute('data-dismiss','modal');
    ModalButtonFooterAbandon.textContent="Abandon";
    append(Modalfooter, ModalButtonFooterAbandon);
    //
    // <button type="button" class="btn btn-primary" id="BtnClick" data-dismiss="modal">Confirmation</button>
    //
    var ModalButtonFooterConfirm = createNode('button');  
    ModalButtonFooterConfirm.type='button';
    ModalButtonFooterConfirm.classList.add("btn","btn-secondary");
    ModalButtonFooterConfirm.id+='BtnClick';
    ModalButtonFooterConfirm.setAttribute('data-dismiss','modal');
    ModalButtonFooterConfirm.textContent="Confirmation";
    append(Modalfooter, ModalButtonFooterConfirm);
    //
    // Ajout directement dans le code HTML du contenu de la constante structureBouton
    // Remarque le caractere ` s'obtient en tapant ALTGR + 7 + espace  
    //
    // const positionDivBouton = document.getElementById('BtnFenetreModal');
    // const structureBouton = `
    
    // <!-- Modal -->
    //     <div class="modal-dialog" role="document">
    //         <div class="modal-content">
    //             <div class="modal-header">
    //                 <h5 class="modal-title" id="BtnFenetreModalLabel">Confirmation Ajout au panier</h5>
    //                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    //                     <span aria-hidden="true">&times;</span>
    //                 </button>
    //             </div>
    //             <div class="modal-body" id="ConfirmProdQTe">
    //                 <p id="ConfirmAjout">Confirmez l'ajout ${_nomprod} au panier.</p>
    //                 <p id="ConfirmAjoutQte">Quantité à ajouter au panier :${_optqte}</p>
    //                 ...
    //             </div>
    //             <div class="modal-footer">
    //             <button type="button" class="btn btn-secondary" data-dismiss="modal">Abandon</button>
    //             <button type="button" class="btn btn-primary" id="BtnClick" data-dismiss="modal">Confirmation</button>
    //             </div>
    //         </div>
    //     </div>
    // `;

    // positionDivBouton.innerHTML = structureBouton;



    /////////
    /////////


    //
    // si click sur bouton ajouter au panier
    //
    //document.getElementById("btn-panier").addEventListener("click", function() {
    document.getElementById("BtnClick").addEventListener("click", function() {
        console.log('traitement panier');
        //
        // mise à jour de la local storage avec les données de la page
        //
        //
        // vérification de la présence de la clé "article" dans local storage
        // si la clé article est presente dans le local storage alors
        //    on creait un tableau storage_article qui va contenir les articles présents dans le
        //    localstorage (JSON.parse tranforme les données en données JS) 
        //    on récupère l'indice du tableau (sachant que le tableau commence à index 0, on aura pas besoin
        //    d'incrémenter l'index pour créer un nouvel élément dans le tableau)
        //    Création du nouvel article par appel de la fonction const_article
        //    Mise à jour du tableau storage_article pour l'index indice_article avec les données de l'article créait
        //    et enfin mise à jour de la localstorage
        //    
        //
        if ("article" in localStorage) {
            console.log("article dans local storage");
                var storage_article=new Array();
                var creation = true;
                storage_article=JSON.parse(localStorage.getItem('article'));
                indice_article=storage_article.length;
                console.log(indice_article);

            //
            for (var i =0; i < indice_article; i++) {
                console.log("storage_article[i].id",storage_article[i].id,"id",_id)
                if (storage_article[i].id == _id) {
                    console.log("article existant maj qte");
                    storage_article[i].qte = storage_article[i].qte + _optqte;
                    creation=false;
                    localStorage.setItem("article",JSON.stringify(storage_article));
                    break
                }
            }
            //
            console.log("creation:",creation);
            if (creation) { 
                console.log("article dans local storage mais id inexistant => creation article");
                newarticle = new const_article(_id,_nomprod,_decrprod,prix,_img,_opt,_optqte);
                storage_article[indice_article]= newarticle;
                localStorage.setItem("article",JSON.stringify(storage_article));
            }
            //
            // s'il n'y a pas de clé "article" dans le localStorage alors création de la clé avec comme index 0
            // creation de l'article newarticle par appel de la fonctionconst_article
            // mise à jour du tableau storage_article pour l'index 0 avec l'article que l'on vient de créer
            // mise à jour de la localStorage
            //
            } else {
                indice_article=0;
                var storage_article=new Array();
                var newarticle = new const_article(_id,_nomprod,_decrprod,prix,_img,_opt,_optqte);
                storage_article[indice_article]= newarticle;
                localStorage.setItem("article",JSON.stringify(storage_article));
            }
        console.log(newarticle);
        console.log(indice_article);
        alert("L'article a été ajouté")//
        
        //localStorage.setItem("article",JSON.stringify(storage_article));
        // const prodselection = {
        //     idart: _id,
        //     nomart: _nomprod,
        //     descart: _decrprod,
        //     prixart: prix,
        //     imgart: _img,
        //     optart: _opt
        // }
        // console.log(prodselection);
        // localStorage.setItem("article",JSON.stringify(prodselection));
    });

    //////////////////////////////////////////
    //////////////////////////////////////////
})
.catch(erreur => {
    // On traite l'erreur
    console.log('erreur : ',erreur);
})    
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
//
//
