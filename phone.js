// -----------error handle--------
const noFound = document.getElementById('not-found');
noFound.style.display = 'none';

const searchPhone = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value ;
    
// -------clear data---
    searchField.value = "";

    // --------load data----

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

    fetch(url)
    .then (res => res.json())
    .then (data => displaySearch(data.data.slice(0 , 20)));
}

const displaySearch = data =>{
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = "";

    if (data.length==0){
      noFound.style.display = 'block';
    }

    data.forEach(phone => {
        
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 shadow-lg p-3 mb-5 bg-body rounded">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">${phone.brand}</p>
          <button onclick="details('${phone.slug}')" type="button" class="btn btn-primary">Details</button>
        </div>
      </div>`;

        searchResult.appendChild(div);
    });


}


// ---------phone detail information

const details = (detail) => {
  
  const url = `https://openapi.programming-hero.com/api/phone/${detail}`;
  fetch(url)
  .then(res => res.json())
  .then(data => detailInfo(data.data));
  };

  const detailInfo = (info) => {
    
   document.getElementById('detail-phone').innerHTML=`
    
 
    
    <div class="col container d-flex justify-content-center">
    <div class="card h-100  p-2 w-50">
    <div class="text-center"> 
    <img src="${info.image}" class="card-img-top w-50 " alt="...">
    </div>
    
      <div class="card-body">
      <h5 class="text-center"> <span class="fs-4">${info.name} </span> </h5>
        <h5 class="text-center"> <span class="fs-6 relase-date">${info.releaseDate ?info.releaseDate:"No release date Found"}</span> </h5>

        
        <h5>Main Features :</h5>
        <p><span class="fs-5">storage: </span> ${info.mainFeatures.storage}</p>
        <p><span class="fs-5">display: </span> ${info.mainFeatures.displaySize}</p>
        <p><span class="fs-5">chipset: </span> ${info.mainFeatures.chipSet}</p>
        <p><span class="fs-5">memory: </span> ${info.mainFeatures.memory}</p>

        <p><span class="fs-5">sensor: </span> ${info.mainFeatures.sensors}</p>



        <h5>Others Information:</h5>
      ${info.others ? ` <div> <p><span class="fs-5">Wlan: </span> ${info.others.WLAN}</p>
      <p><span class="fs-5">Bluetiith: </span> ${info.others.Bluetooth}</p>
      <p><span class="fs-5">GPS: </span> ${info.others.GPS}</p>
      <p><span class="fs-5">NFC: </span> ${info.others.NFC}</p>
      <p><span class="fs-5">Radio: </span> ${info.others.Radio}</p>
      <p><span class="fs-5">USB: </span> ${info.others.USB}</p></div>`:"This product of others property is not found" }

      </div>
    </div>
  </div>
    
    `;

  }