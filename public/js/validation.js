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
// Initialisations
//
let nom = "";
let prenom = "";
let ville = "";
let adresse = "";
let email = "";
//
// Initialisation storage_contact qui contiendra "contact" de local storage
//
var storage_contact = new Array();
//
// mise à jour ou création de contact dans local storage avec les données du formulaire
//
if ("contact" in localStorage) {
  storage_contact = JSON.parse(localStorage.getItem("contact"));
  indice_contact = 0;
  nom = storage_contact[0].firstName;
  prenom = storage_contact[0].lastName;
  ville = storage_contact[0].city;
  adresse = storage_contact[0].address;
  email = storage_contact[0].email;
}
//
// Récupération dans la local storage du numéro de cde généré par l'API
//
//
numValidCde = "";
if ("numeroCde" in localStorage) {
  var numValidCde = JSON.parse(localStorage.getItem("numeroCde"));
}
//
// Ajout directement dans le code HTML du contenu de la constante remerciement
// Remarque le caractere ` s'obtient en tapant ALTGR + 7 + espace
//
const positionRemerciement = document.getElementById("lvalidcde");
const structure = `
<div class="row">
    <div class="col-md">
        <div class="w-95P mx-auto">
            <h2>${nom}\u0020${prenom}</h2>
            <h4>Votre commande référence :\u0020<b>${numValidCde}</b>\u0020est en préparation</h4>
            <p>Dès qu'elle sera prette a être expédié à l'adresse suivante</p>
            <p><b>${ville}\u0020,\u0020${adresse}</b></p>
            <p>un e-mail vous sera envoyé à <b>${email}</b></p>
            <h2>Récapitulatif de votre commande</h2>
        </div>
    </div>
</div>
`;
//positionRemerciement.innerHTML = structure;
positionRemerciement.insertAdjacentHTML("afterbegin", structure); //
//
// Récupération de la local storage et affichage du panier
//
const section = document.getElementById("lrecapcde");
let nbart = 0;
let mtcde = 0;

var storage_article = new Array();
storage_article = JSON.parse(localStorage.getItem("article"));
//
// Pour chaque article dans le panier
//

for (var i = 0; i < storage_article.length; i++) {
  //
  // <div class="card w-95P mx-auto mt-5 bord-arrondi"></div>   // css class .bord-arrondi border: solid 2px #343a40; border-radius: 20px; box-shadow: 1px 1.5px #e0e0e0;
  //
  let divcard = createNode("div");
  divcard.classList.add("card", "w-95P", "mx-auto", "mt-5", "bord-arrondi");
  append(section, divcard);
  //
  // <div class="row no-gutters"></div>
  //
  let divrow = createNode("div");
  divrow.classList.add("row", "no-gutters");
  append(divcard, divrow);
  //
  // <div class="col-md-5 hauteur-div"></div>  // css class .hauteur-div => height: 390px; border-top-left-radius: 20px; border-bottom-left-radius: 20px;
  //
  let divcol5 = createNode("div");
  divcol5.classList.add("col-md-5", "hauteur-div");
  append(divrow, divcol5);
  //
  // <img src="http://localhost:3000/images/oak_1.jpg" class="card-img-top h-100 img-cover"></img> //  css class .img-cover => object-fit:cover;
  //
  let image = createNode("img");
  image.src = storage_article[i].img;
  image.classList.add("card-img-top", "h-100", "img-cover", "img-bord-arrondi");
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

  // let h5cardtitle = createNode("h5");
  // h5cardtitle.classList.add("card-title");
  // h5cardtitle.textContent += _id;
  // append(divcardbody, h5cardtitle);

  let _nomprod = storage_article[i].nom;
  let h5cardtitle = createNode("h5");
  h5cardtitle.classList.add("card-title");
  h5cardtitle.textContent += _nomprod;
  append(divcardbody, h5cardtitle);
  //
  // <p class="card-title">selectproduit.name</p>
  //
  // let pcardnom = createNode("p");
  // let _nomprod = storage_article[i].nom;
  // pcardnom.classList.add("card-title");
  // pcardnom.textContent += _nomprod;
  // append(divcardbody, pcardnom);
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
  nbart = nbart + qte;
  let pcardqte = createNode("p");
  pcardqte.classList.add("card-text");
  pcardqte.textContent += "Qte : " + qte;
  append(divcardbody, pcardqte);
  //
  // Mise à jour montant cde = prix * qte
  //
  mtcde = mtcde + prix * qte;
}
//
// Ajout directement dans le code HTML des infos qte globale et prix total
// Remarque le caractere ` s'obtient en tapant ALTGR + 7 + espace
//
const positionPrixQte = document.getElementById("lqteprix");
const structure2 = `
<div class="row">
    <div class="col-md mt-5">
        <div class="w-95P mx-auto">
            <h2>Le montant de votre commande s'élève à\u0020${mtcde}€</h2>
            <h4>Vous avez acheté\u0020${nbart}\u0020article(s)</h4>
        </div>
    </div>
</div>
`;
//
//positionPrixQte.innerHTML = structure2;
//
positionPrixQte.insertAdjacentHTML("afterbegin", structure2); //
//
// supression de la cle dans le local storage
//
localStorage.removeItem("article");
//
//
