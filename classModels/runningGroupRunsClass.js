
class RunningGroupRuns {
    constructor(id, run_group_id, day_of_week, time, distance,meet_address) {
        this.id = id;
        this.run_group_id = run_group_id;
        this.day_of_week = day_of_week;
        this.time = time;
        this.distance = distance;
        this.meet_address = meet_address;
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

    get run_group_id() {
        return this._run_group_id;
    }
    set run_group_id(value) {
        this._run_group_id = value;
    }

    get day_of_week() {
        return this._day_of_week;
    }
    set day_of_week(value) {
        this._day_of_week = value;
    }

    get time() {
        return this._time;
    }
    set time(value) {
        this._time = value;
    }

    get distance() {
        return this._distance;
    }
    set distance(value) {
        this._distance = value;
    }

    get meet_address() {
        return this._meet_address;
    }
    set meet_address(value) {
        this._meet_address = value;
    }
}

// let running_group_runs = new RunningGroupRuns(2, 3, "Wednesday", "5:00 PM CST", 3.5, "Brushy Creek Trail");
// console.log(running_group_runs);
