function const_article(a_id,a_nom,a_qte,a_couleur) {
    this.id=a_id;
    this.nom=a_nom;
    this.qte=a_qte;
    this.couleur=a_couleur;
}

_id='A111';
_nom='table';
_qte= '1';
_couleur='blanc';
let furniture5=new Array();

newarticle = new const_article(_id,_nom,_qte,_couleur);
furniture5[_id]=newarticle;

_id='A222';
_nom='chaise';
_qte= '4';
_couleur='blanc';

newarticle = new const_article(_id,_nom,_qte,_couleur);
furniture5[_id]=newarticle;

_id='A333';
_nom='bureau';
_qte= '1';
_couleur='noir';

newarticle = new const_article(_id,_nom,_qte,_couleur);
furniture5[_id]=newarticle;

var storage_article= new Array();
storage_article=furniture5;

console.log(storage_article);

_id='A222';
console.log(storage_article[_id]);

if (storage_article[_id] ) {
  console.log("cle trouvée");
  console.log(storage_article[_id].id);
    console.log(storage_article[_id].nom);
               
 }
else{
  console.log("cle absente")
};

