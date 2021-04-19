
function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

const section = document.getElementById('lpanier');

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
        while (element.parentNode) {
            this.nodeName.parentNode.removeChild(node);
        }
    }
});

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
        //
    }
} else {
    let carddiv = createNode('div');
    append(section, carddiv);
    let cardp = createNode('p');
    cardp.classList.add("text-center", "font-weight-bold", "text-warning");
    cardp.textContent += "Il n'y a pas d'articles dans le panier";
    append(carddiv, cardp);

   
}
