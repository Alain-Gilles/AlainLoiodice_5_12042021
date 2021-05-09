let v_nom = "";
let v_prenom = "";
let v_adresse = "";
let v_ville = "";
let v_email = "";
//
// Création du tableau des cdes
//
var produitsCde = new Array();
//
// vérification saisie formulaire validation
//
function verification() {
  var name = document.forms["ValidForm"]["idNom"];
  var forname = document.forms["ValidForm"]["idPrenom"];
  var ville = document.forms["ValidForm"]["idVille"];
  var adresse = document.forms["ValidForm"]["idAdresse"];
  var email = document.forms["ValidForm"]["idEmail"];
  var result = true;

  if (name.value == "") {
    alert("votre nom est obligatoire");
    name.focus();
    result = false;
    return result;
  }

  if (forname.value == "") {
    alert("entrer votre prénom");
    forname.focus();
    result = false;
    return result;
  }

  if (adresse.value == "") {
    alert("il faut renseigner votre adresse");
    adresse.focus();
    result = false;
    return result;
  }

  if (ville.value == "") {
    alert("il faut renseigner la ville");
    ville.focus();
    result = false;
    return result;
  }

  if (email.value == "") {
    alert("Entrez une adresse email valide.");
    email.focus();
    result = false;
    return result;
  }
  //
  // La methode indexOf() renvoie l'indice de la première occurence de la valeur cherchée au sein de la
  // chaîne courante (à partir de indexDébut). Elle renvoie -1 si la valeur cherchée n'est pas trouvée.
  //
  if (email.value.indexOf("@", 0) < 0) {
    alert("Entrer une adresse email valide.");
    email.focus();
    result = false;
    return result;
  }

  if (email.value.indexOf(".", 0) < 0) {
    alert("Entrer une adresse email valide.");
    email.focus();
    result = false;
    return result;
  }

  if (!isEmail(email.value)) {
    alert("Entrer une adresse email valide.");
    email.focus();
    result = false;
    return result;
  }
  v_nom = name.value;
  v_prenom = forname.value;
  v_ville = ville.value;
  v_adresse = adresse.value;
  v_email = email.value;
  return result;
}

//
// fonction suppression d'un article
//
function supprPanier() {
  if ("article" in localStorage) {
    //
    // supression de la cle dans le local storage
    //
    localStorage.removeItem("article");
    //
    // supression des enfants de section id lpanier dans le code html (supression des cartes de produit affichées)
    //
    var element = document.getElementById("lpanier");
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
  //
  // appel de la fonction majpagehtml qui créera le code html pour afficher
  // le message Il n'y a pas d'articles dans le panier
  //
  majpagehtml();
}
//
// Ajout qte de une unite dans storage_article indice par svi , mise a jour de la local storage et reaffichage de la page location.reload
// En parametre id produit, nom, svi (indice de l'article selectionné dans le tableau), qte , et le tableau contenant le local storage article
//
function ajoutqte(id, nomprod, idbtn, i, qte, prix, svi, storage_article) {
  storage_article[svi].qte++;
  localStorage.setItem("article", JSON.stringify(storage_article));
  //
  // maj du prix du panier et du prix de la ligne (augmentation qte de 1 unité par clic)
  //
  prixpanier = prixpanier + prix;
  prixarticle = prixarticle + prix;
  qtepanier = qtepanier++;
  location.reload();
}
//
// Diminution qte de une unite dans storage_article indice par svi , mise a jour de la local storage et reaffichage de la page location.reload
// En parametre id produit, nom, svi (indice de l'article selectionné dans le tableau), qte , et le tableau contenant le local storage article
//
function supprqte(id, nomprod, idbtn, i, qte, prix, svi, storage_article) {
  if (qte == 1) {
    let confirmsuppr = false;
    //
    // création des éléments suivants dans les variables modalContainer et customBox juste avant </body>
    // <div id="modal">
    //    <div class="custom-box">
    //        <p>
    //           "Attention vous allez supprimer cet article du panier!"
    //           <br>
    //           " Si vous souhaitez confirmer la suppression appuyer sur Confirmer"
    //           <br
    //        </p>
    //        <button id="modal-confirm">Confirmer</button>
    //        <button id="modal-close">Annuler</button>
    //   </div>
    // </div>
    // ajout de code HTML dans customBox
    // appel de la fonction modalShow qui va gérer l'affichage et la réponse
    //
    var modalContainer = document.createElement("div");
    modalContainer.setAttribute("id", "modal");

    var customBox = document.createElement("div");
    customBox.className = "custom-box";

    customBox.innerHTML =
      "<p>Attention vous allez supprimer cet article du panier! <br> Si vous souhaitez confirmer la suppression appuyer sur Confirmer<br></p>";
    customBox.innerHTML += '<button id="modal-confirm">Confirmer</button>';
    customBox.innerHTML += '<button id="modal-close">Annuler</button>';
    modalShow(id, svi, storage_article, qte, prix);
  } else {
    //
    // Qte supérieure à 1 => faire -1 dans qte
    //
    storage_article[svi].qte--;
    localStorage.setItem("article", JSON.stringify(storage_article));
    //
    // maj du prix du panier et du prix de la ligne (diminution qte de 1 unité par clic)
    //
    prixpanier = prixpanier - prix;
    qtepanier--;
    prixarticle = prixarticle - prix;
    location.reload();
  }

  //////////////////////////////////////////////////////////////////////////////////
  //
  // traitement supression article si qte  = 1
  //
  // Ajout à la Dom HTML du contenu de customBox et de modalContainer
  // La méthode Node.appendChild() ajoute un noeud à la fin de la liste des enfants d'un noeud parent spécifié.
  // document.body.appendChild ajoute l'élément à la fin du corps du document
  //
  // Ajout d'une ecoute sur bouton Annuler id "modal-close" sur evenement click
  // si clik sur annuler on appelle la fonction modalClose qui va enlever du DOM le code html créée plus tôt
  //
  // Ajout d'une ecoute sur le bouton confirmer id modal-confirm sur evenement click
  // traitement de la suppression de l'article
  //
  function modalShow(id, svi, storage_article, qte, prix) {
    modalContainer.appendChild(customBox);
    document.body.appendChild(modalContainer);
    //
    // Si clic sur abandon
    //
    document
      .getElementById("modal-close")
      .addEventListener("click", function () {
        modalClose();
        confirmsuppr = false;
      });
    //
    // Si clic sur confirmation confirmation
    //
    if (document.getElementById("modal-confirm")) {
      document
        .getElementById("modal-confirm")
        .addEventListener("click", function () {
          //
          // Suppression de l'article
          //
          var storage_newarticle = new Array();
          var createNewArticle = false;
          var it = 0;
          confirmsuppr = true;

          //storage_article=JSON.parse(localStorage.getItem('article'));
          indice_article = storage_article.length;
          //
          // Plusieurs articles dans local storage dont l'article à supprimer car qte égal à 1 (soit 0 après avoir diminuer la qte de 1)
          //
          if (indice_article > 1) {
            //
            // on parcours le tableau storage_article de indice 0 jusqu'au dernier indice (storage_article.length)
            // si id du tableau est différent id de l'article dont on veut diminuer la qte alors on copie l'article dans
            // storage_article.
            // En fait on créait un nouveau tableau qui part de indice 0 et qui va contenir tous les articles présent dans
            // storage_article sauf l'article qui est égale à l'ID à supprimer.
            //
            for (var i = 0; i < indice_article; i++) {
              if (storage_article[i].id != id) {
                storage_newarticle[it] = storage_article[i];
                it++;
                createNewArticle = true;
              }
            }
            //
            // Si on a écrit au moins un article dans storage_newarticle, on supprime la cle article de la local storage
            // on recréait une clé article avec storage_newarticle
            //
            if (createNewArticle) {
              localStorage.removeItem("article");
              localStorage.setItem(
                "article",
                JSON.stringify(storage_newarticle)
              );
              //
              //  supression des enfants de section id lpanier dans le code html et appel de majpagehtml() pour recharger la page
              //
              var element = document.getElementById("lpanier");
              while (element.firstChild) {
                element.removeChild(element.firstChild);
              }
              //
              // On met a jour le montant du panier
              //
              //prixpanier = prixpanier - prix;
              //prixarticle = prixarticle - prix;
              prixpanier = 0;
              prixarticle = 0;
              qtepanier = 0;
              //
              majpagehtml();
            }
            //
            // un seul article dans storage_article
            //
          } else {
            //
            // Suppression du panier un seul article et qte egal à 1
            //
            supprPanier();
          }
          //
          //
          //
          console.log("Confirmé !");
          modalClose();
        });
    }
  }

  function modalClose() {
    while (modalContainer.hasChildNodes()) {
      modalContainer.removeChild(modalContainer.firstChild);
    }
    document.body.removeChild(modalContainer);
  }
}
//////////////////////////////////////////////////////////////////////////////////////
//
// Suppression de la carte Article si Bouton supprimer
//
function supprCartArt(id, nomprod, idbtn, i, qte, prix, svi, storage_article) {
  //
  // Appel de la fonction supprqte en lui passant en paramètre 1 comme qte de l'article qui doit-etre supprimé
  // de cette façon la fonction supprqte considèrera que quelque soit la quantité réelle de l'article devant être supprimé
  // cette qte devra être traitée comme si elle était égale à 1 ce qui implique création et envoi de la fenètre modale de confirmation
  // si confirmation s'il y a plusieurs articles présents dans la page panier suppression de l'article à supprimer et réaffichage de la page
  // voir traitement dans fonction supprqte, sinon suppression de la clé article dans la locale storage (suppression du panier par appel de la fonction
  // supprPanier())
  //
  let qteforce = 1;
  supprqte(id, nomprod, idbtn, i, qteforce, prix, svi, storage_article);
}

const section = document.getElementById("lpanier");

//
// Si clic sur le bouton suppression du panier
// vérificaction qu'il y a une cle article dans la local storage
// si c'est le cas on supprime la clé
// et on supprime le contenu de la page html compris entre les balises <section id=lpanier></section>
// Suppression de tous les enfants d'un élément en loccurence tous les enfants de section lpanier
// Dans tous les cas appel de la fonction majpagehtml qui créera le code html pour afficher
// le message Il n'y a pas d'articles dans le panier
//
document.getElementById("razbtn").addEventListener("click", function () {
  supprPanier();
  //if ("article" in localStorage) {
  //
  // supression de la cle dans le local storage
  //
  //localStorage.removeItem("article");
  //
  // supression des enfants de section id lpanier dans le code html (supression des cartes de produit affichées)
  //
  //var element = document.getElementById("lpanier");
  //while (element.firstChild) {
  //element.removeChild(element.firstChild);
  //}
  //}
  //
  // appel de la fonction majpagehtml qui créera le code html pour afficher
  // le message Il n'y a pas d'articles dans le panier
  //
  //majpagehtml()
});

function majpagehtml() {
  //
  // Test s'il y a une clé article dans la local storage
  //
  // Si c'est le cas on creait une nouveau tableau vide dans storage_article
  // et ce tableau est rempli avec le contenu du tableau article de la local storage (ce contenu est transformé en code JS
  // grace à la fonction JSON.parse)
  //
  // Ensuite on fait une boucle de lecture du tableau localStorage (la valeur de l'indice du tableau est récupérée par
  // storage_article.length)
  // Pour chaque élément on créait les élement html dans le DOM en utilisant les fonctions createNode et append
  //
  //
  // Remise à zéro du tableau des produits commandés produitsCde
  //
  produitsCde.length = 0;
  //
  if ("article" in localStorage) {
    var storage_article = new Array();
    storage_article = JSON.parse(localStorage.getItem("article"));

    for (var i = 0; i < storage_article.length; i++) {
      //
      // <div class="card w-75 mx-auto mt-5"></div>
      //
      let svindice = i;
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
      image.src = storage_article[i].img;
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
      // recuperation id produit
      //
      let _id = storage_article[i].id;
      let h5cardtitle = createNode("h5");
      h5cardtitle.classList.add("card-title");
      h5cardtitle.textContent += _id;
      append(divcardbody, h5cardtitle);
      //
      // <p class="card-title">selectproduit.name</p>
      //
      let pcardnom = createNode("p");
      let _nomprod = storage_article[i].nom;
      pcardnom.classList.add("card-title");
      pcardnom.textContent += _nomprod;
      append(divcardbody, pcardnom);
      //
      // <p class="card-text">"Lorem ipsum dolor sit amet,...."</p>
      //
      let _descrprod = storage_article[i].descriptif;
      let pcardtexte = createNode("p");
      pcardtexte.classList.add("card-text");
      pcardtexte.textContent += _descrprod;
      append(divcardbody, pcardtexte);
      //
      // Recuperation prix produit
      //
      let prix = parseFloat(storage_article[i].prix);
      //
      // <p class="card-text">Prix : prix</p>
      //
      let pcardprix = createNode("p");
      pcardprix.classList.add("card-text");
      pcardprix.textContent += "Prix : " + prix + "€";
      append(divcardbody, pcardprix);
      //
      // <p class="card-text">Qte : qte</p>
      //
      let qte = parseFloat(storage_article[i].qte);
      let pcardqte = createNode("p");
      pcardqte.classList.add("card-text");
      pcardqte.textContent += "Qte : " + qte;
      append(divcardbody, pcardqte);
      //
      // Boutons augmenter la quantité, diminuer la quantité et supprimer
      //
      // Augmenter la qte de 1
      // <button type="button" class="btn btn-primary" id="btnAjoutQte+ID"><span>+</span></button>
      // id="btnAjoutQte+ID"  concaténation de btnAjoutQte + _id produit de façon à rendre l'id unique
      //
      const btnAjoutQP = createNode("button");
      btnAjoutQP.classList.add("btn", "btn-primary");
      let idBtn = "btnAjoutQte" + _id;
      //btnAjoutQP.id='btnAjoutQte';//
      btnAjoutQP.id = idBtn;
      append(divcardbody, btnAjoutQP);
      const btnAjoutQPSpan = createNode("span");
      btnAjoutQPSpan.textContent += "+";
      append(btnAjoutQP, btnAjoutQPSpan);
      //
      // detection du clic sur "+" => ajouter 1 dans qte
      // appel fonction ajoutqte avec parametre id, nomprod, #id html, svindice sauv de indice de parcours du tableau des storage_article
      // tableau storage_article
      //
      document.getElementById(idBtn).addEventListener("click", function () {
        ajoutqte(_id, _nomprod, idBtn, i, qte, prix, svindice, storage_article);
      });
      //
      // Diminuer la qte de 1
      // <button type="button" class="btn btn-primary ml-2" id="btnMoinsQte+ID"><span>-</span></button>
      //
      const btnMoinsQP = createNode("button");
      btnMoinsQP.classList.add("btn", "btn-primary", "ml-2");
      idBtn = "btnMoinsQte" + _id;
      //btnMoinsQP.id='btnMoinsQte';//
      btnMoinsQP.id = idBtn;
      append(divcardbody, btnMoinsQP);
      const btnMoinsQPSpan = createNode("span");
      btnMoinsQPSpan.textContent += "-";
      append(btnMoinsQP, btnMoinsQPSpan);
      //
      // detection du clic sur "-" => enlever 1 dans qte
      // appel fonction supprqte avec parametre id, nomprod, #id html, svindice sauv de indice de parcours du tableau des storage_article
      // tableau storage_article
      //
      document.getElementById(idBtn).addEventListener("click", function () {
        supprqte(_id, _nomprod, idBtn, i, qte, prix, svindice, storage_article);
      });
      //
      // Supprimer l'article du panier
      // <button type="button" class="btn btn-danger ml-2" id="btnSupprQte+ID"><span>Supprimer</span></button>
      //
      const btnSupprQP = createNode("button");
      btnSupprQP.classList.add("btn", "btn-danger", "ml-2");
      idBtn = "btnSupprQte" + _id;
      //btnSupprQP.id='btnSupprQte';
      btnSupprQP.id = idBtn;
      append(divcardbody, btnSupprQP);
      const btnSupprQPSpan = createNode("span");
      btnSupprQPSpan.textContent += "Supprimer";
      append(btnSupprQP, btnSupprQPSpan);
      //
      // Detection du clic sur Supprimer = > envoi confirmation si ok suppression article
      //
      document.getElementById(idBtn).addEventListener("click", function () {
        supprCartArt(
          _id,
          _nomprod,
          idBtn,
          i,
          qte,
          prix,
          svindice,
          storage_article
        );
      });

      //
      // On affiche le bouton vider le panier on supprime la classe d-none et on ajoute la classe d-flex dans le div
      // <div id="BtnVidePanier" class="d-flex justify-content-center mt-5 mb-5">
      //
      let PositDivBtnPanier = document.getElementById("BtnVidePanier");
      PositDivBtnPanier.classList.remove("d-none");
      PositDivBtnPanier.classList.add("d-flex");
      //
      // On fait apparaitre le formumaire
      //
      // let PositFormulaire = document.getElementById("coordonnees");
      // PositFormulaire.classList.remove("d-none");
      // PositFormulaire.classList.add("d-block");
      //
      // Affichage prix total de l'article = Qte * Prix unitaire
      //
      prixarticle = qte * prix;
      let h5cardprixarticle = createNode("h5");
      h5cardprixarticle.classList.add("card-title", "mt-5");
      // \u0020 represente un caractère " "
      h5cardprixarticle.textContent +=
        "Prix ligne article :\u0020" + prixarticle + "€";
      append(divcardbody, h5cardprixarticle);
      //
      // prix du panier
      //
      prixpanier = prixpanier + prixarticle;
      qtepanier = qtepanier + qte;
      //
      // On créait la ligne Prix total du panier entre les balises <h5 id="prix-total-cde"></h5>
      //
      let MajPrixTotPanier = document.getElementById("prix-total-cde");
      MajPrixTotPanier.textContent =
        `Prix total du panier \u0020` + prixpanier + "€";
      MajPrixTotPanier.classList.remove("d-none");
      MajPrixTotPanier.classList.add("d-flex");
      let MajQteTotPanier = document.getElementById("qte-total-cde");
      MajQteTotPanier.textContent =
        `\u000A \u0020 Nombre articles :\u0020` + qtepanier;
      MajQteTotPanier.classList.remove("d-none");
      MajQteTotPanier.classList.add("d-flex");
      //
      // On fait apparaitre le formumaire
      //
      let PositFormulaire = document.getElementById("coordonnees");
      PositFormulaire.classList.remove("d-none");
      PositFormulaire.classList.add("d-block");
      //
      // On ajoute un event listener sur le bouton submit du formulaire
      //
      document
        .getElementById("btn-valid")
        .addEventListener("click", function () {
          let validOk = verification();

          if (validOk) {
            //
            // Création de la classe EnvoiDonnees
            //
            class EnvoiDonnees {
              constructor(envcontact, envidprod) {
                this.contact = envcontact;
                this.products = envidprod;
              }
            }
            //
            // création de la classe contact
            //
            class Contact {
              constructor(_nom, _prenom, _adresse, _ville, _email) {
                this.firstName = _nom;
                this.lastName = _prenom;
                this.address = _adresse;
                this.city = _ville;
                this.email = _email;
              }
            }
            //
            // Création d'un nouveau contact
            //
            let newcontact = new Contact(
              v_nom,
              v_prenom,
              v_adresse,
              v_ville,
              v_email
            );
            //
            // mise à jour ou création de contact dans local storage avec les données du formulaire
            //
            if ("contact" in localStorage) {
              var storage_contact = new Array();
              storage_contact = JSON.parse(localStorage.getItem("contact"));
              indice_contact = 0;
              storage_contact[indice_contact] = newcontact;
              //
              // Mise à jour de la local storage
              //
              localStorage.setItem("contact", JSON.stringify(storage_contact));
            } else {
              indice_contact = 0;
              storage_contact = new Array();
              storage_contact[indice_contact] = newcontact;
              localStorage.setItem("contact", JSON.stringify(storage_contact));
            }
            //
            // Mise à jour produit
            //
            // Boucle de lecture de la local storage avec cle article
            //
            if ("article" in localStorage) {
              var storage_article_cde = new Array();
              storage_article_cde = JSON.parse(localStorage.getItem("article"));

              for (var i = 0; i < storage_article_cde.length; i++) {
                produitsCde[i] = storage_article_cde[i].id.toString();
              }
              console.log("produitCde", produitsCde);
            }
            //
            // Mise à jour du serveur par methode POST en envoyant requete JSON contenant un objet de contact
            // newcontact et un tableau de produits ( id et qte ) produitCde
            // POST retourne l'objet contact, le tableau produits et order_id (string)
            //
            const url = "http://localhost:3000/api/furniture/order";
            let getpost = "POST";
            let newenvoidonnees = new EnvoiDonnees(newcontact, produitsCde);
            console.log(newenvoidonnees);
            console.log(newenvoidonnees.contact);
            console.log(newenvoidonnees.products);
            //
            // On demande une connection à URL pour envoyer dans le corps de la demande une requête JSON contenant un objet de contact
            // et un tableau de produits, l'API nous retourne l'objet contact, le tableau produits et order_id (string)
            // La connection sefait par appel de la fonction loadParamApi en lui passant en paramètre l'url de connection
            // et le mode de connection ("POST") et newenvoidonnees (objet contact + tableau des id de produits du panier).
            // Pour exploiter les résultats de la promesse on utilise la méthode "then" qui va gérer
            // la réussite de l'appel et la méthode catch pour gérer l'échec.
            //
            loadParamApi(url, getpost, newenvoidonnees)
              .then((reponse) => {
                //
                // On reçoit une réponse
                //
                // La réponse est l'objet contact, le tableau produits et order_id (string)
                let retourApi = JSON.parse(reponse);
                //
                console.log(retourApi);
                //
                // Creation local storage numero_cde avec order_id
                //
                console.log(retourApi.orderId);
                localStorage.setItem(
                  "numeroCde",
                  JSON.stringify(retourApi.orderId)
                );
                console.log(localStorage);
                //
                // liens vers page validation.html qui ira recuperer dans la loca storage le order_id et les infos du contact
                //
                // ouvrir une URL
                // window.location.href permet une redirection de la page en cours vers l’URL précisée en paramètre
                // window.location.href="http://votre_url"
                // par exemple si vous souhaitez que la redirection se fasse lorsque l’utilisateur clique sur une image, faites ceci :
                // <img src='lien_vers_image' onClick=’window.location.href=”http://votre_url"'>
                //
                window.location.href = "validation.html";
                //
              })
              .catch((erreur) => {
                // On traite l'erreur
                window.alert(
                  "Bonjour, suite à un petit probleme de connexion, pouvez-vous raffaichir la fenêtre"
                );
                console.log("erreur : ", erreur);
              });
          }
        });
    }
    //
    // Il n'y avait pas de cle article dans la local storage
    // on créait dans le dom html le message il n'y a pas d'articles dans le panier
    //
  } else {
    let carddiv = createNode("div");
    append(section, carddiv);
    let cardp = createNode("p");
    cardp.classList.add("text-center", "font-weight-bold", "text-warning");
    cardp.textContent += "Il n'y a pas d'articles dans le panier";
    append(carddiv, cardp);
    //
    // On cache le bouton vider le panier en supprimant la classe d-flex de la div
    // <div id="BtnVidePanier" class="d-flex justify-content-center mt-5 mb-5">
    // et en rajoutant la classe d-none ( pas affichage de la div)
    //
    PositDivBtnPanier = document.getElementById("BtnVidePanier");
    PositDivBtnPanier.classList.remove("d-flex");
    PositDivBtnPanier.classList.add("d-none");
    MajPrixTotPanier = document.getElementById("prix-total-cde");
    MajPrixTotPanier.textContent = `Prix total du panier \u0020` + 0 + "€";
    MajPrixTotPanier.classList.remove("d-flex");
    MajPrixTotPanier.classList.add("d-none");
    MajQteTotPanier = document.getElementById("qte-total-cde");
    MajQteTotPanier.textContent = `Nombre articles :\u0020` + 0;
    MajQteTotPanier.classList.remove("d-flex");
    MajQteTotPanier.classList.add("d-none");
    //
    // On cache le formumaire
    //
    PositFormulaire = document.getElementById("coordonnees");
    PositFormulaire.classList.remove("d-block");
    PositFormulaire.classList.add("d-none");
  }
  MajLibPanier();
}

//
//
// appel de la fonction pour mettre à jour le code html
// soit avec les cartes produits presentes dans la local storage
// soit avec le message Il n'y a pas d'articles dans le panier
//
var prixpanier = 0;
var prixarticle = 0;
var qtepanier = 0;
majpagehtml();
