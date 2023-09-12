let dataev = null

let parametros = new URLSearchParams(window.location.search)
let id = parametros.get("id")
const contenedorevents = document.getElementById('contenedorevents')

/*let evento = buscarevento(id);*/

/*pintartarjeta(evento,contenedorevents)*/

function traerDatos(){
    fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(data => {
      dataev = data
      let evento = buscarevento(id);
            pintartarjeta(evento, contenedorevents);
    })
.catch(error => console.log(error))
}

function createCard(eventos){
    return `<div class="col-sm-6">
    <div class="card d-flex h-100 m-5 text-center text-bg-secondary mb-3 my-3">
        <img src="${eventos.image}" class="card-img-top" alt="${eventos.name}">
        <div class="card-body">
            <h5 class="card-title">Event Name: ${eventos.name}</h5>
            <h5 class="card-title">Event Date: ${eventos.date}</h5>
            <h5 class="card-title">Event Place: ${eventos.place}</h5>
            <h5 class="card-title">Event Category: ${eventos.category}</h5>
            <p class="card-text">About Event:<br>${eventos.description}</p>
            <p class="card-text">capacity<br>${eventos.capacity}</p>
            <p class="card-text">estimate or assistance<br>${eventos.estimate !== undefined ? eventos.estimate : eventos.assistance}</p>
            <p>Price: $ ${eventos.price}</p>
        </div>
    </div>
  </div>`;
}

function pintartarjeta(element,contenedorevents){
    contenedorevents.innerHTML = createCard(element)
}

function buscarevento(id){
    return dataev.events.find(evento => evento._id == id)
}
traerDatos();
