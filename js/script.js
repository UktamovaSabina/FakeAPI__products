const list = document.querySelector("#list");

(function(){
    fetch("https://fakestoreapi.com/products")
        .then(response =>response.json())
        .then(data => renderData(data))
        .catch(err => console.err(err))
}())

function renderData(data) {
    list.innerHTML = "";

    data.forEach(obj => {

        list.innerHTML += `
        <li class="list__item">
        <img class="item-picture" src="${obj.image}" alt="image of the item">
        <h3 class="item-heading">${obj.title}</h3>
        <ul class="item-infos">
            <li><strong>Price: </strong>${obj.price} $</li>
            <li><strong>Category: </strong>${obj.category}</li>
            <li class="item-description" maxlength="10">${obj.description}</li>
        </ul>
        <div class="basket-wrapper">
            <img src="images/Vector.svg" alt="basket" class="basket" width="25" data-id-item="${obj.id}">
        </div>
    </li>`
    })
}

list.addEventListener("click", (e) =>{
    if (!e.target.classList.contains("list") & !e.target.classList.contains("basket")) {
        confirm("Do you like it?  ;) ")
    }

    const itemID = e.target.getAttribute("data-id-item");
    
    if(e.target.classList.contains("basket")) {
        alert("this item has been deleted!")

        fetch(`https://fakestoreapi.com/products/${itemID}`,{
            method:"DELETE"
        })
            .then(res=>res.json())
            .then(json=>console.log(json))

        console.log("deleted");
    }
})