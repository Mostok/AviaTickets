import locations from "./store/locations";
import formUi from "./views/form";
import currencyUi from "./views/currency";
import ticketUi from "./views/ticket";
import "./plugins";
import "../css/style.css";

document.addEventListener("DOMContentLoaded", () => {
  initApp();
  const form = formUi.form;

  //* Events
  form.addEventListener("submit", e => {
    e.preventDefault();
    onFormSubmit();
  });

  //* Heandlers
  async function initApp() {
    await locations.init();
    formUi.setAutocompleteData(locations.shortCitiesList);
  }

  async function onFormSubmit() {
    const origin = locations.getCityByKey(formUi.originValue);
    const destination = locations.getCityByKey(formUi.destinationValue);
    const departDate = formUi.departValue;
    const returnDate = formUi.returnValue;
    const currency = currencyUi.currencyValue;
    await locations.fetchTickets({
      origin,
      destination,
      departDate,
      returnDate,
      currency
    });

    ticketUi.renderTickets(locations.lastSearch);
  }
});
