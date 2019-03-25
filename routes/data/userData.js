const {User, RaceHistory, Race, RunningGroup, RunningGroupMember} = require("../../db/ready_race_run");
const fs = require('fs');

function Login(res, user){
    loginFile = './routes/data/login.json'
    // user = JSON.parse(fs.readFileSync(loginFile));
    // let data = JSON.stringify(user);  
    if (!("races" in user.attributes)){
        user.attributes["races"] = []
    }
    if (!("running_groups" in user.attributes)){
        user.attributes["running_groups"]= []
    }
    fs.writeFileSync(loginFile, JSON.stringify(user));
    
    hist_res = []
    rgs = []
    RunningGroupMember.forge().query({where: {user_id: user.id}}).fetchAll().then(
    groups => {
        for(let i = 0; i < groups.models.length; i++){
            RunningGroup.forge().query({where: {id: groups.models[i].attributes.running_group_id}}).fetch().then(
                rg => {
                    let r = {
                        rg_id: rg.attributes.id,
                        name: rg.attributes.name,
                        phone: rg.attributes.phone,
                        pace: rg.attributes.pace,
                        city: rg.attributes.city,
                        state: rg.attributes.state,
                        zipcode: rg.attributes.zipcode
                    }
                    rgs.push(r)
                    data = JSON.parse(fs.readFileSync(loginFile))
                    data["running_groups"] = rgs
                    fs.writeFileSync(loginFile, JSON.stringify(data)); 
                    
                }
            ).catch(err => {
                console.log(err);
            })
        }
    }
    ).catch(err => {
        console.log(err);
    })
    RaceHistory.forge().query({where: {user_id: user.id}}).fetchAll().then(
    history => {
        for(let i = 0; i < history.models.length; i++){
            Race.forge().query({where: {id: history.models[i].attributes.race_id}}).fetch().then(
                race => {
                    let r = {
                        pace: history.models[i].attributes.pace, 
                        ranking: history.models[i].attributes.ranking,
                        name: race.attributes.name,
                        date: race.attributes.date,
                        distance: race.attributes.distance,
                        email: race.attributes.email,
                        phone: race.attributes.phone,
                        city: race.attributes.city,
                        state: race.attributes.state,
                        zipcode: race.attributes.zipcode,
                        race_id: race.attributes.id
                    }
                    hist_res.push(r)
                    data = JSON.parse(fs.readFileSync(loginFile))
                    data["races"] = hist_res
                    fs.writeFileSync(loginFile, JSON.stringify(data)); 
                    currUser = JSON.parse(fs.readFileSync(loginFile))
                    res.status(200).render('profile', { data: currUser, races: currUser.races, rgs: currUser.running_groups});
                }
            ).catch(err => {
                console.log(err);
            })
        }
    }).catch(err => {
        console.log(err);
    })
}

module.exports = {
    Login: Login
};