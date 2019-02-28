class User {
    constructor(id, first_name, last_name, email, password, age, desired_pace, city, state, zipcode, phone) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.age = age;
        this.desired_pace = desired_pace;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
        this.phone = phone;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        // if(value < 0){
        //     alert("Invalid ID");
        //     return;
        // }
        this._id = value;
    }

    get first_name() {
        return this._first_name;
    }
    set first_name(value) {
        // if(value.length <= 0){
        //     alert("Invalid First Name");
        //     return;
        // }
        this._first_name = value;
    }

    get last_name() {
        return this._last_name;
    }
    set last_name(value) {
        // if(value.length <= 0){
        //     alert("Invalid Last Name");
        //     return;
        // }
        this._last_name = value;
    }

    get email() {
        return this._last_name;
    }

    set email(value) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) == true) {
            this._email = value;
        } else {
            // alert("You have entered an invalid email address!");
            return;
        }
    }

    get password() {
        return this._password;
    }
    set password(value) {
        // if(value < 4){
        //     alert("Password should be atleast 4 chars or long");
        //     return;
        // }
        this._password = value;
    }

    get age() {
        return this._age;
    }
    set age(value) {
        // if(value < 10){
        //     alert("You should be atleast 10 years of age to register");
        //     return;
        // }
        this._age = value;
    }

    get desired_pace() {
        return this._desired_pace;
    }
    set desired_pace(value) {
        // if(value <= 0){
        //     alert("Pace cannot be 0 or less");
        //     return;
        // }
        this._desired_pace = value;
    }

    get city() {
        return this._city;
    }
    set city(value) {
        // if(value = ""){
        //     alert("Please Enter a City");
        //     return;
        // }
        this._city = value;
    }

    get state() {
        return this._state;
    }
    set state(value) {
        // if(value = ""){
        //     alert("Please Enter a State");
        //     return;
        // }
        this._state = value;
    }

    get zipcode() {
        return this._zipcode;
    }
    set zipcode(value) {
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

        this._phone = value;
    }
}



// let user = new User(2, "John", "Smith", "js@gmail.com", "abcdefg", 20, 4, "Austin", "Texas", 78717, 5122843557);

// console.log(user);


