const axios = require('axios');
const knex = require('knex')(require('../../knexfile')[process.env.NODE_ENV]);

function getDateTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return year + "-" + month + "-" + day;
}

function getImages(imageData){
    if (imageData.length){
        return imageData[0].imageUrlAdr;
    }
    return "";
}

function getDistances(raceData){
    output = []
    for(let i = 0; i < raceData.length; i++){
        res = raceData[i].tag;
        if(res.tagDescription.includes('Distance') && !res.tagName.includes('Other')){
            output.push(res.tagName);
        }
    }
    return output;
}

function resultFormat(results){
    distances = getDistances(results.assetTags)
    temp = {}
    if (results && distances.length !== 0){
        ('assetName' in results) ? 
        temp['name'] = results.assetName : 
        temp['name'] = '';

        ('activityStartDate' in results) ? 
        temp['date'] = results.activityStartDate : 
        temp['date'] = getDateTime();

        ('socialMedia' in results) ? temp['social_media'] = results.socialMedia : temp['social_media'] = '';

        ('assetImages' in results) ? temp['images'] = getImages(results.assetImages) : temp['images'] = '';

        ('homePageUrlAdr' in results) ? temp['url'] = results.homePageUrlAdr : temp['url'] = '';

        ('logoUrlAdr' in results) ? temp['logo'] = results.logoUrlAdr : temp['logo'] = '';
        
        ('assetTags' in results) ? temp['distances'] = distances : temp['distances'] = [];

        ('primaryContactPhone' in results.organization) ? temp['phone'] = results.organization.primaryContactPhone : temp['phone'] = '';
        
        if ('place' in results){
            ('countryName' in results.place) ? temp['country'] = results.place.countryName : temp['country'] = '';

            ('cityName' in results.place) ? temp['city'] = results.place.cityName : temp['city'] = '';

            ('stateProvinceCode' in results.place) ? temp['state'] = results.place.stateProvinceCode : temp['state'] = '';

            ('postalCode' in results.place) ? temp['zipcode'] = results.place.postalCode : temp['zipcode'] = '';
        } 
    }
    return temp;
}

async function getSingleRaceDetail(name){
    try{
        var API_KEYV2 = 'esdnh7utmgwp82uj9qwgktyp';
        let response = await axios.get(`http://api.amp.active.com/v2/search?query=running&category=event&country=United%20States&asset_name=${name}&api_key=${API_KEYV2}&exists=asset.assetName`);

        temp = resultFormat(response.data.results[0])
        return temp;
    } catch (error){
        console.log(error);
    }
}

async function getRaceDetails(state){
    try{
        var API_KEYV2 = 'esdnh7utmgwp82uj9qwgktyp';
        let response;

        if(state !== ''){
            response = await axios.get(`http://api.amp.active.com/v2/search?query=running&category=event&country=United%20States&start_date=${getDateTime()}..&api_key=${API_KEYV2}&exists=asset.assetName`);
        } else {
            response = await axios.get(`http://api.amp.active.com/v2/search?query=running&category=event&country=United%20States&state=${state}&start_date=${getDateTime()}..&api_key=${API_KEYV2}&exists=asset.assetName`);
        }
        let responses = []
        for(let i = 0; i < response.data.results.length; i++){
            temp = resultFormat(response.data.results[i])
            if(Object.entries(temp).length !== 0){
                console.log(temp)
                responses.push(temp);
            }
        }
        
        return responses;
    } catch (error){
        console.log(error);
    }
}


async function RaceSignUpInfo(user, r){
    await knex.schema.raw(`SELECT COUNT(*) FROM RACE`).then(count => {
        knex.schema.raw(`INSERT INTO race
        VALUES (:id, :name, :distance, :url, :phone, :city, :state, :zipcode)`, {
            id: count,
            name: r.name, 
            distance: JSON.stringify(r.distances), 
            url: r.url, 
            phone: r.phone, 
            city: r.city, 
            state: r.state, 
            zipcode: r.zipcode})
            .catch(output => {
                console.log(output)
                return false;
            })
        return true;
    }).catch(()=>{console.log()})
    
    console.log("===========")
    await knex.schema.raw(`SELECT COUNT(*) FROM RACE`).then(count => { 
        knex.schema.raw(`INSERT INTO race_history
            VALUES (:id, :pace, :ranking, :date, :future, :user_id, :race_id)`, {
                id: count,
                pace: race.pace, 
                ranking: race.ranking,  
                date: new Date(race.date),
                future: 'true',
                user_id: user.user_id, 
                race_id: race.id})
                .catch(output => {
                    console.log(output)
                    return false
                })
                return true;
            }).catch(()=>{console.log()})
} 

module.exports = {
    RaceDetails: getRaceDetails,
    SingleRace: getSingleRaceDetail,
    SignUp: RaceSignUpInfo
}