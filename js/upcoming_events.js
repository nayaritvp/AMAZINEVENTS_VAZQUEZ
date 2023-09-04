const eventos = data.events
const fecha = data.currentDate;
const creartarjeta = createCard;

for (let eventos of data.events) {
  if (eventos.date > data.currentDate) {
    creartarjeta(eventos);
  }
}
