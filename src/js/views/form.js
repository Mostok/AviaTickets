import {
  getAutocompleteInstance,
  getDatepickerInstance
} from "../plugins/materialize";

class FormUi {
  constructor(getAutocompleteInstance, getDatepickerInstance) {
    this._form = document.forms["locationControls"];

    this.origin = document.getElementById("autocomplete-origin");
    this.destination = document.getElementById("autocomplete-destination");
    this.depart = document.getElementById("datepicker-depart");
    this.return = document.getElementById("datepicker-return");

    this.originAutocomlete = getAutocompleteInstance(this.origin);
    this.destinationAutocomlete = getAutocompleteInstance(this.destination);
    this.departDatepicker = getDatepickerInstance(this.depart);
    this.returnDatepicker = getDatepickerInstance(this.return);
  }

  get form() {
    return this._form;
  }

  get originValue() {
    return this.origin.value;
  }

  get destinationValue() {
    return this.destination.value;
  }

  get departValue() {
    return this.departDatepicker.toString();
  }

  get returnValue() {
    return this.returnDatepicker.toString();
  }

  setAutocompleteData(data) {
    this.originAutocomlete.updateData(data);
    this.destinationAutocomlete.updateData(data);
  }
}

const formUi = new FormUi(getAutocompleteInstance, getDatepickerInstance);

export default formUi;
