
let a =[1,2,3,4];
let display = document.querySelector("#Display");
let form = document.querySelector("#Form");
display.style.display = "none";


function showSanPham(){
    form.style.display = "none"; 
    display.style.display = "block";

    
    let sosanphammoitrang = 3;
    let tongsotrang = Math.ceil(Product.length/sosanphammoitrang);
    let sotranghientai = 1;
    let vitrihientai = (sotranghientai -1)  * sosanphammoitrang;


    let butt = ``;
    for(let i = 1 ; i<=tongsotrang;i++)
        butt += `
        <div class="item" onclick="nuttrang(this)" name="${i}">${i}</div>
    `;


    let n = 0;
    let a = ``;
    for(let i = vitrihientai     ; i < Product.length;i++){
        if(n == sosanphammoitrang) break; 

        a += `
        <div class="item">
                                    <img src="${Product[i].images[0]}">
                                    <div class="content">
                                        <p>Tên: ${Product[i].name}</p>
                                        <p>Loại: ${Product[i].category}</p>
                                        <p>Giá: ${Product[i].price} VNĐ</p>
                                    </div>
                                    <div class="button">
                                        <select name="size">
                                            <option value="none" selected>Select Size</option>
                                            <option value="xxl">XXL</option>
                                            <option value="xl">XL</option>
                                            <option value="large">Large</option>
                                            <option value="medium">Medium</option>
                                            <option value="small">Small</option>
                                        </select>
                                        <div class="add">
                                        <input type="number" value="1" min="1">
                                        <div>Thêm vào giỏ</div>
                                        </div>
                                    </div>
            </div>
        `
        n++;
    }


    let showsanpham = document.querySelector("#Display .display");
    showsanpham.innerHTML = a;
    if(tongsotrang == 1) return 0;
    let shownut = document.querySelector("#Display .foot .button");
    if(tongsotrang != 1) 
     shownut.innerHTML = butt;
    else shownut.innerHTML = "";

}



function showThanhToan(){
    form.style.display  = "block";
    display.style.display = "none";
}

function nuttrang(trang){
    let sosanphammoitrang = 3;
    let tongsotrang = Math.ceil(Product.length/sosanphammoitrang);
    let vitrihientai = (trang.getAttribute("name")-1)  * sosanphammoitrang;


let n =0 ;
let a = ``;
    for(let i = vitrihientai     ; i <Product.length;i++){
        if(n == sosanphammoitrang) break; 

        a += `
        <div class="item">
                                    <img src="${Product[i].images[0]}">
                                    <div class="content">
                                        <p>Tên: ${Product[i].name}</p>
                                        <p>Loại: ${Product[i].category}</p>
                                        <p>Giá: ${Product[i].price} VNĐ</p>
                                    </div>
                                    <div class="button">
                                        <select name="size">
                                            <option value="none" selected>Select Size</option>
                                            <option value="xxl">XXL</option>
                                            <option value="xl">XL</option>
                                            <option value="large">Large</option>
                                            <option value="medium">Medium</option>
                                            <option value="small">Small</option>
                                        </select>
                                        <div class="add">
                                        <input type="number" value="1" min="1">
                                        <div>Thêm vào giỏ</div>
                                        </div>
                                    </div>
            </div>
        `
        n++;
    }
    let showsanpham = document.querySelector("#Display .display");
    showsanpham.innerHTML = a;

}