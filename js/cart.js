








function renderCart(){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let tbody = document.querySelector(".dataTable");
  tbody.innerHTML = "";
  let totalPrice = 0;
  cart.forEach((item, index) => {
    let subtotal = item.price * item.quantity;
    totalPrice += subtotal;

    tbody.innerHTML += `
      <tr>
        <td><i class="fa-solid fa-circle-minus" onclick="removeItem(${index})"></i></td>
        <td><img src="${item.image}" style="width:70px;height:70px;object-fit:cover;"></td>
        <td>${item.title}</td>
        <td>${item.size}</td>
        <td>$${item.price}</td>
        <td>${item.quantity}</td>
        <td>$${subtotal}</td>
      </tr>
    `;
  });


   let cartSubtotal = document.querySelector('.carttools')
  cartSubtotal.innerHTML = `  <tr>
              <td>Cart Subtotal</td>
              <td>$ ${totalPrice}</td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td>$10</td>
            </tr> 
            <tr>
              <td>Total</td>
              <td>$ ${totalPrice + 10}</td>
            </tr> `

}

function removeItem(index){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}


renderCart();

 // cart totals
  let proceedCheckout = document.querySelector('.proceedCheckout');
  proceedCheckout.addEventListener('click', function () {

    
    alert("Your order has been placed successfully. Thank you for shopping with us.");

  })
 
























