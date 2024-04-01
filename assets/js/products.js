var json=localStorage.getItem("listProductCart");
var data=JSON.parse(json);

var rowProduct=document.querySelector(".content__product-wrapper").innerHTML;

for(var i=0;i<data.length;i++){
    var imgProduct=data[i].imgProduct;
    var imgReplace=imgProduct.replace(/url/gi,"");
    var imgSplitfirst=imgReplace.split("(")[1];
    var imgResult=imgSplitfirst.split(")")[0];

    var totalPrice= Number(data[i].currentPrice.replace(/\D/g,"")) * Number(data[i].qty);
    var formatTotalPrice=totalPrice.toLocaleString("vi-VN");

    rowProduct+=
    `
    <div class="row content__product__item">
        <div class="col content__product__col content__product__col-check">
            <input id="${data[i].idProduct}" type="checkbox" class="content__product__input" onclick="checkOne(); checkPrice(id);">
            <a href="../html/detailProduct.html" class="content__product__link" onclick="setCurrentProduct(${data[i].idProduct});">
                <img src=${imgResult} alt="" class="content__product__img">
                <div class="content__product__name-product">
                    ${data[i].nameProduct}
                </div>
            </a>
        </div>
        <div class="col content__product__col content__product__col-desc content__product__col-desc--active  justify-content-lg-between justify-content-sm-between justify-content-end">
            <span class="content__product__price">${data[i].currentPrice}</span>
            <div class="detail-product-item__qty-btn content-product-item__qty-btn">
                <button class="detail-product-item__qty-minus content-product-item__qty-minus">-</button>
                <span class="detail-product-item__qty-num content-product-item__qty-num">${data[i].qty}</span>
                <button class="detail-product-item__qty-plus content-product-item__qty-plus">+</button>
            </div>
            <span class="content__product__total">${formatTotalPrice}đ</span>
            <span class="content__product__active"  onclick="deleteProductCart(this,${data[i].idProduct});">Xóa</span>
        </div>
    </div>

    `

    document.querySelector(".content__product-wrapper").innerHTML=rowProduct;
}

//Xóa sản phẩm trong Cart
function deleteProductCart(x, idProduct){
    var itemDelete=x.parentElement.parentElement;
    itemDelete.remove();

    var total=Number(document.querySelector(".content__product__btn-total").innerText.replace(/\D/g,""));

    var json=localStorage.getItem("listProductCart");
    var list=JSON.parse(json);
    for(var i=0;i<list.length;i++){
        if(list[i].idProduct==idProduct){
            if(total!=0){
                total-=(Number(list[i].currentPrice.replace(/\D/g,"")) * Number(list[i].qty));
                document.querySelector(".content__product__btn-total").innerText=total.toLocaleString("vi-VN")+"đ";
            }
            list.splice(i,1);
        }
    }

    var data=JSON.stringify(list);
    localStorage.setItem("listProductCart",data);

    var json=localStorage.getItem("listProductCart");
    var data=JSON.parse(json);

    localStorage.setItem("QtyCart",data.length);

    if(localStorage.getItem("listProductCart")==null || JSON.parse(localStorage.getItem("listProductCart")).length<=0){
        document.querySelector(".content__products").classList.add("header__cart-list--no-cart");
        document.querySelector(".content__product__row").style.display="none";
        document.querySelector(".content__product__btn").style.display="none";
    }
    else{
        document.querySelector(".content__products").classList.remove("header__cart-list--no-cart");
        document.querySelector(".content__product__row").style.display="flex";
        document.querySelector(".content__product__btn").style.display="flex";
    }
}

//Checked tất cả sản phẩm
function checkAll(){
    var inputs=document.getElementsByClassName('content__product__input');
    var json=localStorage.getItem("listProductCart");
    var data=JSON.parse(json);
    var totalPrice=0;
    var j=0;
    if(inputs[0].checked){
        for(var i=1;i<inputs.length;i++){
            inputs[i].checked=true;
            totalPrice+=Number(data[j].currentPrice.replace(/\D/g,"")) * Number(data[j].qty);
            j++;
        }
        document.querySelector(".content__product__btn-total").innerText=totalPrice.toLocaleString("vi-VN")+"đ";
    }
    else{
        for(var i=1;i<inputs.length;i++){
            inputs[i].checked=false;
        }
        document.querySelector(".content__product__btn-total").innerText=0+"đ";
    }
}
//Checked từng sản phẩm thì bỏ checked tất cả
function checkOne(){
    var inputs=document.getElementsByClassName('content__product__input');
    for(var i=1;i<inputs.length;i++){
        if(inputs[i].checked==true){
            inputs[0].checked=false;
        }
    }
}
// Hiển thị tổng giá khi check vào sản phẩm
function checkPrice(id){
    var json=localStorage.getItem("listProductCart");
    var data=JSON.parse(json);
    var currentPrice=0, qty=0;
    for(var i=0;i<data.length;i++){
        if(data[i].idProduct==id){
            currentPrice=Number(data[i].currentPrice.replace(/\D/g,""));
            qty=Number(data[i].qty);
            break;
        }
    }

    var input=document.getElementById(id);
    var total=Number(document.querySelector(".content__product__btn-total").innerText.replace(/\D/g,""));
    if(input.checked==true){
        var price=currentPrice*qty;
        total+=Number(price);
    }
    else{
        if(total!=0){
            var price=currentPrice*qty;
            total-=Number(price);
        }
    }
    document.querySelector(".content__product__btn-total").innerText=total.toLocaleString("vi-VN")+"đ";
}

// Thiết lập currentProduct khi nhấp vào sản phẩm trong Cart để xem thông tin sản phẩm
function setCurrentProduct(idProduct){
    var json=JSON.stringify(idProduct);
    localStorage.setItem("currentProduct",json);
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

// Hiển thị kết quả tìm kiếm
function pageSearchProduct(){
    var msgProduct=document.querySelector(".header__search-input").value;
    if(msgProduct!=""){
        var msgProducts=null;
        if(localStorage.getItem("msgSearchProduct")==null){
            msgProducts=new Array();
        }
        else{
            msgProducts=JSON.parse(localStorage.getItem("msgSearchProduct"));
        }

        if(msgProduct!=""){
            if(msgProducts.length==3){
                var tmp=msgProducts[0];
                msgProducts[0]=msgProducts[1];
                msgProducts[1]=msgProducts[2];
                msgProducts[2]=tmp;

                msgProducts.pop();
            }

            msgProducts.push(msgProduct);
        }
        localStorage.setItem("msgSearchProduct",JSON.stringify(msgProducts));
        
        var listProductCart=JSON.parse(localStorage.getItem("listProductCart"));
        var productsSearch=listProductCart.filter(value => {
            return value.nameProduct.toLowerCase().includes(msgProduct.toLowerCase());
        });


        if(productsSearch.length<=0 || productsSearch==null){
            notifyFailed();
            document.querySelector(".content__product-wrapper").innerHTML="";
            var rowProduct=document.querySelector(".content__product-wrapper").innerHTML;

            for(var i=0;i<listProductCart.length;i++){
                var imgProduct=listProductCart[i].imgProduct;
                var imgReplace=imgProduct.replace(/url/gi,"");
                var imgSplitfirst=imgReplace.split("(")[1];
                var imgResult=imgSplitfirst.split(")")[0];

                var totalPrice= Number(listProductCart[i].currentPrice.replace(/\D/g,"")) * Number(listProductCart[i].qty);
                var formatTotalPrice=totalPrice.toLocaleString("vi-VN");

                rowProduct+=
                `
                <div class="row content__product__item">
                    <div class="col content__product__col content__product__col-check">
                        <input id="${listProductCart[i].idProduct}" type="checkbox" class="content__product__input" onclick="checkOne(); checkPrice(id);">
                        <a href="../html/detailProduct.html" class="content__product__link" onclick="setCurrentProduct(${listProductCart[i].idProduct});">
                            <img src=${imgResult} alt="" class="content__product__img">
                            <div class="content__product__name-product">
                                ${listProductCart[i].nameProduct}
                            </div>
                        </a>
                    </div>
                    <div class="col content__product__col content__product__col-desc content__product__col-desc--active  justify-content-lg-between justify-content-sm-between justify-content-end">
                        <span class="content__product__price">${listProductCart[i].currentPrice}</span>
                        <div class="detail-product-item__qty-btn content-product-item__qty-btn">
                            <button class="detail-product-item__qty-minus content-product-item__qty-minus">-</button>
                            <span class="detail-product-item__qty-num content-product-item__qty-num">${listProductCart[i].qty}</span>
                            <button class="detail-product-item__qty-plus content-product-item__qty-plus">+</button>
                        </div>
                        <span class="content__product__total">${formatTotalPrice}đ</span>
                        <span class="content__product__active"  onclick="deleteProductCart(this,${listProductCart[i].idProduct});">Xóa</span>
                    </div>
                </div>

                `

                document.querySelector(".content__product-wrapper").innerHTML=rowProduct;
            }

            var start=setTimeout(function (){
                window.location.href="../html/products.html";
            },1000);
        }
        else{
            document.querySelector(".content__product__row").style.display="flex";
            document.querySelector(".content__product__btn").style.display="flex";

            document.querySelector(".content__product-wrapper").innerHTML="";
            var row="";
            for(var i=0;i<productsSearch.length;i++){
                var imgProduct=productsSearch[i].imgProduct;
                var imgReplace=imgProduct.replace(/url/gi,"");
                var imgSplitfirst=imgReplace.split("(")[1];
                var imgResult=imgSplitfirst.split(")")[0];
            
                var totalPrice= Number(productsSearch[i].currentPrice.replace(/\D/g,"")) * Number(productsSearch[i].qty);
                var formatTotalPrice=totalPrice.toLocaleString("vi-VN");
            
                row+=
                `
                <div class="row content__product__item">
                    <div class="col content__product__col content__product__col-check">
                        <input id="${productsSearch[i].idProduct}" type="checkbox" class="content__product__input" onclick="checkOne(); checkPrice(id);">
                        <a href="../html/detailProduct.html" class="content__product__link" onclick="setCurrentProduct(${data[i].idProduct});">
                            <img src=${imgResult} alt="" class="content__product__img">
                            <div class="content__product__name-product">
                                ${productsSearch[i].nameProduct}
                            </div>
                        </a>
                    </div>
                    <div class="col content__product__col content__product__col-desc content__product__col-desc--active  justify-content-lg-between justify-content-sm-between justify-content-end">
                        <span class="content__product__price">${productsSearch[i].currentPrice}</span>
                        <div class="detail-product-item__qty-btn content-product-item__qty-btn">
                            <button class="detail-product-item__qty-minus content-product-item__qty-minus">-</button>
                            <span class="detail-product-item__qty-num content-product-item__qty-num">${productsSearch[i].qty}</span>
                            <button class="detail-product-item__qty-plus content-product-item__qty-plus">+</button>
                        </div>
                        <span class="content__product__total">${formatTotalPrice}đ</span>
                        <span class="content__product__active"  onclick="deleteProductCart(this,${productsSearch[i].idProduct});">Xóa</span>
                    </div>
                </div>
            
                `
                document.querySelector(".content__product-wrapper").innerHTML=row;
            }
        }
    }
    else{
        document.querySelector(".modal-notify--mod i").style.color="rgb(239, 33, 33)";
        var start=setTimeout(function (){
            document.querySelector(".modal-notify--mod").style.display="flex";
        },200);
        var stop=setTimeout(function (){
            clearTimeout(start);
            document.querySelector(".modal-notify--mod").style.display="none";
        },2000);

        setTimeout(function (){
            window.location.href="../html/products.html";
        },2000);
    }
    document.querySelector(".header__search-history").style.display="none";
    document.querySelector(".header__search-input").value="";
}

// Hiển thị thông báo khi không tìm thấy 
function notifyFailed(){
    var start=setTimeout(function (){
        document.querySelector(".modal-notify--noresult").style.display="flex";
        document.querySelector(".modal-notify--noresult i").style.color="rgb(239, 33, 33)";
    },200);
    var stop=setTimeout(function (){
        clearTimeout(start);
        document.querySelector(".modal-notify--noresult").style.display="none";
    },2000);
}
