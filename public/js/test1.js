function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

const section = document.getElementById('test');

document.getElementById("clicbtn").addEventListener("click", function() {

    let cardp = createNode('p');
    cardp.textContent += 'Essai ecriture texte'; 
    append(section, cardp);
    alert("L'article a été ajouté") 

})