//
// création de la classe Resultat
//
class Resultat {
  constructor(Rstatus, Rnom, Rprenom, Rville, Rmsg, Remail) {
    this.status = Rstatus;
    this.nom = Rnom;
    this.prenom = Rprenom;
    this.ville = Rville;
    this.msg = Rmsg;
    this.email = Remail;
  }
}

const mailSite = "orinoco.contact@gmail.com";

document.getElementById("btn-valid").addEventListener("click", function () {
  reponse = verifFormMSg();
  console.log(reponse);
  if (reponse.status) {
    console.log("controle ok");
    window.open(
      "mailto:" +
        mailSite +
        "?Subject=" +
        "contact site orinoco " +
        "nom : " +
        reponse.nom +
        " prenom : " +
        reponse.prenom +
        " e-mail : " +
        reponse.email +
        "&body=" +
        "message : " +
        reponse.msg
    );
    window.location.href = "index.html";
  }
});

// vérification saisie formulaire validation
//
function verifFormMSg() {
  let name = document.forms["ValidForm"]["idNom"];
  let forname = document.forms["ValidForm"]["idPrenom"];
  let ville = document.forms["ValidForm"]["idVille"];
  let msg = document.querySelector("textarea");
  let email = document.forms["ValidForm"]["idEmail"];

  result = new Resultat(false, "", "", "", "", "");

  if (name.value == "") {
    alert("votre nom est obligatoire");
    name.focus();
    result.status = false;
    return result;
  }
  /* La méthode test() vérifie s'il y a une correspondance entre un texte et une expression rationnelle. */
  /* Elle retourne true en cas de succès et false dans le cas contraire.*/
  /* /\w/  enleve le cas du retour à la ligne; pour vérifier qu'il existe un caractère non blanc dans le textarea */
  /* ! test negation s'il n'y a pas de carcatères alors erreur */
  /* */
  if (!/\w/.test(msg.value)) {
    alert("entrer votre message");
    msg.focus();
    result.status = false;
    return result;
  }

  if (ville.value == "") {
    alert("il faut renseigner la ville");
    ville.focus();
    result.status = false;
    return result;
  }

  if (email.value == "") {
    alert("Entrez une adresse email valide.");
    email.focus();
    result.status = false;
    return result;
  }
  //
  // La methode indexOf() renvoie l'indice de la première occurence de la valeur cherchée au sein de la
  // chaîne courante (à partir de indexDébut). Elle renvoie -1 si la valeur cherchée n'est pas trouvée.
  //
  if (email.value.indexOf("@", 0) < 0) {
    alert("Entrer une adresse email valide.");
    email.focus();
    result.status = false;
    return result;
  }

  if (email.value.indexOf(".", 0) < 0) {
    alert("Entrer une adresse email valide.");
    email.focus();
    result.status = false;
    return result;
  }

  if (!isEmail(email.value)) {
    alert("Entrer une adresse email valide.");
    email.focus();
    result.status = false;
    return result;
  }

  result.status = true;
  result.nom = name.value;
  result.prenom = forname.value;
  result.ville = ville.value;
  result.msg = msg.value;
  result.email = email.value;
  return result;
}
