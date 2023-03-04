const button = document.querySelector(".buttonFind");
const baseUrl = `https://restcountries.com/v3.1/`;
const loading = document.querySelector(".loading");

async function findCountry() {

    const searchInput = document.querySelector(".searchInput").value;

    let url;
    if (searchInput) {
        url = `${baseUrl}name/${searchInput}?fullText=true`;
    } else{
        url = `${baseUrl}all`
    }

    try {
        const response = await fetch(url);
        const data = await response.json();


        const row = document.querySelector(".row");
        row.innerHTML = "";

        if (!data.length) {
            const notFound = document.createElement("div");
            notFound.className = "notfound"
            notFound.innerHTML = `<p class="not-found">Not Found <span>404</span></p>`
            row.appendChild(notFound);
        } else{
            data.map((davlat)=>{
                const { flags, name, population, currencies } = davlat;
                let populationFixed;
                if (population > 1000000) {
                    populationFixed = `${Math.floor(population/1000000).toFixed()} mln`
                } else if(population > 1000){
                    populationFixed = `${Math.floor(population/1000).toFixed()} ming`;
                } else{
                    populationFixed = `Axoli juda kam`
                }
                const currenciesInArray = Object.keys(currencies)[0];
                const currenciesInArray2 = Object.entries(currencies)[0][1].name;
    
                const countryElement = document.createElement('div');
                countryElement.className = ("col-lg-4 col-md-6");
                const allWrapper = document.createElement("div");
                allWrapper.className = ("country")
                const flagElement = document.createElement('img');
                const countryName = document.createElement('h3');
                const populationElement = document.createElement('span');
                const currencyElement = document.createElement('span');
    
                flagElement.src = flags.png;
                flagElement.alt = name.common;
                countryName.innerText = `Country: ${name.common}`;
                countryElement.appendChild(flagElement);
                populationElement.innerText = `Population: ${populationFixed}`;
                currencyElement.textContent = `Curenncy: ${currenciesInArray2}. ${currenciesInArray}`; 
    
                allWrapper.append(flagElement ,countryName, populationElement, currencyElement);
                countryElement.appendChild(allWrapper);
                row.appendChild(countryElement);
            })

            const pagination = document.querySelector(".pagination-wrapper");
            pagination.innerHTML = "";

        }
    } catch (error) {
        console.error(error.message);
    } finally{
        const loader = document.querySelector(".loader");
        if (loader) {
            loading.remove(loader)
        }
    }
}

const searchInput = document.querySelector('.searchInput');
const btn = document.querySelector('.buttonFind');

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        findCountry();
        searchInput.value = "";
    }
});
btn.addEventListener('click', () => {
    findCountry();
    searchInput.value = "";

});

setTimeout(findCountry, 1000);
