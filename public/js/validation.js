//
// Récupération des paramètres de l'url
// exemple récupération id produit et nom de 
// file:///C:/op_projet5/AlainLoiodice_5_12042021/validation.html?idNom=Alain&idPrenom=Gilles&idville=38&idAdresse=rue+des+chiens+errants&idEmail=alaingilles%40wanadoo.fr&Valider=Envoyer
// par propriété searchParams de l'interface URL qui retourne un objet
// URLSearchParams permettant d'accéder aux arguments décodés de la requête GET
// contenu dans l'URL ici _id et name
//
let params = (new URL(document.location)).searchParams;
let nom = params.get('idNom');
let prenom = params.get('idPrenom');
let ville = params.get('idVille');
let adresse = params.get('idAdresse');
let email = params.get('idEmail');

//
// création de,la classe contact
//
class contact {
    constructor(_nom, _prenom, _adresse, _ville, _email) {
    this.firstName:_nom;
    this.lastName=_prenom;
    this.address=_adresse;
    this.city=_ville;
    this.email=_email;
    }
}
//
// creation de l'objet contact avec les paramètres récupérés dans l'url
//
let newcontact = new contact(nom,prenom,ville,adresse,email);
console.log(newcontact);

console.log("nom", nom);
console.log("prenom", prenom);
console.log("ville", ville);
console.log("adresse", adresse);
console.log("email", email);

//
// Ajout directement dans le code HTML du contenu de la constante remerciement
// Remarque le caractere ` s'obtient en tapant ALTGR + 7 + espace  
//
const positionRemerciement = document.getElementById('lvalidcde');
const structure = `
<div class="row">
    <div class="col-md">
        <div class="w-75 mx-auto">
            <h2>${nom}\u0020${prenom}</h2>
            <h4>Votre commande est en préparation</h4>
            <p>Dès qu'elle sera prette a être expédié à l'adresse suivante</p>
            <p><b>${ville}\u0020${adresse}</b></p>
            <p>un e-mail vous sera envoyé à <b>${email}</b></p>
            <h2>Récapitulatif de votre commande</h2>
        </div>
    </div>
</div>
`;
//positionRemerciement.innerHTML = structure;
positionRemerciement.insertAdjacentHTML('afterbegin',structure);//
//
// Récupération de la local storage et affichage du panier 
//
const section = document.getElementById('lrecapcde');
let nbart=0;
let mtcde=0;
console.log(section);





    var storage_article=new Array();
    storage_article=JSON.parse(localStorage.getItem('article'));
    console.log(storage_article);

    for (var i =0; i < storage_article.length; i++) {
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
        mtcde=mtcde+prix;
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
        nbart=nbart+qte;
        let pcardqte = createNode('p');
        pcardqte.classList.add("card-text");
        pcardqte.textContent += 'Qte : '+qte;
        append(divcardbody, pcardqte);
        
    }
    //
    // supression de la cle dans le local storage
    //
    //    localStorage.removeItem("article");
    //
    // 

}
//
// Ajout directement dans le code HTML des infos qte globale et prix total
// Remarque le caractere ` s'obtient en tapant ALTGR + 7 + espace  
//
const positionPrixQte = document.getElementById('lqteprix');
const structure2 = `
<div class="row">
    <div class="col-md mt-5">
        <div class="w-75 mx-auto">
            <h2>Le montant de votre commande s'élève à\u0020${mtcde}€</h2>
            <h4>Vous avez acheté\u0020${nbart}\u0020article(s)</h4>
        </div>
    </div>
</div>
`;
//positionPrixQte.innerHTML = structure2;
positionPrixQte.insertAdjacentHTML('afterbegin',structure2);//