//! getting the html elements
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search")
let tbody = document.getElementById("tbody");
let deleteAll = document.getElementById("deleteAll");
//! useful functions
let mode = "create";
let temp;
let counter;
let val;
//todo: get the total

function getTotal() {
  let a = +price.value || 0;
  let b = +taxes.value || 0;
  let c = +ads.value || 0;
  let d = +discount.value || 0;
  return a + b + c - d;
}

[price, taxes, ads, discount].forEach((input) => {
  input.onkeyup = () => {
    total.innerHTML = getTotal();
    if (getTotal()) {
      total.classList.add("filled");
    } else {
      total.classList.remove("filled");
      total.innerHTML = 0;
    }
  };
});
//todo:create the product
let dataPro;
if (localStorage.products != null) {
  dataPro = JSON.parse(localStorage.products);
} else {
  dataPro = [];
}
submit.onclick = function () {
    let newPro = {
        title: title.value.trim(),
        price: price.value.trim(),
        taxes: taxes.value.trim(),
        ads: ads.value.trim(),
        discount: discount.value.trim(),
        total: total.innerHTML.trim(),
        count: count.value.trim(),
        category: category.value.trim(),
        display: true
    };
    if(title.value != '' && total.innerHTML != '0' && category.value != '' && +count.value < 100){
        switch(mode){
            case "create":
                if(count.value){
                    for(let i = 0; i < +count.value; i++){
                        dataPro.push(newPro);
                    }
                }else{
                    dataPro.push(newPro);
                }
                break;
            default:
                mode = "create";
                submit.innerHTML = "create";
                count.classList.remove("hide");
                dataPro[temp] = newPro;
                break;
        }
        localStorage.products = JSON.stringify(dataPro);
        clearData();
        showPro();
    }
};
//todo: clear input
function clearData() {
  title.value = "";
  price.value = "";
  ads.value = "";
  taxes.value = "";
  discount.value = "";
  total.innerHTML = "0";
  count.value = "";
  category.value = "";
}
//todo: read the product
function showPro() {
    if(dataPro.length){
        deleteAll.innerHTML = `delete all (${dataPro.length})`
        deleteAll.classList.remove("hide");
    }
    else{
        deleteAll.classList.add("hide");
    }
    tbody.innerHTML = "";
    for (let i = 0; i < dataPro.length; i++) {
        if(dataPro[i].display){
            tbody.innerHTML += `
                <tr>
                    <td>#${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})">update</button></td>
                    <td><button onclick="deletePro(${i})">delete</button></td>
                </tr>
            `;
        }
    }
}
showPro();
//todo: delete a product
function deletePro(pro_id) {
  dataPro.splice(+pro_id, 1);
  localStorage.products = JSON.stringify(dataPro);
  showPro();
}
//todo: delete all the products
deleteAll.onclick = ()=>{
    for(let i = 0; i < dataPro.length; i++){
        if(dataPro[i].display){
            dataPro.splice(i, 1);
        }
    }
    if(dataPro.length){
        localStorage.products = JSON.stringify(dataPro);
    }else{
        localStorage.removeItem("products");
    }
    searchPro(val);
}
//todo: update the product
function updateData(pro_id){
    mode = "update";
    title.value = dataPro[pro_id].title;
    price.value = dataPro[pro_id].price;
    taxes.value = dataPro[pro_id].taxes;
    ads.value = dataPro[pro_id].ads;
    discount.value = dataPro[pro_id].discount;
    category.value = dataPro[pro_id].category;
    total.innerHTML = getTotal();
    if(getTotal()) total.classList.add("filled");
    count.classList.add("hide")
    submit.innerHTML = "update";
    temp = pro_id;
    scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
}
//todo: search for a product
var searchMode;

function getMode(id){
    searchMode = id;
    search.setAttribute('placeholder', document.getElementById(id).innerHTML);
    search.focus();
}

search.onkeyup = ()=>{
    val = search.value;
    searchPro(val);
}

function searchPro(value){
    counter = 0;
    if(searchMode == "searchTitle"){
        for(let i = 0; i < dataPro.length; i++){
           if(!dataPro[i].title.toLowerCase().trim().includes(value.toLowerCase().trim())){
                dataPro[i].display = false;
           }else{
            dataPro[i].display = true;
            counter++
        }
    }
    }else{
        for(let i = 0; i < dataPro.length; i++){
            if(!dataPro[i].category.toLowerCase().trim().includes(value.toLowerCase().trim())){
                dataPro[i].display = false;
            }else{
                dataPro[i].display = true;
                counter++
            }
        }
    }
    showPro();
    deleteAll.innerHTML = `delete all (${counter})`
}