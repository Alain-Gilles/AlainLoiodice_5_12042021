//
// fonction suppression d'un article
//
function supprPanier() {
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
};
//
// Ajout qte de une unite dans storage_article indice par svi , mise a jour de la local storage et reaffichage de la page location.reload
// En parametre id produit, nom, svi (indice de l'article selectionné dans le tableau), qte , et le tableau contenant le local storage article
//
function ajoutqte(id,nomprod,idbtn,i,qte,prix,svi,storage_article) {
    storage_article[svi].qte++;
    localStorage.setItem('article',JSON.stringify(storage_article));
    location.reload();
};
//
// Diminution qte de une unite dans storage_article indice par svi , mise a jour de la local storage et reaffichage de la page location.reload
// En parametre id produit, nom, svi (indice de l'article selectionné dans le tableau), qte , et le tableau contenant le local storage article
//
function supprqte(id,nomprod,idbtn,i,qte,prix,svi,storage_article) {
    
    if (qte == 1 ) {

        //
        // création des éléments suivants dans les variables modalContainer et customBox juste avant </body>
        // <div id="modal">
        //    <div class="custom-box">
        //        <p>
        //           "Attention vous allez supprimer cet article du panier!"
        //           <br>
        //           " Si vous souhaitez confirmer la suppression appuyer sur Confirmer"
        //           <br
        //        </p>
        //        <button id="modal-confirm">Confirmer</button>
        //        <button id="modal-close">Annuler</button>
        //   </div>
        // </div>
        // ajout de code HTML dans customBox
        // appel de la fonction modalShow qui va gérer l'affichage et la réponse
        //
        var modalContainer = document.createElement('div');
        modalContainer.setAttribute('id', 'modal');

        var customBox = document.createElement('div');
        customBox.className = 'custom-box'; 

        customBox.innerHTML = '<p>Attention vous allez supprimer cet article du panier! <br> Si vous souhaitez confirmer la suppression appuyer sur Confirmer<br></p>';
        customBox.innerHTML += '<button id="modal-confirm">Confirmer</button>';
        customBox.innerHTML += '<button id="modal-close">Annuler</button>';
        modalShow(id,svi,storage_article);

    } else {
        //
        // Qte supérieure à 1 => faire -1 dans qte
        //
        storage_article[svi].qte--;
        localStorage.setItem('article',JSON.stringify(storage_article));
        location.reload();
    }


    //////////////////////////////////////////////////////////////////////////////////
    //
    // traitement supression article si qte  = 1
    //
    // Ajout à la Dom HTML du contenu de customBox et de modalContainer
    // La méthode Node.appendChild() ajoute un noeud à la fin de la liste des enfants d'un noeud parent spécifié.
    // document.body.appendChild ajoute l'élément à la fin du corps du document
    //
    // Ajout d'une ecoute sur bouton Annuler id "modal-close" sur evenement click 
    // si clik sur annuler on appelle la fonction modalClose qui va enlever du DOM le code html créée plus tôt
    //
    // Ajout d'une ecoute sur le bouton confirmer id modal-confirm sur evenement click
    // traitement de la suppression de l'article
    //
    function modalShow(id,svi,storage_article) {
        modalContainer.appendChild(customBox);
        document.body.appendChild(modalContainer);
        //
        // Si clic sur abandon
        //
        document.getElementById('modal-close').addEventListener('click', function() {
            modalClose();
        });
        //
        // Si clic sur confirmation confirmation 
        //
        if (document.getElementById('modal-confirm')) {
            document.getElementById('modal-confirm').addEventListener('click', function () {
                console.log("id",id,"svi",svi,"storage_article",storage_article);
                // 
                // Suppression de l'article
                // 
                var storage_newarticle=new Array();
                var createNewArticle = false;
                var it=0;
                //storage_article=JSON.parse(localStorage.getItem('article'));
                indice_article=storage_article.length;
                //
                // Plusieurs articles dans local storage dont l'article à supprimer car qte égal à 1 (soit 0 après avoir diminuer la qte de 1)
                //
                if (indice_article>1) {
                    //
                    // on parcours le tableau storgae_article de indice 0 jusqu'au dernier indice (storage_article.length)
                    // si id du tableau est différent id de l'article dont on veut diminuer la qte alors on copie l'article dans 
                    // storage_article. 
                    // En fait on créait un nouveau tableau qui part de indice 0 et qui va contenir tous les articles présent dans
                    // storage_article sauf l'article qui est égale à l'ID à supprimer.
                    //
                     for (var i =0; i < indice_article; i++) {
                         if (storage_article[i].id != id) {
                             storage_newarticle[it] = storage_article[i];
                             it++;
                             createNewArticle = true;
                            }
                        }
                    //
                    // Si on a écrit au moins un article dans storage_newarticle, on supprime la cle article de la local storage
                    // on recréait une clé article avec storage_newarticle
                    //
                     if (createNewArticle) {
                        localStorage.removeItem("article");
                        localStorage.setItem("article",JSON.stringify(storage_newarticle)); 
                        //
                        //  supression des enfants de section id lpanier dans le code html et appel de majpagehtml() pour recharger la page
                        //
                        var element = document.getElementById("lpanier");
                        while (element.firstChild) {
                            element.removeChild(element.firstChild);
                        }
                        majpagehtml();
                        }
                 //
                 // un seul article dans storage_article
                 //
                } else {
                        //
                        // Suppression du panier un seul article et qte egal à 1
                        //
                        supprPanier()
                }
                //
                //
                // 
                console.log('Confirmé !');
                modalClose();
            })
        }  
    }

    function modalClose() {
        while (modalContainer.hasChildNodes()) {
            modalContainer.removeChild(modalContainer.firstChild);
        }
        document.body.removeChild(modalContainer);
    }
}
//////////////////////////////////////////////////////////////////////////////////////
//
// Suppression de la carte Article si Bouton supprimer  
//
function supprCartArt(id,nomprod,idbtn,i,qte,prix,svi,storage_article) {
    // 
    // Appel de la fonction supprqte en lui passant en paramètre 1 comme qte de l'article qui doit-etre supprimé
    // de cette façon la fonction supprqte considèrera que quelque soit la quantité réelle de l'article devant être supprimé
    // cette qte devra être traitée comme si elle était égale à 1 ce qui implique création et envoi de la fenètre modale de confirmation
    // si confirmation s'il y a plusieurs articles pésent dans la page panier suppression de l'article à supprimer et réaffichage de la page
    // voir traitement dans fonction supprqte, sinon suppression de la clé article dans la locale storage (suppression du panier par appel de la fonction 
    // supprPanier())
    //
    let qteforce = 1;
    console.log("qteforce",qteforce);
    supprqte(id,nomprod,idbtn,i,qteforce,prix,svi,storage_article);
}

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
    supprPanier();
    //if ("article" in localStorage) {
        //
        // supression de la cle dans le local storage
        //
         //localStorage.removeItem("article");
        //
        // supression des enfants de section id lpanier dans le code html (supression des cartes de produit affichées)
        //
        //var element = document.getElementById("lpanier");
            //while (element.firstChild) {
                //element.removeChild(element.firstChild);
            //}
    //}
    //
    // appel de la fonction majpagehtml qui créera le code html pour afficher
    // le message Il n'y a pas d'articles dans le panier
    //
    //majpagehtml()
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
            let svindice = i;
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
            // Boutons augmenter la quantité, diminuer la quantité et supprimer 
            //
            // Augmenter la qte de 1
            // <button type="button" class="btn btn-primary" id="btnAjoutQte+ID"><span>+</span></button>
            // id="btnAjoutQte+ID"  concaténation de btnAjoutQte + _id produit de façon à rendre l'id unique
            //
            const btnAjoutQP = createNode('button');
            btnAjoutQP.classList.add("btn","btn-primary");
            let idBtn ="btnAjoutQte"+_id;
            //btnAjoutQP.id='btnAjoutQte';//
            btnAjoutQP.id=idBtn;
            append(divcardbody, btnAjoutQP);
            const btnAjoutQPSpan = createNode('span');
            btnAjoutQPSpan.textContent += '+';
            append(btnAjoutQP,btnAjoutQPSpan);
            //
            // detection du clic sur "+" => ajouter 1 dans qte
            // appel fonction ajoutqte avec parametre id, nomprod, #id html, svindice sauv de indice de parcours du tableau des storage_article
            // tableau storage_article
            //
            document.getElementById(idBtn).addEventListener("click", function() {
                ajoutqte(_id,_nomprod,idBtn,i,qte,prix,svindice,storage_article);
            });
            //
            // Diminuer la qte de 1
            // <button type="button" class="btn btn-primary ml-2" id="btnMoinsQte+ID"><span>-</span></button>
            //
            const btnMoinsQP = createNode('button');
            btnMoinsQP.classList.add("btn","btn-primary","ml-2");
            idBtn = "btnMoinsQte"+_id;
            //btnMoinsQP.id='btnMoinsQte';//
            btnMoinsQP.id=idBtn;
            append(divcardbody, btnMoinsQP);
            const btnMoinsQPSpan = createNode('span');
            btnMoinsQPSpan.textContent += '-';
            append(btnMoinsQP,btnMoinsQPSpan);
            //
            // detection du clic sur "-" => enlever 1 dans qte
            // appel fonction supprqte avec parametre id, nomprod, #id html, svindice sauv de indice de parcours du tableau des storage_article
            // tableau storage_article
            //
            document.getElementById(idBtn).addEventListener("click", function() {
                supprqte(_id,_nomprod,idBtn,i,qte,prix,svindice,storage_article);
            });
            //
            // Supprimer l'article du panier
            // <button type="button" class="btn btn-danger ml-2" id="btnSupprQte+ID"><span>Supprimer</span></button>
            //
            const btnSupprQP = createNode('button');
            btnSupprQP.classList.add("btn","btn-danger","ml-2");
            idBtn = "btnSupprQte"+_id;
            //btnSupprQP.id='btnSupprQte';
            btnSupprQP.id=idBtn;
            append(divcardbody, btnSupprQP);
            const btnSupprQPSpan = createNode('span');
            btnSupprQPSpan.textContent += 'Supprimer';
            append(btnSupprQP,btnSupprQPSpan);
            //
            // Detection du clic sur Supprimer = > envoi confirmation si ok suppression article
            //
            document.getElementById(idBtn).addEventListener("click", function() {
                supprCartArt(_id,_nomprod,idBtn,i,qte,prix,svindice,storage_article);
            });

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