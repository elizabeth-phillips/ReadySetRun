class RunningGroupMember {
    constructor(id, run_group_id, user_id) {
        this.id = id;
        this.run_group_id= run_group_id;
        this.user_id = user_id;
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

    get run_group_id() {
        return this._run_group_id;
    }
    set run_group_id(value) {
        if(value < 0){
           alert("Invalid ID");
            return;
        }
        this._run_group_id = value;
    }

    get user_id() {
        return this._user_id;
    }
    set user_id(value) {
        if(value < 0){
           alert("Invalid ID");
            return;
        }
        this._user_id = value;
    }

}

// let running_group_member = new RunningGroupMember(1, 01, 2);
// console.log(running_group_member);
