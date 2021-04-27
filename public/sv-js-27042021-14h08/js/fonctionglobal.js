//
// Fonction de création d'un Noeud
// Dans un document HTML, la méthode document.createElement() 
// crée un élément HTML du type spécifié par tagName ou un HTMLUnknownElement si tagName n’est pas reconnu
//
function createNode(element) {
    return document.createElement(element);
}
// window.createNode=function(element) {
//     return document.createElement(element);
// };
// 
// Fonction d'ajout d'un noeud enfant à un noeud parent
// La méthode Node.appendChild() ajoute un nœud à la fin de la liste des enfants d'un nœud parent
// spécifié.
//
function append(parent, el) {
    return parent.appendChild(el);
}
// window.append=function(parent, el) {
//     return parent.appendChild(el);
// };
