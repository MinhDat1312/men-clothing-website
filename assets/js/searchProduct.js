// Hiển thị danh sách sản phẩm tìm kiếm
function searchProduct(){
    var msgProduct=document.querySelector(".header__search-input").value;
    localStorage.setItem("msgSearchProduct",JSON.stringify(msgProduct));
    document.querySelector(".header__search-input").value="";
    var listProduct=JSON.parse(localStorage.getItem("listProduct"));

    var productsSearch=listProduct.filter(value => {
        return value.nameProduct.toLowerCase().includes(msgProduct.toLowerCase());
    });

    if(productsSearch.length==0 || productsSearch==null){
        document.querySelector(".noResult").style.display="flex";
        document.querySelector(".container__row--top").style.display="none";
    }
    else{
        document.querySelector(".noResult").style.display="none";
        document.querySelector(".container__row--top").style.display="flex";
    }
    
    document.querySelector(".home-product").innerHTML='';

    var products="";
    products+=`<div class="row">`;
    productsSearch.map(value => {
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
                        <div class="home-product-item__sold">88 đã bán</div>
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
                        <span class="home-product-item__percent">43%</span>
                        <span class="home-product-item__label">GIẢM</span>
                    </div>
                </div>
            </a>
        </div>

        `
    });
    products+=`</div>`
    document.querySelector(".home-product").innerHTML=products;
    console.log(document.querySelector(".home-product").innerHTML);
}