// Fonction de creation de noeud
// parametre de la fonction element qui correspond au noeud du DOM à créer
//
// L'instruction return met fin à l'execution d'une fonction et définit une valeur à renvoyer
// à la fonction appelante
// syntaxe : return [[expression]]; 
//
// document.createElement : dans un document HTML, la méthode document.createElement() 
// crée un élément HTML du type spécifié par tagName ou un HTMLUnknownElement si tagName n’est pas reconnu
// si tagName n’est pas reconnu
// Syntaxe var element = document.createElement(tagName[, options]);
//
function createNode(element) {
    return document.createElement(element);
}
//
// La méthode Node.appendChild() ajoute un nœud à la fin de la liste des enfants d'un nœud parent
// spécifié. Si l'enfant donné est une référence à un nœud existant dans le document, appendChild() le
// déplace  de sa position actuelle vers une nouvelle position (il n'est pas nécessaire de supprimer le noeud
// sur son noeud parent avant de l'ajouter à un autre)
// Cela signifie qu'un noeud ne peut pas être à deux points du document simultanément.
// Syntaxe var elementAjoute = element.appendChild(enfant);
// 
function append(parent, el) {
  return parent.appendChild(el);
}
//
// La méthode getElementById() de Document renvoie un objet  Element représentant l'élément dont la
// propriété  id correspond à la chaîne de caractères spécifiée. 
// Étant donné que les ID d'élément doivent être uniques, s'ils sont spécifiés, 
// ils constituent un moyen utile d'accéder rapidement à un élément spécifique.
// syntaxe : var element = document.getElementById(id);
//
const url = 'http://localhost:3000/api/furniture';
const section = document.getElementById('lproduits');
//
// XMLHttpRequest() crée une nouvelle instance XMLHttpRequest.
// syntaxe : const request = new XMLHttpRequest();
// Les objets XMLHttpRequest (XHR) permettent d'interagir avec des serveurs. 

var request = new XMLHttpRequest();
//
// XMLHttpRequest.onreadystatechange
// syntaxe : XMLHttpRequest.onreadystatechange = callback;
// 
// readyState contient le statut de XMLHttpRequest
//
// onreadystatechange propriété qui définit une fonction a exécuter lorsque le statut de XMLHttpRequest change
// (readyState 0 UNSENT :requete non initialisée, 1 OPENED :connection serveur établie 2 HEADER_RECEIVED :requète receptionnée 
// 3 LOADING :traitement requete   4 DONE :requète terminée 
// et reponse prette)
//
// status contient le statut de l'objet XMLHttpRequest ( 200 : OK ,  403 : interdit , 404 : page non trouvee ..)
//
//
request.onreadystatechange = function() {
//
// si la requete est terminée et le status OK alors on traite la reponse de la requete
// la reponse en format JSON est analysee et traduite en valeur JAVASCRIPT
// on recupere le resultat en format JS dans la variable listproduits (table contenant les différents objets 
// chaque objet contient "description" imageUrl" "name" "price" "varnish" varnish est une table qui contient les differents type de bois)
//
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        let listproduits = response;
        //
        // methode map() pour chaque indice du tableau listproduit, execution de la fonction avec en parametre le contenu indicé du tableau
        // produit.name produit.imageUrl produit.price ...
        // 
        
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
              image.classList.add("card-img-top", "h-100");
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
              alien.href = appelclick;
              alien.classList.add("btn", "btn-primary", "stretched-link", "btnlienart");
              alien.textContent += "Lien vers...."; 
              append(divcardbody, alien);
            })
        }             
    };

// On ouvre une nouvelle requete avec en paramètre la methode GET et l'url de la requete
// XMLHttpRequest.open(method, url, async)  async (facultatif. Un booléen optionnel par défaut à true, indique s'il faut
// ou pas traiter la requete en asynchrone. Si la valeur est à false, la méthode send() ne retourne rien tant qu'elle n'a pas
// reçu la réponse.)
// Lorsque qu'il y a changement de statut de la requette execution de la fonction callback ici fonction callback anonyme ()
// qui teste si l'état de la requete est à DONE requete terminée et le status à 200 requete OK 
// si c'est le cas 
//    
request.open("GET", url);
//
// la méthode XMLHttpRequest send() envoie la requête au serveur.
// Si la requête est asynchrone (elle l'est par défaut), la méthode envoie un retour dés que la requête est partie 
// et le résultat est intégré en utilisant les évènements.
// En cas de requête synchrone, elle ne renvoie rien tant que la réponse n'est pas retournée.
//
request.send();


// version avec utilisation de Fetch
//
// fetch(url)
// .then((resp) => resp.json())
// .then(function(data) {
//   let listproduits = data;
//   console.log(data);
//   console.log(data[0].name);
//   console.log(listproduits); 
//   return listproduits.map(function(produit) {
//     let divcard = createNode('div');
//     divcard.classList.add("card","w-75","mx-auto","mt-5"); 
//     append(section, divcard); 
//     let divrow = createNode('div');
//     divrow.classList.add("row", "no-gutters")
//     append(divcard, divrow)
//     let divcol5 = createNode('div')
//     divcol5.classList.add("col-md-5")
//     append(divrow, divcol5)
//     let image = createNode('img');  
//     image.src = produit.imageUrl;
//     image.classList.add("card-img-top", "h-100")
//     append(divcol5, image);    
//     let divcol7 = createNode('div')
//     divcol7.classList.add("col-md-7")
//     append(divrow, divcol7)
//     let divcardbody = createNode('div')
//     divcardbody.classList.add("card-body")
//     append(divcol7, divcardbody)
//     let h5cardtitle = createNode('h5')
//     h5cardtitle.classList.add("card-title")
//     h5cardtitle.textContent += produit.name
//     append(divcardbody, h5cardtitle)
//     let pcardtexte = createNode('p')
//     pcardtexte.classList.add("card-text")
//     pcardtexte.textContent += produit.description
//     append(divcardbody, pcardtexte)
//     let prix = parseFloat(produit.price);
//     console.log(prix)
//     prix = prix / 100
//     console.log(prix)
//     let alien = createNode('a')
//     alien.classList.add("btn", "btn-primary", "stretched-link")
//     alien.textContent += "Lien vers...." 
//     append(divcardbody, alien)
//     })

// })
// .catch(function(error) {
//   console.log(error);
// });


