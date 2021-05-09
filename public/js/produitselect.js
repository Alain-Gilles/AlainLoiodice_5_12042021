//
// premier variable boolene initialisée à true
//
let premier = true;
let createcard;
let liste, texte;
let getpost = "GET";
let contactProduit = "";
//
// fonction qui construit un objet article
//
function const_article(a_id, a_nom, a_descriptif, a_prix, a_img, a_opt, a_qte) {
  this.id = a_id;
  this.nom = a_nom;
  this.descriptif = a_descriptif;
  this.prix = a_prix;
  this.img = a_img;
  this.opt = a_opt;
  this.qte = a_qte;
}
//
// Récupération des paramètres de l'url
// exemple récupération id produit et nom de
// https://AlainLoiodice_5_12042021/produit.html?_id=5be9cc611c9d440000c1421ename=Cross%20Table
// par propriété searchParams de l'interface URL qui retourne un objet
// URLSearchParams permettant d'accéder aux arguments décodés de la requête GET
// contenu dans l'URL ici _id et name
//
let params = new URL(document.location).searchParams;
let idproduit = params.get("_id");
let nomproduit = params.get("name");
//
// constitution de l'adresse url contenant en parametre l'id du produit
//
const url = "http://localhost:3000/api/furniture" + "/" + idproduit;
//
// constante section point ancrage dans le DOM du code qui sera généré <section id="ficheproduits">.......</section>
//
const section = document.getElementById("ficheproduits");
//
// On demande une connection à URL pour récupérer les données de l'API
// par appel de la fonction loadParamApi en lui passant en paramètre l'url de connection
// et le mode de connection "GET" ainsi que contactProduit à "" (coordonnées client + tableau des id produits du panier achat), utilisé par méthode POST et renseigne dans panier.js.
// Pour exploiter les résultats de la promesse on utilise la méthode "then" qui va gérer
// la réussite de l'appel et la méthode catch pour gérer l'échec.
//
loadParamApi(url, getpost, contactProduit)
  .then((reponse) => {
    //
    // On reçoit une réponse
    // La méthode JSON.parse() analyse une chaîne de caractères JSON et construit
    // la valeur JavaScript ou l'objet décrit par cette chaîne.
    // on met la reponse parse dans selectproduit et on traite la réponse
    //
    let selectproduit = JSON.parse(reponse);

    //
    // Si présence d'un article dans la local storage
    //
    //
    // Mise a jour indication panier dans entete page index affichage de " panier vide" ou de "achats à valider"
    //
    MajLibPanier();
    //
    // On génère dans le DOM le code suivant
    //
    // <div class="card w-75 mx-auto mt-5">  (card boostrap)  (width 75% de son parent)  (marge mx-auto permet de centrer horizontalement) (mt-5 margin top 5 )
    //   <div class="row no-gutters">        (création d'une ligne row sans goutières)
    //     <div class="col-md-5">            (création d'une colonne md-5 de largeur 5 sur 12 colonnes possibles pour les écrans Médium dont la largeur est >= 768px )
    //       <img src="http://localhost:3000/images/oak_1.jpg" class="card-img-top h-100">  (ajout d'une image placée image en haut de la carte image avec height 100% )
    //     </div>
    //     <div class="col-md-7">            (création d'une colonne md-7 de largeur 7 sur 12 colonnes possibles pour les écrans Médium dont la largeur est >= 768px )
    //                                       l'affichage des 12 colonnes 5+7 se faira sur une ligne à partir écran de 768px sinon col5 sera sur une ligne et col7 sur une autre ligne
    //        <div class="card-body">        création du corps de la card
    //            <h5 class="card-title">CrossTable</h5>    (création du titre de la carte)
    //            <p class="card-text">
    //                 "Lorem ipsum dolor sit amet, consectetur....."
    //            </p>
    //            <p class="card-text">Prix : 599€</p>
    //            <form>
    //              <label for="optionform" class="mr-2">Choisir une option : </label>         (mr margin right)
    //              <select name="optionform" id="optionform" size="1">
    //                 <option>Tan</option>
    //                 <option>Chocolate</option>
    //                 <option>Black</option>
    //                 <option>White</option>
    //              </select>
    //            </form>
    //            <form>
    //              <label for="optionqte" class="mr-2">Choisir une quantité : </label>
    //              <select name="optionqte" id="optionqte" size="1">   (size="1" affiche une fenetre avec un attribut et selection des autres attributs en appuyant sur la fleche de selection)
    //                 <option>1</option>
    //                 <option>2</option>
    //                 <option>3</option>
    //                 <option>4</option>
    //                 <option>5</option>
    //                 <option>6</option>
    //                 <option>7</option>
    //                 <option>8</option>
    //                 <option>9</option>
    //              </select>
    //            </form>
    //            <button type="button" class="mt-5 btn btn-primary" id="BtnClick">Ajouter au panier</button>
    //        </div>
    //     </div>
    //   <div
    // </div>
    //
    // La creation des ligne de code à intégrer dans la dom suit le process suivant
    // Création du noeud
    // Ajout s'il y en a des listes de class
    // Ajout s'il y en a des id, des attributs, du texte etc..
    // Puis ajout du noeud enfant créée au noeud parent
    //
    // <div class="card w-75 mx-auto mt-5"></div>
    //
    let divcard = createNode("div");
    divcard.classList.add("card", "w-75", "mx-auto", "mt-5");
    append(section, divcard);
    //
    // <div class="row no-gutters"></div>
    //
    let divrow = createNode("div");
    divrow.classList.add("row", "no-gutters");
    append(divcard, divrow);
    //
    // <div class="col-md-5"></div>
    //
    let divcol5 = createNode("div");
    divcol5.classList.add("col-md-5");
    append(divrow, divcol5);
    //
    // <img src="http://localhost:3000/images/oak_2.jpg" class="card-img-top h-100">
    //
    let image = createNode("img");
    let _img = selectproduit.imageUrl;
    image.src = selectproduit.imageUrl;
    image.classList.add("card-img-top", "h-100");
    append(divcol5, image);
    //
    // <div class="col-md7"></div>
    //
    let divcol7 = createNode("div");
    divcol7.classList.add("col-md-7");
    append(divrow, divcol7);
    //
    // <div class="card-body"></div>
    //
    let divcardbody = createNode("div");
    divcardbody.classList.add("card-body");
    append(divcol7, divcardbody);
    //
    // recuperatio id produit
    //
    let _id = selectproduit._id;
    let h5cardtitle = createNode("h5");
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
    let pcardtexte = createNode("p");
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
    let pcardprix = createNode("p");
    pcardprix.classList.add("card-text");
    pcardprix.textContent += "Prix : " + prix + "€";
    append(divcardbody, pcardprix);
    //
    // Traitment de la liste d'option
    //
    let listprodopt = selectproduit.varnish;
    //
    // boucle de parcour de la table listprodopt (contient la liste des options disponible pour le produit)
    // pour chaque élement et création de la liste des options <option>Nom option</option>
    // avec un traitement particulier sur la premier élement, création de la structure form, label, select
    //
    for (var i = 0; i < listprodopt.length; i++) {
      if (premier) {
        //
        // <form></form>
        //
        let cardform = createNode("form");
        append(divcardbody, cardform);
        //
        // <label for="optionform" class="mr-2">Choisir une option : </label>
        //
        let cardlabel = createNode("label");
        cardlabel.htmlFor += "optionform";
        cardlabel.textContent = "Choisir une option : ";
        cardlabel.classList.add("mr-2");
        append(cardform, cardlabel);
        //
        // <select name="optionform" id="optionform" size="1"></select>
        //
        let cardselect = createNode("select");
        createcard = cardselect;
        cardselect.name += "optionform";
        cardselect.id += "optionform";
        cardselect.size += "1";
        append(cardform, cardselect);
        premier = false;
        //
        // sauvegarde de la premiere option (defaut)
        //
        liste = listprodopt[0];
      }
      //
      // Pour chaque option
      // <option>Nom option</option>
      //
      let cardoption = createNode("option");
      cardoption.textContent += listprodopt[i];
      append(createcard, cardoption);
    }
    //
    // si click sur selection couleur récupération de l'option choisie par défaut option = listprodopt[0]
    //
    let _opt;
    _opt = liste;
    document
      .getElementById("optionform")
      .addEventListener("click", function () {
        liste = document.getElementById("optionform");
        texte = liste.options[optionform.selectedIndex].text;
        _opt = texte;
      });
    //
    // creation de la liste de choix pour la qte produit possibilité de choisir une qte de 1 à 9, qte à 1 par défaut
    //
    //
    // <form></form>
    //
    let cardformqte = createNode("form");
    append(divcardbody, cardformqte);
    //
    // <label for="optionqte" class="mr-2">Choisir une quantité : </label>
    //
    let cardlabelqte = createNode("label");
    cardlabelqte.htmlFor += "optionqte";
    cardlabelqte.textContent = "Choisir une quantité : ";
    cardlabelqte.classList.add("mr-2");
    append(cardformqte, cardlabelqte);

    //
    // <select name="optionform" id="optionform" size="1"></select>
    //
    let cardselectqte = createNode("select");
    createcardqte = cardselectqte;
    cardselectqte.name += "optionqte";
    cardselectqte.id += "optionqte";
    cardselectqte.size += "1";
    append(cardformqte, cardselectqte);
    for (let pas = 0; pas < 9; pas++) {
      let cardoptionqte = createNode("option");
      cardoptionqte.textContent += pas + 1;
      append(createcardqte, cardoptionqte);
    }
    //
    // si click sur selection qte récupération de l'option choisie par défaut qte = 1
    //
    let _optqte;
    _optqte = 1;
    document.getElementById("optionqte").addEventListener("click", function () {
      listeqte = document.getElementById("optionqte");
      texteqte = listeqte.options[optionqte.selectedIndex].text;
      _optqte = texteqte;
      _optqte = parseInt(_optqte);
      //
      // Mise à jour de la qte dans la qte affichée dans la fenetre modale
      // dans le cas ou il y a un click sur l'otion qte de maniere à afficher
      // la bonne qte dans la fenetre (il faut donc réécrire la ligne suivant de DOM
      // <p id="ConfirmAjoutQte">Quantité à ajouter au panier :${_optqte}</p> pour
      // la nouvelle qte soit prise en compte. Nouveau contenu de la variable _optqte)
      //
      // On recupère le noeud parent <div class="modal-body" id="ConfirmProdQTe">
      //
      const ParentItemAModifier = document.getElementById("ConfirmProdQTe");
      //
      // On recupere dans EnfantItemAModifier le second enfant du noeud parent
      // <p id="ConfirmAjoutQte">Quantité à ajouter au panier :${_optqte}</p>
      //
      const EnfantItemAModifier = ParentItemAModifier.children[1];
      //
      // On creait un nouvel élément 'p' vide
      //
      const textNodeAModifier = document.createElement("p");
      //
      //  Dans cet élement que l'on vient de créait on ajoute le contenu du texte que l'on veut afficher
      //
      textNodeAModifier.textContent = `Quantité à ajouter au panier :${_optqte}`;
      //
      // On remplace le premier enfant du noeud parent par le nouvel élément créée
      //
      ParentItemAModifier.replaceChild(textNodeAModifier, EnfantItemAModifier);

      // PConfirmAjoutcardbtn.textContent+='Ajouter au panier';
    });
    //
    // Creation du bouton ajouter au panier
    // <button type="button" class="btn btn-primary" id="BtnClick">Ajouter au panier</button>
    //
    var cardbtn = createNode("button");
    cardbtn.type = "button";
    cardbtn.classList.add("mt-5", "btn", "btn-primary");
    cardbtn.id = "BtnClick";
    cardbtn.textContent += "Ajouter au panier";
    append(divcardbody, cardbtn);
    //
    // si click sur bouton ajouter au panier
    //
    document.getElementById("BtnClick").addEventListener("click", function () {
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
      //    Mise à jour du tableau storage_article pour l'index indice_article avec les données de l'article créé
      //    et enfin mise à jour de la localstorage
      //
      //
      if ("article" in localStorage) {
        var storage_article = new Array();
        var creation = true;
        storage_article = JSON.parse(localStorage.getItem("article"));
        indice_article = storage_article.length;

        for (var i = 0; i < indice_article; i++) {
          if (storage_article[i].id == _id) {
            storage_article[i].qte = storage_article[i].qte + _optqte;
            creation = false;
            localStorage.setItem("article", JSON.stringify(storage_article));
            break;
          }
        }

        if (creation) {
          newarticle = new const_article(
            _id,
            _nomprod,
            _decrprod,
            prix,
            _img,
            _opt,
            _optqte
          );
          storage_article[indice_article] = newarticle;
          localStorage.setItem("article", JSON.stringify(storage_article));
        }
        //
        // s'il n'y a pas de clé "article" dans le localStorage alors création de la clé avec comme index 0
        // creation de l'article newarticle par appel de la fonctionconst_article
        // mise à jour du tableau storage_article pour l'index 0 avec l'article que l'on vient de créer
        // mise à jour de la localStorage
        //
      } else {
        indice_article = 0;
        var storage_article = new Array();
        var newarticle = new const_article(
          _id,
          _nomprod,
          _decrprod,
          prix,
          _img,
          _opt,
          _optqte
        );
        storage_article[indice_article] = newarticle;
        localStorage.setItem("article", JSON.stringify(storage_article));
      }
      //
      // boite alerte standard remplacée par boite alertte personnalisée
      // alert("L'article a été ajouté")
      //
      // création d'une boite alerte customisée
      //
      var modalContainer = document.createElement("div");
      modalContainer.setAttribute("id", "modal-produitselect");

      var customBox = document.createElement("div");
      customBox.className = "custom-box-produitselect";
      //
      // Affichage boîte d'alerte
      //
      customBox.innerHTML = '<p>"L\'article à bien été ajouté au panier !"</p>';
      customBox.innerHTML +=
        '<button id="modal-close-produitselect">OK</button>';
      modalShow();

      function modalShow() {
        modalContainer.appendChild(customBox);
        document.body.appendChild(modalContainer);
        document
          .getElementById("modal-close-produitselect")
          .addEventListener("click", function () {
            modalClose();
          });
      }

      function modalClose() {
        while (modalContainer.hasChildNodes()) {
          modalContainer.removeChild(modalContainer.firstChild);
        }
        document.body.removeChild(modalContainer);
        //
        // ouvrir une URL
        // window.location.href permet une redirection de la page en cours vers l’URL précisée en paramètre
        // window.location.href="http://votre_url"
        // par exemple si vous souhaitez que la redirection se fasse lorsque l’utilisateur clique sur une image, faites ceci :
        // <img src='lien_vers_image' onClick=’window.location.href=”http://votre_url"'>
        //
        window.location.href = "index.html";
      }

      //
      // Si boite alerte standard le window.location se fait ici, alors que dans
      // boite alerte personnalisée le windows location se fait dans la fonctio modalClose
      //
      // window.location.href="index.html";
    });
  })
  .catch((erreur) => {
    // On traite l'erreur
    window.alert(
      "Bonjour, suite à un petit probleme de connexion, pouvez-vous raffaichir la fenêtre"
    );
    console.log("erreur : ", erreur);
  });
