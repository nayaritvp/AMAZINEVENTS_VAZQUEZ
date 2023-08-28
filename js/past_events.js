const cardsContent = document.querySelector("#contenedorevents");

function createCard(events) {
    const card = document.createElement("div");
    card.classList.add('col-12','col-sm-6','col-md-4','col-xl-3')
    card.innerHTML = `
    <div class="card h-100 d-flex text-center text-bg-secondary mb-3">
    <img src="${events.image}" class="card-img-top" alt="${events.name}">
    <div class="card-body">
        <h5 class="card-title">${events.name}</h5>
        <h5 class="card-title">${events.date}</h5>
        <p class="card-text">${events.description}</p>
        <p>$${events.price}</p>
        <a href="#" class="btn btn-light">details</a>
    </div>`;
  
    cardsContent.appendChild(card);
  }

window.onload = () => {
    const currentDate = data.currentDate;
    for (const events of data.events) {
        if (new Date(events.date) < new Date(currentDate)) {
            createCard(events);
        }
    }
};