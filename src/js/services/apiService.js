import axios from "axios";
import config from "../config/apiConfig";

class Api {
  constructor(config) {
    this.url = config.url;
  }

  async countries() {
    try {
      const respons = await axios.get(`${this.url}/countries`);
      return respons.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  async cities() {
    try {
      const respons = await axios.get(`${this.url}/cities`);
      return respons.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  async prices(params) {
    try {
      const respons = await axios.get(`${this.url}/prices/cheap`, {
        params
      });
      return respons.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  async airlines(params) {
    try {
      const respons = await axios.get(`${this.url}/airlines`, {
        params
      });
      return respons.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
}

const api = new Api(config);

export default api;
