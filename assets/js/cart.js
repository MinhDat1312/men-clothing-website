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
var favouriteProduct=null;
if(localStorage.getItem("favouriteProduct")!=null){
    favouriteProduct=JSON.parse(localStorage.getItem("favouriteProduct"));
}
else{
    favouriteProduct=new Array();
}
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
                        list.splice(j,1);
                    }
                }
                localStorage.setItem("favouriteProduct",JSON.stringify(list));
            }
        }
        else{
            listHeart[i].classList.add("home-product-item__heart--liked");
            var idProduct=listHeart[i].parentElement.parentElement.id;
            listHeart[i].parentElement.parentElement.parentElement.href="#idProduct";
            document.getElementsByClassName("home-product-item__favourite")[i].style.display="block";

            for(var j=0;j<listProduct.length;j++){
                if(listProduct[j].idProduct==idProduct){
                    favouriteProduct.push(listProduct[j]);
                }
            }

            localStorage.setItem("favouriteProduct",JSON.stringify(favouriteProduct));
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
