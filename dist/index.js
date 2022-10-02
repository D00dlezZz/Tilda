import { GetItem } from "./api/itemAPI.js";

const title = document.getElementById('title');
const description = document.getElementById('description');
const price = document.getElementById('price');
const oldPrice = document.getElementById('oldPrice');
const quantity = document.getElementById('quantity');
const mainPhoto = document.getElementById('mainPhoto');
const addBtn = document.getElementById('addBtn');


function SetValues(data) {
    title.innerHTML = data.title
    description.innerHTML = data.descr
    if (data.quantity !== 0) {
        quantity.innerHTML = `Only ${data.quantity} left`
        price.innerHTML = `${data.price} USD`
        oldPrice.innerHTML = `${data.priceold} USD`     
    }else {
        addBtn.style.display = "none"
    }
    
}

GetItem().then((data) => SetValues(data));




