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

const url = 'http://localhost:3000/api/furniture';
const section = document.getElementById('lproduits');
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
    // On reçoit une réponse
    //let listparam = JSON.parse(reponse)
    console.log('url :', url);
    console.info('url chargée !');
    console.log(reponse);
    console.log(JSON.parse(reponse));
    let listproduits = JSON.parse(reponse);
    console.log('listproduits',listproduits);
    ////////////////////////////////////////////
    ///////////////////////////////////////////
    return listproduits.map(function(produit) {
        //
        // <div class="card w-75 mx-auto mt-5"></div>
        // Parametrage du noeud à créer
        // Ajout des class sur le noeud
        // Ajout du noeud (div) à la fin de la liste des enfants sur le noeud parent (section)
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
        // <img src="http://localhost:3000/images/oak_1.jpg" class="card-img-top h-100"></img>
        //
        let image = createNode('img');  
        image.src = produit.imageUrl;
        //image.classList.add("card-img-top", "h-100");//
        image.classList.add("card-img-top","h-100");
        append(divcol5, image);    
        //
        // <div class="col-md-7"></div>
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
        // recuperation de id produit (cle du produit)
        //
        let _id = produit._id;
        //
        // <h5 class="card-title">produit.name</h5>
        //
        let h5cardtitle = createNode('h5');
        h5cardtitle.classList.add("card-title");
        h5cardtitle.textContent += produit.name;
        append(divcardbody, h5cardtitle);
        //
        // <p class="card-test">"lorem ipsum dolor sit amet....."</p>
        // 
        let pcardtexte = createNode('p');
        pcardtexte.classList.add("card-text");
        pcardtexte.textContent += produit.description;
        append(divcardbody, pcardtexte);
        //
        // prix du produit
        //
        let prix = parseFloat(produit.price);
        prix = prix / 100;
        //
        // <a href="produit.html?idproduit=_id&name=nameproduit" class="btn btn-primary strtched-link btnlienart"></a>
        //
        let alien = createNode('a');
        // creation de l'adresse du lien incluant le passge de parametre dans l'url 
        // chaque parametre est constitué d'un couple constitué d'un nom et d'une clé
        // apres adresse on rajoute un ? suivit des parametres
        // s'il y a plusieurs parametres il faut les séparer par &
        let appelclick = 'produit.html?_id='+_id+'&'+'name='+produit.name;
        console.log(appelclick);
        alien.href = appelclick;
        alien.classList.add("btn", "btn-primary", "stretched-link", "btnlienart");
        alien.textContent += "Lien vers...."; 
        append(divcardbody, alien);
      })

    //////////////////////////////////////////
    /////////////////////////////////////////



})
.catch(erreur => {
    // On traite l'erreur
    console.log('erreur : ',erreur);
})