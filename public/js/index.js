function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const url = 'http://localhost:3000/api/furniture';
const section = document.getElementById('lproduits');

var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        let listproduits = response
        console.log(listproduits)
        
        return listproduits.map(function(produit) {
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
              image.src = produit.imageUrl;
              image.classList.add("card-img-top", "h-100")
              append(divcol5, image);    
              let divcol7 = createNode('div')
              divcol7.classList.add("col-md-7")
              append(divrow, divcol7)
              let divcardbody = createNode('div')
              divcardbody.classList.add("card-body")
              append(divcol7, divcardbody)
              let h5cardtitle = createNode('h5')
              h5cardtitle.classList.add("card-title")
              h5cardtitle.textContent += produit.name
              append(divcardbody, h5cardtitle)
              let pcardtexte = createNode('p')
              pcardtexte.classList.add("card-text")
              pcardtexte.textContent += produit.description
              append(divcardbody, pcardtexte)
              let prix = parseFloat(produit.price);
              console.log(prix)
              prix = prix / 100
              console.log(prix)
              let alien = createNode('a')
              alien.classList.add("btn", "btn-primary", "stretched-link")
              alien.textContent += "Lien vers...." 
              append(divcardbody, alien)
              })
        
    }
};
request.open("GET", url);
request.send();

// version avec utilisation de Fetch
//
// fetch(url)
// .then((resp) => resp.json())
// .then(function(data) {
//   let listproduits = data;
//   console.log(data);
//   console.log(data[0].name);
//   console.log(listproduits); 
//   return listproduits.map(function(produit) {
//     let divcard = createNode('div');
//     divcard.classList.add("card","w-75","mx-auto","mt-5"); 
//     append(section, divcard); 
//     let divrow = createNode('div');
//     divrow.classList.add("row", "no-gutters")
//     append(divcard, divrow)
//     let divcol5 = createNode('div')
//     divcol5.classList.add("col-md-5")
//     append(divrow, divcol5)
//     let image = createNode('img');  
//     image.src = produit.imageUrl;
//     image.classList.add("card-img-top", "h-100")
//     append(divcol5, image);    
//     let divcol7 = createNode('div')
//     divcol7.classList.add("col-md-7")
//     append(divrow, divcol7)
//     let divcardbody = createNode('div')
//     divcardbody.classList.add("card-body")
//     append(divcol7, divcardbody)
//     let h5cardtitle = createNode('h5')
//     h5cardtitle.classList.add("card-title")
//     h5cardtitle.textContent += produit.name
//     append(divcardbody, h5cardtitle)
//     let pcardtexte = createNode('p')
//     pcardtexte.classList.add("card-text")
//     pcardtexte.textContent += produit.description
//     append(divcardbody, pcardtexte)
//     let prix = parseFloat(produit.price);
//     console.log(prix)
//     prix = prix / 100
//     console.log(prix)
//     let alien = createNode('a')
//     alien.classList.add("btn", "btn-primary", "stretched-link")
//     alien.textContent += "Lien vers...." 
//     append(divcardbody, alien)
//     })

// })
// .catch(function(error) {
//   console.log(error);
// });


