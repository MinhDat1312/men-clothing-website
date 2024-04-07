var btnASC=document.querySelectorAll(".home__select-item")[0];
var btnDESC=document.querySelectorAll(".home__select-item")[1];

var btnPopular=document.querySelectorAll(".home-filter__btn")[0];
var btnDiscount=document.querySelectorAll(".home-filter__btn")[1];
var btnSoldMax=document.querySelectorAll(".home-filter__btn")[2];


btnASC.addEventListener("click",()=>{
    var listProduct=getInforProduct();
    listProduct.sort((a,b)=>{
        var priceA=Number(a.currentPrice.replace(/\D/gi,""));
        var priceB=Number(b.currentPrice.replace(/\D/gi,""));

        if(priceA < priceB){
            return -1;
        }
        else if(priceA > priceB){
            return 1;
        }
        else return 0;
    });
    displayInforProduct(listProduct);
    setHeart();
    setLink();
    displayFavouriteProduct();
    resetButton(-1);
    star();
});

btnDESC.addEventListener("click",()=>{
    var listProduct=getInforProduct();
    listProduct.sort((a,b)=>{
        var priceA=Number(a.currentPrice.replace(/\D/gi,""));
        var priceB=Number(b.currentPrice.replace(/\D/gi,""));

        if(priceA > priceB){
            return -1;
        }
        else if(priceA < priceB){
            return 1;
        }
        else return 0;
    });
    displayInforProduct(listProduct);
    setHeart();
    setLink();
    displayFavouriteProduct();
    resetButton(-1);
    star();
});

btnSoldMax.addEventListener("click",()=>{
    document.querySelectorAll(".home-filter__btn")[2].classList.add("btn--primary");
    var listQtySold=getInforProduct();
    listQtySold.sort((a,b)=>{
        var a=a.qtySold;
        var b=b.qtySold;

        if(Number(a) > Number(b)){
            return -1;
        }
        else if(Number(a) < Number(b)){
            return 1;
        }
        else return 0;
    });
    displayInforProduct(listQtySold);
    setHeart();
    setLink();
    displayFavouriteProduct();
    resetButton(2);
    star();
});

btnPopular.addEventListener("click",()=>{
    document.querySelectorAll(".home-filter__btn")[0].classList.add("btn--primary");
    var currentList=getInforProduct();
    var list=new Array();
    for(var i=0; i<20;i++){
        var productRandom=currentList[Math.floor(Math.random()*currentList.length)];
        var index=1;
        while(list.includes(productRandom) && index <= 20){
            productRandom=currentList[Math.floor(Math.random()*currentList.length)];
            index++;
        }
        list.push(productRandom);
    }
    displayInforProduct(list);
    setHeart();
    setLink();
    displayFavouriteProduct();
    resetButton(0);
    star();
})

btnDiscount.addEventListener("click",()=>{
    document.querySelectorAll(".home-filter__btn")[1].classList.add("btn--primary");
    var list=getInforProduct();
    list.sort((a,b)=>{
        if(Number(a.discount) > Number(b.discount)){
            return -1;
        }
        else if(Number(a.discount) < Number(b.discount)){
            return 1;
        }
        else return 0;
    })
    displayInforProduct(list);
    setHeart();
    setLink();
    displayFavouriteProduct();
    resetButton(1);
    star();
})

function getInforProduct(){
    var currentListProduct=document.getElementsByClassName("home-product-item");
    var lisProduct=JSON.parse(localStorage.getItem("listProduct"));
    var newListProduct= new Array();

    for(var i=0;i<lisProduct.length;i++){
        for(var j=0;j<currentListProduct.length;j++){
            if(lisProduct[i].idProduct==currentListProduct[j].id){
                newListProduct.push(lisProduct[i]);
            }
        }
    }

   return newListProduct;
}

function displayInforProduct(listProduct){
    document.querySelector(".home-product").innerHTML='';
    var products="";
    products+=`<div class="row">`;
    listProduct.map(value=>{
        var imgProduct=value.imgProduct;
        var imgReplace=imgProduct.replace(/url/gi,"");
        var imgSplitfirst=imgReplace.split("(")[1];
        var imgResult=imgSplitfirst.split(")")[0].replace(/"/gi,"");
        return products+=
        `
        <div class="col-lg-3 col-sm-6 col-6">
            <a href="../html/detailProduct.html" class="home-product-link">
                <div class="home-product-item" id="${value.idProduct}" onclick="addItemToCart(id);">
                    <div class="home-product-item__img" style="background-image: url(${imgResult});"></div>
                    <h4 class="home-product-item__name">
                        ${value.nameProduct}
                    </h4>
                    <div class="home-product-item__price">
                        <span class="home-product-item__old">${value.oldPrice}</span>
                        <span class="home-product-item__new">${value.currentPrice}</span>
                    </div>
                    <div class="home-product-item__action">
                        <!-- Nếu thêm class home-product-item__heart--liked thì tim sẽ chuyển màu -->
                        <span class="home-product-item__heart">
                            <i class="fa-regular fa-heart home-product-item__heart-icon"></i>
                            <i class="fa-solid fa-heart home-product-item__hearted-icon"></i>
                        </span>
                        <div class="home-product-item__star">
                            <i class="fa-solid fa-star home-product-item__star-icon home-product-item__star-gold"></i>
                            <i class="fa-solid fa-star home-product-item__star-icon home-product-item__star-gold"></i>
                            <i class="fa-solid fa-star home-product-item__star-icon home-product-item__star-gold"></i>
                            <i class="fa-solid fa-star home-product-item__star-icon home-product-item__star-gold"></i>
                            <i class="fa-solid fa-star home-product-item__star-icon"></i>
                        </div>
                        <div class="home-product-item__sold">${value.qtySold} đã bán</div>
                    </div>
                    <div class="home-product-item__origin">
                        <span class="home-product-item__brand">${value.brand}</span>
                        <span class="home-product-item__country">${value.origin}</span>
                    </div>
                    <div class="home-product-item__favourite">
                        <i class="fa-solid fa-check"></i>
                        <span>Yêu thích</span>
                    </div>
                    <div class="home-product-item__discount">
                        <span class="home-product-item__percent">${value.discount}%</span>
                        <span class="home-product-item__label">GIẢM</span>
                    </div>
                </div>
            </a>
        </div>
        `
    });
    products+=`</div>`;
    document.querySelector(".home-product").innerHTML=products;
}

//Thay đổi màu trái tim
var listProduct= JSON.parse(localStorage.getItem("listProduct"));
function setHeart(){
    var listHeart=document.getElementsByClassName("home-product-item__heart");
    function changeHeart(i){
        return function(){
            if(listHeart[i].classList.contains("home-product-item__heart--liked")){
                listHeart[i].classList.remove("home-product-item__heart--liked");
                var idProduct=listHeart[i].parentElement.parentElement.id;
                listHeart[i].parentElement.parentElement.parentElement.href="#idProduct";
                document.getElementsByClassName("home-product-item__favourite")[i].style.display="none";
    
                if(localStorage.getItem("favouriteProduct")!=null){
                    var list=JSON.parse(localStorage.getItem("favouriteProduct"))
                    for(var j=0;j<list.length;j++){
                        if(list[j].idProduct==idProduct){
                            var itemInNotify=document.querySelectorAll(".header__notify-name");
                            for(var n=0;n<itemInNotify.length;n++){
                                if(itemInNotify[n].innerText==list[j].nameProduct){
                                    itemInNotify[n].parentElement.parentElement.parentElement.remove();
                                }
                            }
                            list.splice(j,1);
                        }
                    }
                    localStorage.setItem("favouriteProduct",JSON.stringify(list));
                    
                }
            }
            else{
                if(localStorage.getItem("favouriteProduct")!=null){
                    var favouriteProduct=JSON.parse(localStorage.getItem("favouriteProduct"));
                    listHeart[i].classList.add("home-product-item__heart--liked");
                    var idProduct=listHeart[i].parentElement.parentElement.id;
                    listHeart[i].parentElement.parentElement.parentElement.href="#idProduct";
                    document.getElementsByClassName("home-product-item__favourite")[i].style.display="block";
    
                    for(var j=0;j<listProduct.length;j++){
                        if(listProduct[j].idProduct==idProduct){
                            if(favouriteProduct.includes(listProduct[j])==false){
                                favouriteProduct.push(listProduct[j]);
                                var items=document.querySelector(".header__notify-list").innerHTML;
                                if(listProduct[j]!=null){
                                    var imgProduct=listProduct[j].imgProduct;
                                    var imgReplace=imgProduct.replace(/url/gi,"");
                                    var imgSplitfirst=imgReplace.split("(")[1];
                                    var imgResult=imgSplitfirst.split(")")[0];  
                            
                                    items+=
                                    `
                                    <li class="header__notify-item">
                                        <a href="../html/detailProduct.html" class="header__notify-link" onclick="setCurrentProduct(${listProduct[j].idProduct});">
                                            <img src=${imgResult} alt="" class="header__notify-img">
                                            <div class="header__notify-infor">
                                                <span class="header__notify-name">${listProduct[j].nameProduct}</span>
                                                <span class="header__notify-desc">${listProduct[j].currentPrice}</span>
                                            </div>
                                        </a>
                                    </li>
                                    `
                                    document.querySelector(".header__notify-list").innerHTML=items;
                                }
                            }
                        }   
                    }
                    localStorage.setItem("favouriteProduct",JSON.stringify(favouriteProduct));
                }
                else{
                    var favouriteProduct=new Array();
                    listHeart[i].classList.add("home-product-item__heart--liked");
                    var idProduct=listHeart[i].parentElement.parentElement.id;
                    listHeart[i].parentElement.parentElement.parentElement.href="#idProduct";
                    document.getElementsByClassName("home-product-item__favourite")[i].style.display="block";
        
                    for(var j=0;j<listProduct.length;j++){
                        if(listProduct[j].idProduct==idProduct){
                            favouriteProduct.push(listProduct[j]);
                            var items=document.querySelector(".header__notify-list").innerHTML;
                            if(listProduct[j]!=null){
                                var imgProduct=listProduct[j].imgProduct;
                                var imgReplace=imgProduct.replace(/url/gi,"");
                                var imgSplitfirst=imgReplace.split("(")[1];
                                var imgResult=imgSplitfirst.split(")")[0];  
                            
                                items+=
                                `
                                <li class="header__notify-item">
                                    <a href="../html/detailProduct.html" class="header__notify-link" onclick="setCurrentProduct(${listProduct[j].idProduct});">
                                        <img src=${imgResult} alt="" class="header__notify-img">
                                        <div class="header__notify-infor">
                                            <span class="header__notify-name">${listProduct[j].nameProduct}</span>
                                            <span class="header__notify-desc">${listProduct[j].currentPrice}</span>
                                        </div>
                                    </a>
                                </li>
                                `
                                document.querySelector(".header__notify-list").innerHTML=items;
                            }
                        }
                    }
                    localStorage.setItem("favouriteProduct",JSON.stringify(favouriteProduct));
                }
            }
    
            if(localStorage.getItem("favouriteProduct")==null || JSON.parse(localStorage.getItem("favouriteProduct")).length<=0){
                document.querySelector(".header__notify").classList.add("header__cart-list--no-cart");
                document.querySelector(".header__notify-title").style.display="none";
                document.querySelector(".header__notify-list").style.display="none";
                document.querySelector(".header__notify-footer").style.display="none";
            }
            else{
                document.querySelector(".header__notify").classList.remove("header__cart-list--no-cart");
                document.querySelector(".header__notify-title").style.display="block";
                document.querySelector(".header__notify-list").style.display="block";
                document.querySelector(".header__notify-footer").style.display="flex";
            }
        } 
    }
    for(var i=0;i<listHeart.length;i++){
        listHeart[i].addEventListener("click",changeHeart(i));
    }
}

//Set lại link cho tag a sau khi nhấn trái tim
function setLink(){
    var listLink=document.getElementsByClassName("home-product-link");
    var listImage=document.getElementsByClassName("home-product-item__img");
    function changeLink(j){
        return function(){
            listLink[j].href="../html/detailProduct.html";
        }
    }
    for(var j=0;j<listImage.length;j++){
        listImage[j].addEventListener("click",changeLink(j));
    }
}

 // Hiển thị sản phẩm yêu thích
function displayFavouriteProduct(){
     if(localStorage.getItem("favouriteProduct")!=null){
         var favouriteProduct=JSON.parse(localStorage.getItem("favouriteProduct"));
         var listProduct=JSON.parse(localStorage.getItem("listProduct"));
         for(var i=0;i<listProduct.length;i++){
             for(var j=0;j<favouriteProduct.length;j++){
                 if(favouriteProduct[j].idProduct==listProduct[i].idProduct){
                     if(document.getElementById(listProduct[i].idProduct)!=null){
                         document.getElementById(listProduct[i].idProduct).children[5].style.display="block";
                         document.getElementById(listProduct[i].idProduct).children[3].children[0].classList.add("home-product-item__heart--liked");
                     }
                 }
             }
         }
     }
}

// Reset button
function resetButton(flag){
    var buttons=document.querySelectorAll(".home-filter__btn");
    for(var i=0;i<buttons.length;i++){
        if(i==flag){
            continue;
        }
        else{
            if(buttons[i].classList.contains("btn--primary")){
                buttons[i].classList.remove("btn--primary");
            }
        }
    }
}

//Sort with Mobile and Tablet
var item=document.querySelectorAll(".header__sort-item");
item[0].addEventListener("click",()=>{
    item[0].classList.add("header__sort-item--active");
    var currentList=getInforProduct();
    var list=new Array();
    for(var i=0; i<20;i++){
        var productRandom=currentList[Math.floor(Math.random()*currentList.length)];
        var index=1;
        while(list.includes(productRandom) && index<=20){
            productRandom=currentList[Math.floor(Math.random()*currentList.length)];
            index++;
        }
        list.push(productRandom);
    }
    displayInforProduct(list);
    setHeart();
    setLink();
    displayFavouriteProduct();
    resetButtonM(0);
    star();
})

item[1].addEventListener("click",()=>{
    item[1].classList.add("header__sort-item--active");
    var list=getInforProduct();
    list.sort((a,b)=>{
        if(Number(a.discount) > Number(b.discount)){
            return -1;
        }
        else if(Number(a.discount) < Number(b.discount)){
            return 1;
        }
        else return 0;
    })
    displayInforProduct(list);
    setHeart();
    setLink();
    displayFavouriteProduct();
    resetButtonM(1);
    star();
})

item[2].addEventListener("click",()=>{
    item[2].classList.add("header__sort-item--active");
    var list=getInforProduct();
    list.sort((a,b)=>{
        var a=a.qtySold;
        var b=b.qtySold;

        if(Number(a) > Number(b)){
            return -1;
        }
        else if(Number(a) < Number(b)){
            return 1;
        }
        else return 0;
    });
    displayInforProduct(list);
    setHeart();
    setLink();
    displayFavouriteProduct();
    resetButtonM(2);
    star();
})

item[3].addEventListener("click",()=>{
    item[3].classList.add("header__sort-item--active");
    var list=getInforProduct();
    list.sort((a,b)=>{
        var priceA=Number(a.currentPrice.replace(/\D/gi,""));
        var priceB=Number(b.currentPrice.replace(/\D/gi,""));

        if(priceA < priceB){
            return -1;
        }
        else if(priceA > priceB){
            return 1;
        }
        else return 0;
    });
    displayInforProduct(list);
    setHeart();
    setLink();
    displayFavouriteProduct();
    resetButtonM(3);
    star();
})

// Reset button with mobile and tablet
function resetButtonM(flag){
    var buttons=document.querySelectorAll(".header__sort-item");
    for(var i=0;i<buttons.length;i++){
        if(i==flag){
            continue;
        }
        else{
            if(buttons[i].classList.contains("header__sort-item--active")){
                buttons[i].classList.remove("header__sort-item--active");
            }
        }
    }
}

//Star
function star(){
    var itemStars=document.querySelectorAll(".home-product-item__star");
    for(var i=0;i<itemStars.length;i++){
        itemStars[i].innerHTML="";
        var qtyStar=Math.floor(Math.random()*5)+1;
        if(qtyStar==5){
            var star="";
            for(var j=0;j<qtyStar;j++){
                star+=` <i class="fa-solid fa-star home-product-item__star-icon home-product-item__star-gold"></i>`;
            }
            itemStars[i].innerHTML=star;
        }
        else{
            var star="";
            for(var j=0;j<qtyStar;j++){
                star+=` <i class="fa-solid fa-star home-product-item__star-icon home-product-item__star-gold"></i>`;
            }
            for(var k=0;k<5-qtyStar;k++){
                star+=`<i class="fa-solid fa-star home-product-item__star-icon"></i>`;
            }
            itemStars[i].innerHTML=star;
        }
    }
}