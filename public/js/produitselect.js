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
let params = (new URL(document.location)).searchParams;
let idproduit = params.get('_id');
let nomproduit = params.get('name');
console.log(idproduit);
console.log(nomproduit);
//
// constitution de l'adresse url contenant en parametre l'id du produit
//
const url = 'http://localhost:3000/api/furniture'+'/'+idproduit;
console.log(url);
const section = document.getElementById('ficheproduits');

//
//
var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        let selectproduit = response;
        console.log(selectproduit);
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
            console.log(_id);
            console.log(selectproduit.name);
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
            console.log(listprodopt);
            
            // return listprodopt.map(function(option) {
            //   if (premier) { 
            //     let cardform = createNode('form');
            //     append(divcardbody, cardform);
            //     let cardselect = createNode('select')
            //     createcard = cardselect
            //     console.log(createcard)
            //     cardselect.name += 'optionform'
            //     cardselect.size += '1'
            //     append(cardform, cardselect)
            //     premier = false
            //   }
            //   let cardoption = createNode('option')
            //   cardoption.textContent += option
            //   append(createcard, cardoption) 
            // }) 
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
                    console.log(createcard);
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
            // si click sur selection
            //
            let _opt;
            _opt=liste;
            document.getElementById("optionform").addEventListener("click", function() {
                liste=document.getElementById("optionform");
                texte=liste.options[optionform.selectedIndex].text;
                _opt=texte;
            });



            //
            // Creation du bouton ajouter au panier
            // <button id="btn-panier" type="submit" name="btn-panier" class="mt-5">Ajouter au panier</button>
            // <button id="btn-panier" class="mt-5">Ajouter au panier</button>
            //
            var cardbtn = createNode('button');
            cardbtn.id='btn-panier';
            //cardbtn.type='submit';
            cardbtn.name='btn-panier';
            cardbtn.textContent+='Ajouter au panier';
            cardbtn.classList.add("mt-5"); 
            append(divcardbody, cardbtn);
            //
            // si click sur bouton ajouter au panier
            //
            document.getElementById("btn-panier").addEventListener("click", function() {
                console.log('traitement panier');
                //
                // mise à jour de la local storage avec les données de la page
                //
                const prodselection= {
                    idart: _id,
                    nomart: _nomprod,
                    descart: _decrprod,
                    prixart: prix,
                    imgart: _img,
                    optart: _opt
                }
                console.log(prodselection);
                localStorage.setItem("article",JSON.stringify(prodselection));
              });
        }      
    }

request.open("GET", url);
request.send();

