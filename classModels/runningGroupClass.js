
class RunningGroup {
    constructor(id, name, city, state, zipcode, phone) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
        this.phone = phone;
    }

    get id() {
        return this._id;
    }
    set id(value) {
        if(value < 0){
            alert("Invalid ID");
            return;
        }
        this._id = value;
    }

    get name() {
        return this._name;
    }
    set name(value) {
        if(value.length <= 0){
            alert("Invalid Name");
            return;
        }
        this._name = value;
    }

    get city() {
        return this._city;
    }
    set city(value){
        if(value.length <= 0){
            alert("Please Enter a City");
            return;
        }
      this._city = value;
    }
    

    get state() {
        return this._state;
    }
    set state(value) {
        if(value.length <= 0){
            alert("Please Enter a State");
            return;
        }
        this._state = value;
    }

    get zipcode() {
        return this._zipcode;
    }
    set zipcode(value){
        if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(value) == true) {
            this._zipcode = value;
        } else {
            return;
        }
    }


    get phone() {
        return this._phone;
    }
    set phone(value) {
        if (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(value) == true) {
            this._phone = value;
        } 
        else {
            return;
        }
    }
}

// let running_group = new RunningGroup(2, "John Doe", "Austin","Texas",78758, 5125125122);
// console.log(running_group);