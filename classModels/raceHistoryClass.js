class RaceHistory {
    constructor(id, pace, ranking, date) {
        this.id = id;
        this.pace = pace;
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

    get pace() {
        return this._pace;
    }
    set pace(value) {
        this._pace = value;
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

// let race_history = new RaceHistory(2, 3, 8, "11 Jan");
// console.log(race_history);