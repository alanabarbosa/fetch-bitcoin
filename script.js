const selectValue = document.querySelector("#SelectOption");
const btcDisplay = document.querySelector(".btc");
const boxImages = document.querySelector(".boximgProduto");
const innerImgBox = boxImages.getElementsByTagName("img");

//Consultar a API BTC
const fetchBtc = () => {
    fetch("https://blockchain.info/ticker")
        .then((response) => response.json())
        .then((btcJson) => {
            Object.keys(btcJson).forEach((item) => {     
                console.log(btcJson)         
                btcToday = btcJson[item].buy;         
                option = new Option(item);   
                selectValue.options[selectValue.options.length] = option;
                option.setAttribute("value", currencyFormat(btcToday, item));
                option.setAttribute("id", item);

            });
        });
}
fetchBtc();

const select = () => {
    selectValue.addEventListener("change", () => {
        valueSelect = selectValue.options[selectValue.selectedIndex].value;
        btcDisplay.innerText = valueSelect;
        removeFlag();
        showFlag(selectValue.selectedIndex);
    });
}
select()

const removeFlag = () => {
    for (let img of innerImgBox) {
        img.style.display = "none";
    }
}

const showFlag = (index)  => {
    const currentImg = boxImages.children[index - 1];
    currentImg.style.display = "block";
}

const currencyFormat = (value, country) => {
    const locales = ["pt-br", "ja-jp", "en-in"];
    return new Intl.NumberFormat(locales, {
        style: "currency",
        currency: country,
    }).format(value);
}
