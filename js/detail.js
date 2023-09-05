let parametros = new URLSearchParams(window.location.search)
let id = parametros.get("id")
const contenedorevents = document.getElementById('contenedorevents')

let evento = buscarevento(id);

pintartarjeta(evento,contenedorevents)

function createCard(eventos){
    return `<div class="col-12 col-sm-6 col-md-4 col-xl-3">
    <div class="card d-flex h-100 text-center text-bg-secondary mb-3 my-3">
        <img src="${eventos.image}" class="card-img-top" alt="${eventos.name}">
        <div class="card-body">
            <h5 class="card-title">${eventos.name}</h5>
            <h5 class="card-title">${eventos.date}</h5>
            <h5 class="card-title">${eventos.place}</h5>
            <h5 class="card-title">${eventos.category}</h5>
            <p class="card-text">${eventos.description}</p>
            <p class="card-text">capacity<br>${eventos.capacity}</p>
            <p class="card-text">estimate or assistance<br>${eventos.estimate !== undefined ? eventos.estimate : eventos.assistance}</p>
            <p>$${eventos.price}</p>
            <a href="./details.html?id=${eventos._id}" class="btn btn-light">details</a>
        </div>
    </div>
  </div>`;
}

function pintartarjeta(element,contenedorevents){
    contenedorevents.innerHTML = createCard(element)
}

function buscarevento(id){
    return data.events.find(evento => evento._id == id)
}
