function createProductCart(idProduct, imgProduct, nameProduct, currentPrice, qty, type) {
    var product = new Object();

    product.idProduct=idProduct;
    product.imgProduct=imgProduct;
    product.nameProduct=nameProduct;
    product.currentPrice=currentPrice;
    product.qty=qty;
    product.type=type;
   
    return product;
}

// Hiển thị không có sản phẩm trong Cart
var cart__notice=document.querySelector(".header__cart-notice");
var cart__list=document.querySelector(".header__cart-list");
if(cart__notice.innerText==""){  
    cart__list.classList.add("header__cart-list--no-cart");
    document.querySelector('.header__cart-title').style.display="none"
    document.querySelector('.header__cart-list-buy').style.display="none"
    document.querySelector('.header__cart-view').style.display="none"
}

// Số lượng sản phẩm khi thêm
function addProductToCart(){
    document.querySelector(".header__cart-list").classList.remove('header__cart-list--no-cart');
    document.querySelector('.header__cart-title').style.display="block"
    document.querySelector('.header__cart-list-buy').style.display="block"
    document.querySelector('.header__cart-view').style.display="block"

    var json=localStorage.getItem("currentProduct");
    var currentID=JSON.parse(json);

    // Tìm sản phẩm hiện tại trong danh sách sản phẩm
    var json=localStorage.getItem("listProduct");
    var list=JSON.parse(json);
    var product=null;
    for(var i=0;i<list.length;i++){
        if(list[i].idProduct==currentID){
            product=list[i];
        }
    }

    var idProduct=product.idProduct;
    var imgProduct=product.imgProduct;
    var imgReplace=imgProduct.replace(/url/gi,"");
    var imgSplitfirst=imgReplace.split("(")[1];
    var imgResult=imgSplitfirst.split(")")[0];
    var nameProduct= product.nameProduct;
    var price=product.currentPrice;
    var qty=document.querySelector('.detail-product-item__qty-num').innerText;
    var typeProduct=product.nameProduct.split(' ')[0];

    // Thêm sản phẩm vào danh sách rồi lưu vào local storage
    var addProduct= createProductCart(idProduct,imgProduct,nameProduct,
        price, qty, typeProduct);

    var json=localStorage.getItem("listProductCart");
    var list=JSON.parse(json);

    var check=0;
    for(var i=0;i<list.length;i++){
        var res=list[i];
        if(res.idProduct==addProduct.idProduct){
            check=1;
            res.qty=parseInt(res.qty) + parseInt(addProduct.qty);
        }
    }
    if(check==0){
        list.push(addProduct);
    }
    var data=JSON.stringify(list);
    localStorage.setItem("listProductCart",data);

    // Hiển thị danh sách sản phẩm trong giỏ hàng
    if(check==0){
        var listProduct=document.querySelector('.header__cart-list-buy').innerHTML;
        listProduct+=
                `
                <li class="header__cart-list-item">
                    <a href="../html/detailProduct.html" class="header__cart-list-link" onclick="setCurrentProduct(${idProduct});">
                        <img src=${imgResult} alt="" class="header__cart-img" href="../html/detailProduct.html">
                    </a>
                    <div class="header__cart-infor">
                        <a href="../html/detailProduct.html" class="header__cart-list-link" onclick="setCurrentProduct(${idProduct});">
                            <div class="header__cart-infor-one">
                                <h5 class="header__cart-infor-name">${nameProduct}</h5>
                                <div class="header__cart-infor-price-wrap">
                                    <span class="header__cart-infor-price">${price}</span>
                                    <span class="header__cart-infor-mutiply">x</span>
                                    <span class="header__cart-infor-qty">${qty}</span>
                                </div>
                            </div>
                        </a>
                        <div class="header__cart-infor-two">
                            <span class="header__cart-infor-des">Phân loại hàng: ${typeProduct}</span>
                            <span class="header__cart-infor-remove" onclick="deleteProductCart(this,${idProduct});">Xóa</span>
                        </div>
                    </div>
                </li>
                `;
        document.querySelector('.header__cart-list-buy').innerHTML = listProduct;
    }
    else{
        document.querySelector('.header__cart-list-buy').innerHTML="";
        showProductCart();
    }

    // Hiển thị số lượng sản phẩm
    var cart__notice=document.querySelector(".header__cart-notice");
    var json=localStorage.getItem("listProductCart");
    var data=JSON.parse(json);

    if(data.length>0){
        localStorage.setItem("QtyCart",data.length);
        var json=localStorage.getItem("QtyCart");
        var qty=JSON.parse(json);
        cart__notice.innerText=qty;
        cart__notice.style.display="block"; 
    }
    else{
        cart__notice.innerText="";
    }
   
}

function showProductCart(){
    var jsonHome=localStorage.getItem("listProductCart");
    var listHome=JSON.parse(jsonHome);
    var listProduct=document.querySelector('.header__cart-list-buy').innerHTML;
    
    for(var i=0;i<listHome.length;i++){
        var imgProduct=listHome[i].imgProduct;
        var imgReplace=imgProduct.replace(/url/gi,"");
        var imgSplitfirst=imgReplace.split("(")[1];
        var imgResult=imgSplitfirst.split(")")[0];
        listProduct+=
                `
                <li class="header__cart-list-item">
                    <a href="../html/detailProduct.html" class="header__cart-list-link" onclick="setCurrentProduct(${listHome[i].idProduct});">
                        <img src=${imgResult} alt="" class="header__cart-img" href="../html/detailProduct.html">
                    </a>
                    <div class="header__cart-infor">
                        <a href="../html/detailProduct.html" class="header__cart-list-link" onclick="setCurrentProduct(${listHome[i].idProduct});">
                            <div class="header__cart-infor-one">
                                <h5 class="header__cart-infor-name">${listHome[i].nameProduct}</h5>
                                <div class="header__cart-infor-price-wrap">
                                    <span class="header__cart-infor-price">${listHome[i].currentPrice}</span>
                                    <span class="header__cart-infor-mutiply">x</span>
                                    <span class="header__cart-infor-qty">${listHome[i].qty}</span>
                                </div>
                            </div>
                        </a>
                        <div class="header__cart-infor-two">
                            <span class="header__cart-infor-des">Phân loại hàng: ${listHome[i].type}</span>
                            <span class="header__cart-infor-remove" onclick="deleteProductCart(this,${listHome[i].idProduct});">Xóa</span>
                        </div>
                    </div>
                </li>
                
                `;
    }
    document.querySelector('.header__cart-list-buy').innerHTML = listProduct;
}

if(localStorage.getItem("listProductCart")!=null){
    showProductCart();
}

// Hiển thị thông báo khi thêm thành công
function notifySuccess(){
    var start=setTimeout(function (){
        document.querySelector(".modal-notify").style.display="flex";
    },200);
   
    var stop=setTimeout(function (){
        clearTimeout(start);
        document.querySelector(".modal-notify").style.display="none";
    },2000);
}

// Thiết lập currentProduct khi nhấp vào sản phẩm trong Cart để xem thông tin sản phẩm
function setCurrentProduct(idProduct){
    var json=JSON.stringify(idProduct);
    localStorage.setItem("currentProduct",json);
}

//Xóa sản phẩm trong Cart
function deleteProductCart(x, idProduct){
    var itemDelete=x.parentElement.parentElement.parentElement;
    itemDelete.remove();

    var json=localStorage.getItem("listProductCart");
    var list=JSON.parse(json);
    for(var i=0;i<list.length;i++){
        if(list[i].idProduct==idProduct){
            list.splice(i,1);
        }
    }

    var data=JSON.stringify(list);
    localStorage.setItem("listProductCart",data);

    var cart__notice=document.querySelector(".header__cart-notice");
    var json=localStorage.getItem("listProductCart");
    var data=JSON.parse(json);

    if(data.length>=0){
        localStorage.setItem("QtyCart",data.length);
        var json=localStorage.getItem("QtyCart");
        var qty=JSON.parse(json);
        if(qty!=0){
            cart__notice.innerText=qty;
            cart__notice.style.display="block"; 
        }
        else{
            cart__notice.innerText="";
            cart__notice.style.display="none";
        }
    }
    else {
        cart__notice.innerText="";
        cart__notice.style.display="none";
    }

    var cart__list=document.querySelector(".header__cart-list");
    if(cart__notice.innerText==""){  
        cart__list.classList.add("header__cart-list--no-cart");
        document.querySelector('.header__cart-title').style.display="none"
        document.querySelector('.header__cart-list-buy').style.display="none"
        document.querySelector('.header__cart-view').style.display="none"
    }
}

//Lưu sản phẩm yêu thích
var listProduct= JSON.parse(localStorage.getItem("listProduct"));
//Thay đổi màu trái tim
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

//Set lại link cho tag a sau khi nhấn trái tim
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

//Hiển thị sản phẩm yêu thích trong thông báo
var items=document.querySelector(".header__notify-list").innerHTML;
if(localStorage.getItem("favouriteProduct")!=null){
    var favouriteProduct=JSON.parse(localStorage.getItem("favouriteProduct"));
    for(var i=0;i<3;i++){
        if(favouriteProduct[i]!=null){
            var imgProduct=favouriteProduct[i].imgProduct;
            var imgReplace=imgProduct.replace(/url/gi,"");
            var imgSplitfirst=imgReplace.split("(")[1];
            var imgResult=imgSplitfirst.split(")")[0];  
        
            items+=
            `
            <li class="header__notify-item">
                <a href="../html/detailProduct.html" class="header__notify-link" onclick="setCurrentProduct(${favouriteProduct[i].idProduct});">
                    <img src=${imgResult} alt="" class="header__notify-img">
                    <div class="header__notify-infor">
                        <span class="header__notify-name">${favouriteProduct[i].nameProduct}</span>
                        <span class="header__notify-desc">${favouriteProduct[i].currentPrice}</span>
                    </div>
                </a>
            </li>
            `
            document.querySelector(".header__notify-list").innerHTML=items;
        }
    }
}

//Pagination
var pages=document.querySelectorAll(".pagination-item");
var currentValue=1;
function setPage(flag){
    for(page of pages){
        page.classList.remove('pagination-item--active');
    }
    event.target.parentElement.classList.add('pagination-item--active');
    currentValue=event.target.parentElement.value;
    if(flag==1){
        randomProduct();
    }
    else{
        randomProductH();
    }
}

function backPage(flag){
    if(currentValue > 1){
        for(page of pages){
            page.classList.remove('pagination-item--active');
        }
        currentValue--;
        pages[currentValue].classList.add('pagination-item--active');
    }
    if(flag==1){
        randomProduct();
    }
    else{
        randomProductH();
    }
}

function nextPage(flag){
    if(currentValue < 5){
        for(page of pages){
            page.classList.remove('pagination-item--active');
        }
        currentValue++;
        pages[currentValue].classList.add('pagination-item--active');
    }
    if(flag==1){
        randomProduct();
    }
    else{
        randomProductH();
    }
}


// Hiển thị sản phẩm ngẫu nhiên theo loại
function randomProduct(){
    var listProduct=getCurrentProduct();
    var listItemProduct=document.querySelectorAll(".home-product-item");
    var favouriteProduct=JSON.parse(localStorage.getItem("favouriteProduct"));
    var checkProductRandom=new Array(101).fill(0);
    var index=0;

    while(index<listItemProduct.length){
        var indexRandom=Math.floor(Math.random()*listProduct.length);
        var product=listProduct[indexRandom];

        if(checkProductRandom[product.idProduct]==0){
            listItemProduct[index].id=product.idProduct;
            listItemProduct[index].children[0].style.backgroundImage=product.imgProduct;
            listItemProduct[index].children[1].innerText=product.nameProduct;
            listItemProduct[index].children[2].children[0].innerText=product.oldPrice;
            listItemProduct[index].children[2].children[1].innerText=product.currentPrice;
            listItemProduct[index].children[3].children[2].innerText=product.qtySold+' đã bán';
            listItemProduct[index].children[4].children[0].innerText=product.brand;
            listItemProduct[index].children[4].children[1].innerText=product.origin;
            listItemProduct[index].children[6].children[0].innerText=product.discount+'%';
    
            for(item of favouriteProduct){
                if(item.idProduct==product.idProduct){
                    listItemProduct[index].children[3].children[0].classList.add('home-product-item__heart--liked');
                    listItemProduct[index].children[5].style.display="block";
                    break;
                }
                else{
                    if(listItemProduct[index].children[3].children[0].classList.contains('home-product-item__heart--liked')){
                        listItemProduct[index].children[3].children[0].classList.remove('home-product-item__heart--liked');
                        listItemProduct[index].children[5].style.display="none";
                    }
                }
            }
           
            checkProductRandom[product.idProduct]=1;
            index++;
        }
    
    }
}

function getCurrentProduct(){
    var currentListProduct=document.querySelectorAll(".home-product-item");
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

// Hiển thị sản phẩm ngẫu nhiên trong tab Sản phẩm
function randomProductH(){
    var listProduct=JSON.parse(localStorage.getItem("listProduct"));
    var listItemProduct=document.querySelectorAll(".home-product-item");
    var favouriteProduct=JSON.parse(localStorage.getItem("favouriteProduct"));
    var checkProductRandom=new Array(101).fill(0);
    var index=0;

    while(index<listItemProduct.length){
        var indexRandom=Math.floor(Math.random()*listProduct.length);
        var product=listProduct[indexRandom];

        if(checkProductRandom[product.idProduct]==0){
            listItemProduct[index].id=product.idProduct;
            listItemProduct[index].children[0].style.backgroundImage=product.imgProduct;
            listItemProduct[index].children[1].innerText=product.nameProduct;
            listItemProduct[index].children[2].children[0].innerText=product.oldPrice;
            listItemProduct[index].children[2].children[1].innerText=product.currentPrice;
            listItemProduct[index].children[3].children[2].innerText=product.qtySold+' đã bán';
            listItemProduct[index].children[4].children[0].innerText=product.brand;
            listItemProduct[index].children[4].children[1].innerText=product.origin;
            listItemProduct[index].children[6].children[0].innerText=product.discount+'%';
    
            for(item of favouriteProduct){
                if(item.idProduct==product.idProduct){
                    listItemProduct[index].children[3].children[0].classList.add('home-product-item__heart--liked');
                    listItemProduct[index].children[5].style.display="block";
                    break;
                }
                else{
                    if(listItemProduct[index].children[3].children[0].classList.contains('home-product-item__heart--liked')){
                        listItemProduct[index].children[3].children[0].classList.remove('home-product-item__heart--liked');
                        listItemProduct[index].children[5].style.display="none";
                    }
                }
            }
           
            checkProductRandom[product.idProduct]=1;
            index++;
        }
    
    }
}