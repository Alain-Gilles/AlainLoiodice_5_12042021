//*********************************************************************************************************/
// Test validité e-mail                                                                                   */
// La méthode test() vérifie s'il y a une correspondance entre un texte et une expression rationnelle.    */
// Elle retourne true en cas de succès et false dans le cas contraire.                                    */
//                                                                                                        */
// Le constructeur RegExp crée un objet expression rationnelle pour la reconnaissance                     */
// d'un modèle dans un texte.  (regx ou expression régulière)                                             */
// permet de vérifier le contenu d'une chaine de caractères                                               */
//
// définition de l'expression régulière d'une adresse email
//                                                                                                */
function isEmail(email) {
  var regEmail = new RegExp(
    "^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$",
    "i"
  );
  return regEmail.test(email);
}
//
//***********************************************************************************************************/
// Fonction de création d'un Noeud
// Dans un document HTML, la méthode document.createElement()
// crée un élément HTML du type spécifié par tagName ou un HTMLUnknownElement si tagName n’est pas reconnu
//**********************************************************************************************************/
//
function createNode(element) {
  return document.createElement(element);
}
//
//***********************************************************************************************************/
// Fonction d'ajout d'un noeud enfant à un noeud parent
// La méthode Node.appendChild() ajoute un nœud à la fin de la liste des enfants d'un nœud parent
// spécifié.
//***********************************************************************************************************/
//
function append(parent, el) {
  return parent.appendChild(el);
}
//
//*************************************************************************************************************************//
//                                                                                                                         //
// Mise a jour libelle panier dans entete avec A valider si présence de article dans local storage ou vide si pas article  //
// dans la local storage  fonction appele par index.js produitselect.js  panier.js                                         //
// Appelle la fonction globale  SomQteArt()                                                                                //
//                                                                                                                         //
//*************************************************************************************************************************//
//
function MajLibPanier() {
  //
  // Si présence d'un article dans la local storage
  //
  //
  // Mise a jour indication panier dans entete page index affichage de la quantité article dans le panier
  //
  // On recupère le noeud parent <li class="nav-link" id="EntBtn">
  //
  const ParentZm = document.getElementById("EntBtn");
  //
  // On recupere dans EnfantZM le second enfant du noeud parent
  // <p id="infoPanier">Panier</br>Vide</p>
  //
  const EnfantZm = ParentZm.children[1];
  //
  // On creait un nouvel élément 'p' vide
  //
  const textNodeAm = document.createElement("p");
  //
  if ("article" in localStorage) {
    //
    //  Dans cet élement que l'on vient de créait on ajoute le contenu du texte que l'on veut afficher
    //
    //textNodeAm.textContent += "A valider";/
    textNodeAm.textContent += `Qte :\u0020` + SomQteArt();
    textNodeAm.id = "infoPanier";
    //
    // On remplace le premier enfant du noeud parent par le nouvel élément créée
    //
    ParentZm.replaceChild(textNodeAm, EnfantZm);
  } else {
    //textNodeAm.textContent += "Vide";
    textNodeAm.textContent += "Qte : 0";
    textNodeAm.id = "infoPanier";
    //
    // On remplace le premier enfant du noeud parent par le nouvel élément créée
    //
    ParentZm.replaceChild(textNodeAm, EnfantZm);
  }
}
//
//
//***********************************************************************************/
// cette fonction effectue un appel Ajax vers une URL d'une API
// appel de la fonction en mode asynchrone
// En JavaScript, les opérations asynchrones sont placées dans des files d’attentes
// qui vont s’exécuter après que le fil d’exécution principal ou la tâche principale
// (le « main thread » en anglais) ait terminé ses opérations.
// Elles ne bloquent donc pas l’exécution du reste du code JavaScript.
//
// En parametre url de l'API et methode ( GET ou POST ), ainsi que contactProduit
// qui n'est utilisé que pour une requete en mode POST et contient les coordonnées du contact
// et la liste des id des articles du panier d'achat.
//
//***********************************************************************************/
async function loadParamApi(url, getpost, contactProduit) {
  //
  // var status = 200;
  //
  var status = 200;
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
    request.onreadystatechange = function () {
      //
      //Si le traitement est terminé
      //
      if (request.readyState == 4) {
        //
        // Si le traitement est un succès
        // status contient le statut de l'objet XMLHttpRequest ( 200 : OK ,  403 : interdit , 404 : page non trouvee ..)
        //
        //if (request.status == 200) {
        if (request.status == status) {
          //
          // On résous la promesse et on renvoie la réponse
          //
          //var reponse = JSON.parse(this.responseText);
          //console.log(reponse);
          resolve(request.responseText);
        } else {
          //
          // On résous la promesse et on envoie l'erreur
          //
          reject(request);
        }
      }
    };
    //
    // Si une erreur est survenue
    //
    request.onerror = function (error) {
      //
      // On résoud la promesse  et on renvoie l'erreur
      //
      reject(error);
    };
    //
    // La méthode open() de XMLHttpRequest instancie une nouvelle requête ou réinitialise une déjà existante.
    // XMLHttpRequest.open(method, url) ou XMLHttpRequest.open(method, url, async) ou XMLHttpRequest.open(method, url, async, user, password)
    //
    // La méthode  XMLHttpRequest send() envoie la requête au serveur.  Si la requête est asynchrone (elle l'est par défaut),
    // la méthode envoie un retour dès que la requête est partie et le résultat est intégré en utilisant les évènements.
    //
    //request.open("GET", url, true);
    if (getpost == "GET") {
      request.open("GET", url, true);
      request.send(null);
    } else {
      //request.open("POST", url, true);    true (mode asynchrone, false mode synchrone)
      status = 201;
      request.open("POST", url, true);
      //
      // Les deux types d'envoi les plus populaire sont l'envoi sous forme URL formatée : "Content-type", "application/x-www-form-urlencoded"
      // et l'envoi sous forme de données JSON "Content-Type", "application/json;charset=UTF-8"
      //
      // Définissez maintenant le type de contenu urlencoded en utilisant la méthode setRequestHeader pour des envois de chaine de caractères
      // comme par exemple request.send("username=minaki536&password=Ak5K#h@l-Q9");
      // request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      // ou  pour envoyer des données avec le type de contenu JSON:
      // request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      //
      // "application/application/json;charset=UTF-8"
      //
      request.setRequestHeader("Content-Type", "application/json");

      //  Contact produit contient un objet contact (nom, prenom, adresse, ville, email) + un taleau des id des produits commandés dans le panier
      request.send(JSON.stringify(contactProduit)); //
    }
  });
}
//********************************************************//
//                                                        //
// Somme des quantités article dans local storage         //
// Fonction appelée par fonction globale MajLibPanier     //
//                                                        //
//********************************************************//
//
function SomQteArt() {
  let qteLocalStorage = 0;

  if ("article" in localStorage) {
    var storage_article = new Array();
    storage_article = JSON.parse(localStorage.getItem("article"));

    for (var i = 0; i < storage_article.length; i++) {
      qteLocalStorage = qteLocalStorage + storage_article[i].qte;
    }
  }
  return qteLocalStorage;
}
//
//
//
