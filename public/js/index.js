const url = "http://localhost:3000/api/furniture";
const section = document.getElementById("lproduits");
let getpost = "GET";
let contactProduit = "";

//
// On demande une connexion à URL pour récupérer les données de l'API
// par appel de la fonction loadParamApi en lui passant en paramètre l'url de connexion
// et le mode de connection ("GET") ainsi que le parametre contactProduit à "", parametre contenant le contact et les id produits du panier,
// contactproduit est utilisé par la methode post en validation (panier.js) pour mettre à jour l'API sur serveur et récupérer le numero de commande.
// Pour exploiter les résultats de la promesse on utilise la méthode "then" qui va gérer
// la réussite de l'appel et la méthode catch pour gérer l'échec.
//
loadParamApi(url, getpost, contactProduit)
  .then((reponse) => {
    //
    // On reçoit une réponse
    //
    // La réponse est un array contenant cinq éléments
    // 0: {varnish: Array(4), _id: "5be9cc611c9d440000c1421e", name: "Cross Table", price: 59900, description: "Lorem ipsum dolor ...", …}
    // 1: {varnish: Array(2), _id: "5beaadda1c9d440000a57d98", name: "Coffee Table", price: 89900, description: "Lorem ipsum dolor ...", …}
    // 2: {varnish: Array(3), _id: "5beaae361c9d440000a57d99", name: "Dining Table (extendable)", price: 109900, imageUrl: "http://localhost:3000/images/oak_3.jpg", …}
    // 3: {varnish: Array(2), _id: "5beaaf2e1c9d440000a57d9a", name: "Bench", price: 39900, description: "Lorem ipsum dolor sit amet, consectetur adipisicin…mpor ...", …}
    // 4: {varnish: Array(2), _id: "5beab2061c9d440000a57d9b", name: "Vintage Chair", price: 79900, description: "Lorem ipsum dolor sit amet, consectetur adipisicin….", …}
    //
    // Exemple détail élément 0
    // description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    // imageUrl: "http://localhost:3000/images/oak_1.jpg"
    // name: "Cross Table"
    // price: 59900
    // varnish: (4) ["Tan", "Chocolate", "Black", "White"]
    // _id: "5be9cc611c9d440000c1421e"
    //
    // La méthode JSON.parse() analyse une chaîne de caractères JSON et construit
    // la valeur JavaScript ou l'objet décrit par cette chaîne.
    // on met la reponse parse (tableau) dans listproduit et on traite la réponse
    //
    // Au lieu Au lieu d’itérer manuellement sur le tableau à l’aide d’une boucle,
    // vous pouvez simplement utiliser la méthode intégrée.Array.map().
    // On itère pour chaque élément du tableau (soit 5 fois)
    // A chaque itération on passe l'élément du tableau contenu dans listproduit  dans produit
    // on accede au contenu de chaque élément par produit._id ou produit.name ou produit.description
    // produit.price produit.imageUrl
    //
    let listproduits = JSON.parse(reponse);
    //
    return listproduits.map(function (produit) {
      //
      // <div class="card mx-auto mt-5 bord-arrondi" w-95P></div>   // css class .bord-arrondi border: solid 2px #343a40; border-radius: 20px; box-shadow: 1px 1.5px #e0e0e0; w-95P class width: 95%;
      // Parametrage du noeud à créer
      // Ajout des class sur le noeud
      // Ajout du noeud (div) à la fin de la liste des enfants sur le noeud parent (section)
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
      image.src = produit.imageUrl;
      image.classList.add(
        "card-img-top",
        "h-100",
        "img-cover",
        "img-bord-arrondi"
      );
      append(divcol5, image);
      //
      // <div class="col-md-7"></div>
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
      // recuperation de id produit (cle du produit)
      //
      let _id = produit._id;
      //
      // <h5 class="card-title">produit.name</h5>
      //
      let h5cardtitle = createNode("h5");
      h5cardtitle.classList.add("card-title");
      h5cardtitle.textContent += produit.name;
      append(divcardbody, h5cardtitle);
      //
      // <p class="card-test">"lorem ipsum dolor sit amet....."</p>
      //
      let pcardtexte = createNode("p");
      pcardtexte.classList.add("card-text");
      pcardtexte.textContent += produit.description;
      append(divcardbody, pcardtexte);
      //
      // prix du produit
      //
      let prix = parseFloat(produit.price);
      prix = prix / 100;
      // <a href="produit.html?idproduit=_id&name=nameproduit" class="btn btn-primary strtched-link btnlienart couleur-btn-1"></a>
      //
      // la classe strtched-link : sert à rendre clicable le bloc contenant le lien
      //
      // CSS class .couleur-btn-1 background-color: #8f5bfe; border: none;   couleur-btn-1:hover { background-color: #e58a0c; border: none; }
      //
      let alien = createNode("a");
      //
      // creation de l'adresse du lien incluant le passage de parametre dans l'url
      // chaque parametre est constitué d'un couple constitué d'un nom et d'une clé
      // apres adresse on rajoute un ? suivit des parametres
      // s'il y a plusieurs parametres il faut les séparer par &
      //
      let appelclick = "produit.html?_id=" + _id + "&" + "name=" + produit.name;
      alien.href = appelclick;
      alien.classList.add(
        "btn",
        "btn-primary",
        //
        // si on rajoute la classe stretched-link => la carte est clicable et non seulement le lien, en l'enlevant seul le lien devient clicable
        //"stretched-link",
        "btnlienart",
        "couleur-btn-1"
      );
      alien.textContent += "Détail";
      append(divcardbody, alien);
      //
      // Si présence d'un article dans la local storage
      //
      //
      // Mise a jour indication panier dans entete page index affichage de " panier vide" ou qte dans panier achat
      //
      MajLibPanier();
    });
    //
  })
  .catch((erreur) => {
    // On traite l'erreur
    console.log("erreur : ", erreur);
  });
