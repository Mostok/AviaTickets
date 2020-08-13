import api from "../services/apiService";
import { formatDate } from "../helpers/date";

class Locations {
  constructor(api, helpers) {
    this.api = api;
    this.countries = null;
    this.cities = null;
    this.shortCitiesList = null;
    this.airlines = null;
    this.lastSearch = null;
    this.formatDate = helpers.formatDate;
  }

  async init() {
    const response = await Promise.all([
      this.api.countries(),
      this.api.cities(),
      this.api.airlines()
    ]);

    const [countries, cities, airlines] = response;
    this.countries = this.serializeCountries(countries);
    this.cities = this.serializeCities(cities);
    this.airlines = this.serializeAirlines(airlines);

    this.shortCitiesList = this.createShortCitiesList(this.cities);

    return response;
  }

  serializeCountries(countries) {
    //! { 'Country code': {...} }
    return countries.reduce((acc, country) => {
      acc[country.code] = country;
      return acc;
    }, {});
  }

  serializeCities(cities) {
    //! {'City name, Country name': {...}}
    return cities.reduce((acc, city) => {
      const countryName = this.getCountryNameByCode(city.country_code);
      const cityName = city.name || city.name_translations.en;
      city.name = city.name || city.name_translations.en;
      const fullName = `${cityName}, ${countryName}`;
      acc[city.code] = { ...city, fullName };
      return acc;
    }, {});
  }

  serializeAirlines(airlines) {
    return airlines.reduce((acc, item) => {
      item.logo = `http://pics.avs.io/200/200/${item.code}.png`;
      item.name = item.name || item.name_translations.en;
      acc[item.code] = item;
      return acc;
    }, {});
  }

  serializeTickets(tickets) {
    return Object.values(tickets).map(ticket => {
      return {
        ...ticket,
        originName: this.getCityNameByCode(ticket.origin),
        destinationName: this.getCityNameByCode(ticket.destination),
        airlineLogo: this.getAirlineLogoByCode(ticket.airline),
        airlineName: this.getAirlineNameByCode(ticket.airline),
        departure_at: this.formatDate(
          ticket.departure_at,
          "dd MMM yyyy  hh:mm"
        ),
        return_at: this.formatDate(ticket.return_at, "dd MMM yyyy  hh:mm")
      };
    });
  }

  getCountryNameByCode(code) {
    //! { 'Country code': {...} }
    return this.countries[code].name;
  }

  getCityByKey(key) {
    const city = Object.values(this.cities).find(item => item.fullName === key);
    return city.code;
  }

  getAirlineNameByCode(code) {
    return this.airlines[code] ? this.airlines[code].name : "";
  }

  getAirlineLogoByCode(code) {
    return this.airlines[code].logo ? this.airlines[code].logo : "";
  }

  getCityNameByCode(code) {
    return this.cities[code].name;
  }

  createShortCitiesList(cities) {
    //! { 'City name, Country name': null }
    return Object.entries(cities).reduce((acc, [, city]) => {
      acc[city.fullName] = null;
      return acc;
    }, {});
  }

  async fetchTickets(params) {
    const response = await this.api.prices(params);
    this.lastSearch = this.serializeTickets(response.data);
  }
}

const locations = new Locations(api, { formatDate });

export default locations;
