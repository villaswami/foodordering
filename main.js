const cartCounter=document.querySelector(".cart__counter");
const cartDOM=document.querySelector(".cart__items");
const totalcount=document.querySelector("#total__counter");
const totalcost=document.querySelector(".total__cost");
const checkout=document.querySelector(".check__out__btn");
//taking all objects requried
const addToCartBtn=document.querySelectorAll(".btn__add__to__cart");
//passing the elements in localstroage
let cartitems=(JSON.parse(localStorage.getItem("cart__items")) ||[]);
document.addEventListener("DOMContentLoaded",loaddata);
//orderplacing
checkout.addEventListener("click",()=>{
    if(cartitems.length==0){

    alert("no order selected");

}
else{
    clearitems();
    alert("order placed ! thank you");
}
    
   
})
//cart view
cartCounter.addEventListener("click",()=>{
cartDOM.classList.toggle("active")
});
//setinng elements on cart that ordered
addToCartBtn.forEach(btn=>{
    btn.addEventListener("click",()=>{
        let parentElement=btn.parentElement;

        const product={
            id:parentElement.querySelector("#product_id").value,
            name:parentElement.querySelector(".product__name").innerText,
            image:parentElement.querySelector("#image").getAttribute("src"),
            price:parentElement.querySelector(".product__price").innerText.replace("Rs",""),
            quantity:1
        }
       
          let isInCart=cartitems.filter(item=>item.id===product.id).
          length>0;
          if(!isInCart){
              addItemToTheDOM(product);
          }
          else{
              alert('aleady product is in cart'); 
              return;
          }
         
          const cartdomitems=document.querySelectorAll(".cart__item");
cartdomitems.forEach(individualItem=>{
    if(individualItem.querySelector("#product__id").value===product.id){
        increaseItem(individualItem,product );
            decreamentItem(individualItem,product);
            removeItems(individualItem,product)
    }
});
          cartitems.push(product);
          calculatetotal();
          saveto();
         

    });
  
});

//saving the cart in localstroage
function saveto(){
    localStorage.setItem("cart__items",JSON.stringify(cartitems));

}
//adding items that are requried
function addItemToTheDOM(product){
    cartDOM.insertAdjacentHTML("afterbegin",`                    <div class="cart__item">
    <input type="hidden" name="" id="product__id" value="${product.id}">
    <img src="${product.image}" alt="" id="product__image">
    <h4 class="product__name">${product.name}</h4>
    <a class="btn__small" action="decrease">&minus;</a>
    <h4 class="product__quantity">${product.quantity}</h4>
    <a  class="btn__small" action="increase">&plus;</a>
    <span class="product__price">${product.price}</span>
    <a class="btn__small btn__remove" action="remove">&times;</a>
    
</div>`)

}
//cal
function calculatetotal(){
    let total=0;
    cartitems.forEach(item=>{
        total+=item.quantity*item.price
    });
    totalcost.innerHTML=total;
    totalcount.innerHTML=cartitems.length;
}
//increase button
function increaseItem(individualItem,product){
    individualItem.querySelector("[action='increase']").addEventListener("click",()=>{
        cartitems.forEach(cartitem=>{
            if(cartitem.id==product.id){
                individualItem.querySelector(".product__quantity").innerText=++cartitem.quantity;
                calculatetotal();
                saveto();
                
            }
        })
    });
}
//decreament button
function decreamentItem(individualItem,product){
    individualItem.querySelector("[action='decrease']").addEventListener("click",()=>{
        cartitems.forEach(cartitem=>{
            if(cartitem.id==product.id){
                if(cartitem.quantity>1){
                individualItem.querySelector(".product__quantity").innerText=--cartitem.quantity;
                
        

         
       }else{
           cartitems=cartitems.filter(newElements=>
               newElements.id!==product.id);
               individualItem.remove();
       }
       calculatetotal();
       saveto();
        }
        })
    });
}

//remove button
function  removeItems(individualItem,product){
    individualItem.querySelector("[action='remove']").addEventListener("click",()=>{
        cartitems.forEach(cartitem=>{
            if(cartitem.id==product.id){
              
           cartitems=cartitems.filter(newElements=>
               newElements.id!==product.id);
               individualItem.remove();
       
       calculatetotal();
       saveto();
        }
        });
    });
}
//loading the page there
function loaddata(){
if(cartitems.length>0){
    cartitems.forEach(product=>{
        addItemToTheDOM(product);
        const cartdomitems=document.querySelectorAll(".cart__item");
        cartdomitems.forEach(individualItem=>{
            if(individualItem.querySelector("#product__id").value===product.id){
                increaseItem(individualItem,product);
                    decreamentItem(individualItem,product);
                    removeItems(individualItem,product)
            }
        });
        calculatetotal();
        saveto();
    });
    
}
}
//when we place order then it will clear the stroage
function clearitems(){
    localStorage.clear();
    cartitems=[];
    document.querySelectorAll(".cart__items").forEach(item=>{
        item.querySelectorAll(".cart__item").forEach(node=>{
            node.remove();
        });
    });
    calculatetotal();
}
