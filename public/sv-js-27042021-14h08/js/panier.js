
// function createNode(element) {
//     return document.createElement(element);
// }

// function append(parent, el) {
//     return parent.appendChild(el);
// }

const section = document.getElementById('lpanier');
//
// Si clic sur le bouton suppression du panier
// vérificaction qu'il y a une cle article dans la local storage
// si c'est le cas on supprime la clé
// et on supprime le contenu de la page html compris entre les balises <section id=lpanier></section>
// Suppression de tous les enfants d'un élément en loccurence tous les enfants de section lpanier
// Dans tous les cas appel de la fonction majpagehtml qui créera le code html pour afficher
// le message Il n'y a pas d'articles dans le panier
//
document.getElementById("razbtn").addEventListener("click", function() {    
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
    majpagehtml()
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
if ("article" in localStorage) {
    var storage_article=new Array();
    storage_article=JSON.parse(localStorage.getItem('article'));

    for (var i =0; i < storage_article.length; i++) {
        //
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
        image.src = storage_article[i].img;
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
        let _id = storage_article[i].id;
        let h5cardtitle = createNode('h5');
        h5cardtitle.classList.add("card-title");
        h5cardtitle.textContent += _id;
        append(divcardbody, h5cardtitle);
        //
        // <p class="card-title">selectproduit.name</p>
        //
        let pcardnom = createNode('p');
        let _nomprod = storage_article[i].nom;
        pcardnom.classList.add("card-title");
        pcardnom.textContent += _nomprod;
        append(divcardbody, pcardnom);
        //
        // <p class="card-text">"Lorem ipsum dolor sit amet,...."</p>
        //
        let _descrprod = storage_article[i].descriptif;
        let pcardtexte = createNode('p');
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
        let pcardprix = createNode('p');
        pcardprix.classList.add("card-text");
        pcardprix.textContent += 'Prix : '+prix+'€';
        append(divcardbody, pcardprix);
        //
        // <p class="card-text">Qte : qte</p>
        //
        let qte = parseFloat(storage_article[i].qte);
        let pcardqte = createNode('p');
        pcardqte.classList.add("card-text");
        pcardqte.textContent += 'Qte : '+qte;
        append(divcardbody, pcardqte);
        //
        // Boutons augmenter la quantité et diminuer la quantité
        //
        // <button type="button" class="btn btn-primary" id="btnAjoutQte"><span>+</span></button>
        //
        const btnAjoutQP = createNode('button');
        btnAjoutQP.classList.add("btn","btn-primary");
        btnAjoutQP.id='btnAjoutQte';
        append(divcardbody, btnAjoutQP);
        const btnAjoutQPSpan = createNode('span');
        btnAjoutQPSpan.textContent += '+';
        append(btnAjoutQP,btnAjoutQPSpan);
        //
        // <button type="button" class="btn btn-primary ml-2" id="btnMoinsQte"><span>-</span></button>
        //
        const btnAjoutQM = createNode('button');
        btnAjoutQM.classList.add("btn","btn-primary","ml-2");
        btnAjoutQM.id='btnMoinsQte';
        append(divcardbody, btnAjoutQM);
        const btnAjoutQMSpan = createNode('span');
        btnAjoutQMSpan.textContent += '-';
        append(btnAjoutQM,btnAjoutQMSpan);
        //
        // On affiche le bouton vider le panier on supprime la classe d-none et on ajoute la classe d-flex dans le div
        // <div id="BtnVidePanier" class="d-flex justify-content-center mt-5 mb-5">
        //
        let PositDivBtnPanier = document.getElementById("BtnVidePanier");
        PositDivBtnPanier.classList.remove("d-none");
        PositDivBtnPanier.classList.add("d-flex");
         
        //
    }
//
// Il n'y avait pas de cle article dans la local storage
// on créait dans le dom html le message il n'y a pas d'articles dans le panier
//    
} else {
    let carddiv = createNode('div');
    append(section, carddiv);
    let cardp = createNode('p');
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
     
   
}

}

//
//
// appel de la fonction pour mettre à jour le code html
// soit avec les cartes produits presentes dans la local storage
// soit avec le message Il n'y a pas d'articles dans le panier
//

majpagehtml()