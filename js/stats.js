let data = []

traerDatos()

let masasistencia = []
let menosasistencia = []
let mascapacidad = []

const tabla1 = document.querySelector('#tabla1')

function traerDatos(){
    fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(dataev => {
      data = dataev
      extraerdatosptabla(data.events);
      pintarprimeratab();
    })
    .catch(error => console.log(error))
}

function extraerdatosptabla(datos){
  datos.sort((a,b) => b.assistance - a.assistance)
  masasistencia.push(datos[0],datos[1],datos[2])

  datos.sort((a,b) => a.assistance - b.assistance)
  menosasistencia.push(datos[0],datos[1],datos[2])

  datos.sort((a,b) => b.capacity - a.capacity)
  mascapacidad.push(datos[0],datos[1],datos[2])
}

function pintarprimeratab(){
  let html=''
  for(let i = 0; i <masasistencia.length; i++){
    html += `<tr>
    <td>${masasistencia[i].name} with ${masasistencia[i].category}</td>
    <td>${menosasistencia[i].name} with ${menosasistencia[i].category}</td>
    <td>${mascapacidad[i].name} with ${mascapacidad[i].category}</td>
    </tr>`
  }
  tabla1.innerHTML = html
}

let data2 = [];

let datostabla2 = [];
let datostabla3 = [];
let fechaactual
const tabla2 = document.querySelector('#tabla2');
const tabla3 = document.querySelector('#tabla3');
traerDatos2();

function traerDatos2() {
  fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(dataeventos => {
      data2 = dataeventos;
      fechaactual = dataeventos.currentDate
      extraerdatos2tabla(data2.events);
      pintarestadisticas2();
      extraerdatos3tabla(data2.events);
      pintarestadisticas3();
    })
    .catch(error => {
      console.error('Error al cargar los datos:', error);
    });
}

function extraerdatos2tabla(datos) {
  let categorias = [...new Set(datos.map(elemento => elemento.category))];

  categorias.forEach(categoria => {
    let fila = {
      categoria: categoria,
      revenues: 0,
      porcentajeasistencia: 0,
    };

    let multipcat = 0;
    let totalAsistencia = 0;
    let totalCapacidad = 0;
    let datosporcategoria = datos.filter(elemento => elemento.date <= fechaactual && elemento.category == categoria);
    datosporcategoria.forEach(elemento => { 
      if (elemento.assistance!=undefined) {
        multipcat += elemento.assistance * elemento.price;
      }
      
      if (!isNaN(elemento.assistance) && !isNaN(elemento.capacity)) {
        totalAsistencia += elemento.assistance;
        totalCapacidad += elemento.capacity;
      }
    });
    fila.revenues = multipcat;
    fila.revenues = Intl.NumberFormat("es-CL").format(fila.revenues);

    if (totalCapacidad > 0) {
      fila.porcentajeasistencia = (totalAsistencia / totalCapacidad) * 100;
    } else {
      fila.porcentajeasistencia = 0; 
    }
    fila.porcentajeasistencia = fila.porcentajeasistencia.toFixed(2)

    datostabla2.push(fila);
  });
}

function pintarestadisticas2() {
  let html = '';
  datostabla2.forEach(fila => {
    html += `<tr>
      <td>${fila.categoria}</td>
      <td>${fila.revenues}</td>
      <td>${fila.porcentajeasistencia}%</td>
      </tr>`;
  });
  tabla2.innerHTML = html;
}


function extraerdatos3tabla(datos) {
  let categorias = [...new Set(datos.map(elemento => elemento.category))];

  categorias.forEach(categoria => {
    let fila = {
      categoria: categoria,
      revenues: 0,
      porcentajeasistencia: 0,
    };

    let multipcat = 0;
    let totalAsistencia = 0;
    let totalCapacidad = 0;
    let datosporcategoria = datos.filter(elemento => elemento.date > fechaactual && elemento.category == categoria);
    datosporcategoria.forEach(elemento => { 
      if (elemento.estimate!=undefined) {
        multipcat += elemento.estimate * elemento.price;
      }
      
      if (!isNaN(elemento.estimate) && !isNaN(elemento.capacity)) {
        totalAsistencia += elemento.estimate;
        totalCapacidad += elemento.capacity;
      }
    });
    fila.revenues = multipcat;
    fila.revenues = Intl.NumberFormat("es-CL").format(fila.revenues);

    if (totalCapacidad > 0) {
      fila.porcentajeasistencia = (totalAsistencia / totalCapacidad) * 100;
    } else {
      fila.porcentajeasistencia = 0; 
    }
    fila.porcentajeasistencia = fila.porcentajeasistencia.toFixed(2)

    datostabla3.push(fila);
  });
}

function pintarestadisticas3() {
  let html = '';
  datostabla3.forEach(fila => {
    html += `<tr>
      <td>${fila.categoria}</td>
      <td>${fila.revenues}</td>
      <td>${fila.porcentajeasistencia}%</td>
      </tr>`;
  });
  tabla3.innerHTML = html;
}