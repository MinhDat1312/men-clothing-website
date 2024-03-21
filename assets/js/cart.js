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
    var cart__notice=document.querySelector(".header__cart-notice");
    if(localStorage.getItem("QtyCart")!=null){
        var json=localStorage.getItem("QtyCart");
        var qty=JSON.parse(json);
        cart__notice.innerText=++qty;
        var setJson=JSON.stringify(qty);
        localStorage.setItem("QtyCart",setJson);
        cart__notice.style.display="block"; 
    }
    else{
        cart__notice.innerText=1;
        var json=JSON.stringify(cart__notice.innerText);
        localStorage.setItem("QtyCart",json);
        cart__notice.style.display="block";
    }

    document.querySelector(".header__cart-list").classList.remove('header__cart-list--no-cart');
    document.querySelector('.header__cart-title').style.display="block"
    document.querySelector('.header__cart-list-buy').style.display="block"
    document.querySelector('.header__cart-view').style.display="block"

    var json=localStorage.getItem("currentProduct");
    var product=JSON.parse(json);
    var imgProduct=product.imgProduct;
    var imgReplace=imgProduct.replace(/url/gi,"");
    var imgSplitfirst=imgReplace.split("(")[1];
    var imgResult=imgSplitfirst.split(")")[0];
    var nameProduct= product.nameProduct;
    var price=product.currentPrice;
    var qty=document.querySelector('.detail-product-item__qty-num').innerText;
    var typeProduct=product.nameProduct.split(' ')[0];

    // Thêm sản phẩm vào danh sách rồi lưu vào local storage
    var addProduct= createProductCart(product.idProduct,imgProduct,nameProduct,
        price, qty, typeProduct);

    var json=localStorage.getItem("listProductCart");
    var list=JSON.parse(json);

    var check=0;
    for(var i=0;i<list.length;i++){
        var res=list[i];
        if(res.idProduct==addProduct.idProduct){
            check=1;
        }
    }
    if(check==0){
        list.push(addProduct);
    }
    var data=JSON.stringify(list);
    localStorage.setItem("listProductCart",data);

    // Hiển thị danh sách sản phẩm trong giỏ hàng
    var listProduct=document.querySelector('.header__cart-list-buy').innerHTML;
    listProduct+=
            `
            <li class="header__cart-list-item">
            <img src=${imgResult} alt="" class="header__cart-img">
            <div class="header__cart-infor">
                <div class="header__cart-infor-one">
                    <h5 class="header__cart-infor-name">${nameProduct}</h5>
                    <div class="header__cart-infor-price-wrap">
                       <span class="header__cart-infor-price">${price}</span>
                        <span class="header__cart-infor-mutiply">x</span>
                        <span class="header__cart-infor-qty">${qty}</span>
                    </div>
                </div>
                    <div class="header__cart-infor-two">
                        <span class="header__cart-infor-des">Phân loại hàng: ${typeProduct}</span>
                        <span class="header__cart-infor-remove">Xóa</span>
                    </div>
                </div>
            </li>
            `;
    document.querySelector('.header__cart-list-buy').innerHTML = listProduct;
}

if(localStorage.getItem("listProductCart")!=null){
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
                <img src=${imgResult} alt="" class="header__cart-img">
                <div class="header__cart-infor">
                    <div class="header__cart-infor-one">
                        <h5 class="header__cart-infor-name">${listHome[i].nameProduct}</h5>
                        <div class="header__cart-infor-price-wrap">
                           <span class="header__cart-infor-price">${listHome[i].currentPrice}</span>
                            <span class="header__cart-infor-mutiply">x</span>
                            <span class="header__cart-infor-qty">${listHome[i].qty}</span>
                        </div>
                    </div>
                        <div class="header__cart-infor-two">
                            <span class="header__cart-infor-des">Phân loại hàng: ${listHome[i].type}</span>
                            <span class="header__cart-infor-remove">Xóa</span>
                        </div>
                    </div>
                </li>
                `;
    }
    document.querySelector('.header__cart-list-buy').innerHTML = listProduct;
}

