//
// definition des variables globales
// une variable globale est défini en début de script une variable locale est définit à l'interieur d'une fonction
// et n'est utilisable que dans la fonction
//
// premier variable boolene initialisée à true
//
let premier = true
let createcard
//
// Fonction de creation de noeud
//
function createNode(element) {
    return document.createElement(element);
}
//
// Ajout d'un enfant a parent
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
// contenu dans l'URL
//
let params = (new URL(document.location)).searchParams
let idproduit = params.get('_id')
let nomproduit = params.get('name')
console.log(idproduit)
console.log(nomproduit)
//
// constitution de l'adresse url contenant en parametre l'id du produit
//
const url = 'http://localhost:3000/api/furniture'+'/'+idproduit;
console.log(url)
const section = document.getElementById('ficheproduits');


var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        let selectproduit = response
        console.log(selectproduit)

            let divcard = createNode('div');
            divcard.classList.add("card","w-75","mx-auto","mt-5"); 
            append(section, divcard); 
            let divrow = createNode('div');
            divrow.classList.add("row", "no-gutters")
            append(divcard, divrow)
            let divcol5 = createNode('div')
            divcol5.classList.add("col-md-5")
            append(divrow, divcol5)
            let image = createNode('img');  
            image.src = selectproduit.imageUrl;
            image.classList.add("card-img-top", "h-100")
            append(divcol5, image);    
            let divcol7 = createNode('div')
            divcol7.classList.add("col-md-7")
            append(divrow, divcol7)
            let divcardbody = createNode('div')
            divcardbody.classList.add("card-body")
            append(divcol7, divcardbody)
            let _id = selectproduit._id
            console.log(_id)
            console.log(selectproduit.name)
            let h5cardtitle = createNode('h5')
            h5cardtitle.classList.add("card-title")
            h5cardtitle.textContent += selectproduit.name
            append(divcardbody, h5cardtitle)
            let pcardtexte = createNode('p')
            pcardtexte.classList.add("card-text")
            pcardtexte.textContent += selectproduit.description
            append(divcardbody, pcardtexte)
            let prix = parseFloat(selectproduit.price);
            prix = prix / 100
            let pcardprix = createNode('p')
            pcardprix.classList.add("card-text")
            pcardprix.textContent += 'Prix : '+prix+'€'
            append(divcardbody, pcardprix)
            let listprodopt = selectproduit.varnish
            console.log(listprodopt)
            return listprodopt.map(function(option) {
              if (premier) { 
                let cardform = createNode('form');
                append(divcardbody, cardform);
                let cardselect = createNode('select')
                createcard = cardselect
                console.log(createcard)
                cardselect.name += 'optionform'
                cardselect.size += '1'
                append(cardform, cardselect)
                premier = false
              }
              let cardoption = createNode('option')
              cardoption.textContent += option
              append(createcard, cardoption) 
            }
            )



    }
}
request.open("GET", url);
request.send();
