let products = [];
let offset = 0;
let limit = 8;   
let numpag = 1;
function CallApi(){
  let xml = new XMLHttpRequest();
  
  const URL = "https://api.escuelajs.co/api/v1/products";

  if(document.querySelector('.HomePAgeFirst')){

    xml.open("GET", `${URL}?offset=0&limit=16`);
    

   }else if(document.querySelector('.HomePAgeSecond')){

     xml.open("GET", `${URL}?offset=${offset * limit}&limit=${limit}`);
   }


  xml.send()
  xml.addEventListener('readystatechange' , function(){
    if(xml.readyState==4 && xml.status==200){
       products = JSON.parse(xml.response);
     if(document.querySelector('.HomePAgeFirst')){
    cardMaker( 'colector' , products , 0 , 8)
    cardMaker( 'colector2' , products , 8 , 16)
    
     }
   else if(document.querySelector('.HomePAgeSecond')){
     cardMaker( 'colector3' , products , 0 , products.length)
   }
       
 }})
}

  function cardMaker( colectornum , products , start , end){
    document.querySelector(`.${colectornum}`).innerHTML = "" ;
    

    
    let cartona =""
    for(start ; start < end ; start++ ){
      cartona +=`
    
    <div class="col-12 col-sm-6 col-md-4 col-xl-3  innercontainer" dataindex="${start}" >
          <div class="innercard">
            <figure><img class="w-100" src="${products[start].images[0]}" alt="aa"></figure>
            <h4>${products[start].title}</h4>
            <p>${products[start].slug}</p>
            <div class="fiveStars">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </div>
            <h5>$${products[start].price}</h5>
            <div class="iconcart"><i class="fa-solid fa-cart-shopping"></i></div>
          </div>
        </div>
    
    `
    }
 

  document.querySelector(`.${colectornum}`).innerHTML = cartona;
 let pageNumberElem = document.querySelector('.numbers');
  if (pageNumberElem) {
    pageNumberElem.innerText = numpag;
  }

    let innercontainer =   document.querySelectorAll('.innercontainer') ;
  innercontainer.forEach((elemnt)=>{
    elemnt.addEventListener('click' , function(e)
    {

     
      let indix = this.getAttribute('dataindex')
      let pro = products[indix]
      console.log(pro)
      $('.buysection').css('display' , 'flex')
      $('html').css('overflow' , 'hidden')
      buyerSection(pro)
      
    })
  })
}

  let arrowright = document.querySelector('.rightarrow')
  let arrowleft = document.querySelector('.leftarow')
  let xmark = document.querySelector('.closerofbuyProdact .fa-xmark')
  let buysection = document.querySelector('.buysection')


    arrowright.addEventListener('click', function(){
  if(offset < 3){
    offset++;
    numpag++;
    CallApi();
  }
  })

  arrowleft.addEventListener('click', function(){
  if(offset > 0){
    numpag--
    offset--
  CallApi()
  }

  })



  xmark.addEventListener('click' , function(){
    //  if($('.buysection').css('display' , 'flex')){
      $('.buysection').css('display' , 'none')  
      $('html').css('overflow' , 'unset')
      //  } 
  })

  buysection.addEventListener('click', function(e){
      
      if(e.target.className == 'buysection  '){
          $('.buysection').css('display' , 'none')  
          $('html').css('overflow' , 'unset')
      }
      

  })

  function buyerSection(prodacts){
  let cartona = document.querySelector('.detailsOfProduct')
  cartona.innerHTML = `


          <div class="col-12 col-lg-6">
    <div class="photoOfProdact">
      <div class="row g-2">
        <div class="col-12">
          <div class="mainphot">
            <img class="w-100" src="${prodacts.images[0]}" alt="">
          </div>
        </div>
        <div class="col-4">
          <div class="somephoto">
            <img class="w-100" src="${prodacts.images[0]}" alt="">
          </div>
        </div>
        <div class="col-4">
          <div class="somephoto">
            <img class="w-100" src="${prodacts.images[1]}" alt="">
          </div>
        </div>
        <div class="col-4">
          <div class="somephoto">
            <img class="w-100" src="${prodacts.images[2]}" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="col-12 col-lg-6">
    <div class="infoOfbuyProdat">
      <h4 class="mt-4 mb-4">${prodacts.category.name}</h4>
      <h2 class="mt-4 mb-4">${prodacts.title}</h2>
      <h2 class="mt-4 mb-4">$${prodacts.price}</h2>
      <form class="mt-4 mb-4">
        <div class="chosethesize">
          <input type="radio" value="S" id="small" name="size">
          <label for="small"><h4>S</h4></label>

          <input type="radio" value="XL" id="xlarg" name="size">
          <label for="xlarg"><h4>XL</h4></label>

          <input type="radio" value="XXL" id="xxlarg" name="size">
          <label for="xxlarg"><h4>XXL</h4></label>
        </div>

        <div class="footeroftheform d-flex justify-content-start">
          <input style="width: 50px; margin-right: 5px;" type="number" min="1" id="quantityInput" 
  value="1">
          <button type="button" id="" class="w-25 addtocart">Add to Cart</button>
        </div>
      </form>
      <h4 class="mt-4 mb-4">Product Description :</h4>
      <p class="text-black mt-4 mb-4">${prodacts.description}</p>
    </div>
  </div>

  `
  let addtocart = document.querySelector('.addtocart') ;
  addtocart.addEventListener('click' , function(e){
     let selectedSize = document.querySelector('input[name="size"]:checked');
     let quantity = parseInt(document.getElementById("quantityInput").value);
 
  if (selectedSize) {
 
  let item = {
    id: prodacts.id,
    title: prodacts.title,
    price: prodacts.price,
    image: prodacts.images[0],
    quantity: quantity,
    size: selectedSize.value   
  }
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  cart.push(item);
  
  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Product added to cart");
  console.log(item);
} else {
  console.log("choosen size not selected");
}
  



  
});

  let chosenphoto = document.querySelectorAll('.photoOfProdact .somephoto img')
    let mainphoto = document.querySelector('.photoOfProdact .mainphot img')

    chosenphoto.forEach((elemnt) => {
      elemnt.addEventListener('click' , function(e){
        mainphoto.src = e.target.src  
      })
    })


  }


  CallApi();