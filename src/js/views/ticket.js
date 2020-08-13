import currencyUi from "./currency";

class TicketsUi {
  constructor() {
    this.container = document.querySelector(".tickets-sections .row");
  }

  renderTickets(tickets) {
    this.clearContainer();

    if (!tickets.length) {
      this.showEmptyMsg();
      return;
    }

    let fragment = "";
    let currency = currencyUi.getCurrencySymbol();

    tickets.forEach(ticket => {
      const template = TicketsUi.ticketTemlate(ticket, currency);
      fragment += template;
    });

    this.container.insertAdjacentHTML("afterbegin", fragment);
  }

  clearContainer() {
    this.container.innerHTML = "";
  }

  showEmptyMsg() {
    const template = TicketsUi.emptyMsgTemplate();
    this.container.insertAdjacentHTML("afterbegin", template);
  }

  static emptyMsgTemplate() {
    return `
    <div class="tickets-empty-res-msg">
      По вашему запросу билетов не найдено.
    </div>
    `;
  }

  static ticketTemlate(ticket, currency) {
    return `
      <div class="col s12 m6">
        <div class="card ticket-card">
          <div class="ticket-airline d-flex align-items-center">
            <img
              src="${ticket.airlineLogo}"
              class="ticket-airline-img"
            />
            <span class="ticket-airline-name"
              >${ticket.airlineName}</span
            >
          </div>
          <div class="ticket-destination d-flex align-items-center">
            <div class="d-flex align-items-center mr-auto">
              <span class="ticket-city">${ticket.originName}</span>
              <i class="medium material-icons">flight_takeoff</i>
            </div>
            <div class="d-flex align-items-center">
              <i class="medium material-icons">flight_land</i>
              <span class="ticket-city">${ticket.destinationName}</span>
            </div>
          </div>
          <div class="ticket-time-price d-flex align-items-center">
            <span class="ticket-time-departure">${ticket.departure_at}</span>
            <span class="ticket-price ml-auto">${currencyUi.getCurrencySymbol()}${
      ticket.price
    }</span>
          </div>
          <div class="ticket-additional-info">
            <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
            <span class="ticket-flight-number">Номер рейса: ${
              ticket.flight_number
            }</span>
          </div>
        </div>
      </div>
    `;
  }
}

const ticketsUi = new TicketsUi();

export default ticketsUi;
