
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
    console.log(info);

  }