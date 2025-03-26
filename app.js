const apiUrl = "https://v6.exchangerate-api.com/v6/2fc8edd349a4324b3e9c683b/latest/";
const dropdownSelect = document.querySelectorAll(".drop-down select");
const btn = document.querySelector('form button');
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector('.msg p');

btn.addEventListener('click', (event)=>{
    event.preventDefault();
    getExchangeRate();
})

async function getExchangeRate(){
    let amount = document.querySelector('.amount input');
    let amountValue  = amount.value;
    if(amount.value === '' || amount.value < 1){
        amount.value = "1";
        amountValue = 1;
    }
    // console.log(amountValue);

    let toConvert = toCurr.value;
    // console.log(toConvert);

    const response = await fetch(apiUrl+fromCurr.value);
    const getData = await response.json();
    // console.log(getData);

    let convertRate = getData.conversion_rates[toConvert] * amountValue;
    convertRate = convertRate.toFixed(2);
    msg.innerHTML = `${amountValue} ${fromCurr.value} = ${convertRate} ${toConvert}`

}

for(let select of dropdownSelect){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        newOption.style.backGround = "transparent";
        if(select.name === "From" && currCode === "USD"){
            newOption.selected = "Selected";
        }
        else if(select.name === "To" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener('change', (e) =>{
        updateFlag(e.target);
    })
}

const updateFlag = (element) =>{
    const currCode = element.value;
    // console.log(currCode);
    const countryCode = countryList[currCode];
    // console.log("Country code is : ", countryCode);
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
}