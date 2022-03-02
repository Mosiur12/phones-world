
const noFound = document.getElementById('not-found');
noFound.style.display = 'none';

const searchPhone = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value ;
    
// -------clear data
    searchField.value = "";

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

    fetch(url)
    .then (res => res.json())
    .then (data => displaySearch(data.data));
}

const displaySearch = data =>{
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = "";

    if (data.length==0){
      noFound.style.display = 'block';
    }

    data.forEach(phone => {
        // console.log(phone);
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

const details = (detail) => {
  // console.log(detail);
  const url = `https://openapi.programming-hero.com/api/phone/${detail}`;
  fetch(url)
  .then(res => res.json())
  .then(data => detailInfo(data.data));
  };

  const detailInfo = (info) => {
   
    document.getElementById('detail-phone').innerHTML=`
    
 
    
    <div class="col container d-flex justify-content-center">
    <div class="card h-100  text-center p-2 w-50">
    <div> 
    <img src="${info.image}" class="card-img-top w-50 " alt="...">
    </div>
    
      <div class="card-body">
      <h5> <span class="fs-4">${info.name} </span> </h5>
        <h5> <span class="fs-6 relase-date">${info.releaseDate ?info.releaseDate:"No release date Found"}</span> </h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
    
    `;
    

  }