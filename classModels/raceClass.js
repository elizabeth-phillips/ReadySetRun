class Race {
    constructor(id, time, ranking, date) {
        this.id = id;
        this.time = time;
        this.ranking = ranking;
        this.date = date;
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

    get time() {
        return this._time;
    }
    set time(value) {
        this._time = value;
    }

    get ranking() {
        return this._ranking;
    }
    set ranking(value) {
        this._ranking = value;
    }

    get date() {
        return this._date;
    }
    set date(value) {
        this._date = value;
    }
}

//let race = new Race(2, 10.30, 3, "12th Dec");
// console.log(race);