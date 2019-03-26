const knex = require('knex')(require('../../knexfile')[process.env.NODE_ENV]);
const fs = require('fs');

function clearUserLoggedIn(){
    loginFile = './routes/data/login.json'
    return fs.readFileSync(loginFile, {});
}

function getUserLoggedIn(){
    loginFile = './routes/data/login.json'
    return JSON.parse(fs.readFileSync(loginFile));
}

function getUserInfo(){
    userFile = './routes/data/userInfo.json'
    return JSON.parse(fs.readFileSync(userFile));
}

function UserInfo(id, login){
    userFile = './routes/data/userInfo.json'
    knex.schema.raw(`SELECT *
                    FROM user u
                    WHERE u.id = ?`, id)
        .then(user => {
            knex.schema.raw(`SELECT r.id, r.name, r.date, r.distance, r.email, r.phone, r.city, r.state, r.zipcode, rh.pace, rh.ranking
            FROM race_history rh, race r
            WHERE ? = rh.user_id AND r.id = rh.race_id`, user[0].id).then(races => {
            user[0]['races'] = races
            return user[0]
        })
        .then(user => {
            knex.schema.raw(`SELECT rg.id, rg.name, rg.pace, rg.city, rg.state, rg.zipcode, rg.phone
            FROM running_group rg, running_group_member rgm
            WHERE ? = rgm.user_id AND rg.id = rgm.running_group_id`, user.id)
        .then(rgs => {
            user['running_groups'] = rgs
            fs.writeFileSync(userFile, JSON.stringify(user, null, 4)); 
            if (login){
                loginFile = './routes/data/login.json';
                fs.writeFileSync(loginFile, JSON.stringify(user, null, 4)); 
            }
            })
        })
    })
} 

module.exports = {
    UserInfo: UserInfo,
    getUserLoggedIn: getUserLoggedIn,
    clearUserLoggedIn: clearUserLoggedIn,
    getUserInfo: getUserInfo
};