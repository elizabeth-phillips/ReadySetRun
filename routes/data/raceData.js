const axios = require('axios');
const knex = require('knex')(require('../../knexfile')[process.env.NODE_ENV]);
const fs = require('fs');

function abbrState(input, to){
    
    var states = [
        ['Arizona', 'AZ'],
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arizona', 'AZ'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];

    if (to == 'abbr'){
        input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        for(i = 0; i < states.length; i++){
            if(states[i][0] == input){
                return(states[i][1]);
            }
        }    
    } else if (to == 'name'){
        input = input.toUpperCase();
        for(i = 0; i < states.length; i++){
            if(states[i][1] == input){
                return(states[i][0]);
            }
        }    
    }
}

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


async function getRecommendation(user){
    console.log("Finding recommendations: ")
    try{
        var API_KEYV2 = 'esdnh7utmgwp82uj9qwgktyp';
        let response = '';
        let results = '';

        state = abbrState(user.state, 'abbr')

        console.log("MY STATE", state)
        
        response = await axios.get(`http://api.amp.active.com/v2/search?query=running&category=event&country=United%20States&start_date=${getDateTime()}..2019-12-31&api_key=${API_KEYV2}&exists=asset.assetName&per_page=10&state=${state}`);
        results = response.data.results;

        let responses = []
        for(let i = 0; i < results.length; i++){
            temp = resultFormat(results[i])

            if(Object.entries(temp).length !== 0){
                responses.push(temp);
            }
        }
        responses = sortDates(responses).slice(0,3)
        console.log("Finding recommendations: ", responses)
        return responses;
    } catch (error){
        console.log(error);
    }
}

async function getRaceDetails(state, query){
    try{
        var API_KEYV2 = 'esdnh7utmgwp82uj9qwgktyp';
        let response = '';
        let results = '';
        
        if (state === '' &&  query === ''){
            console.log("No filter")
            response = await axios.get(`http://api.amp.active.com/v2/search?query=running&category=event&country=United%20States&start_date=${getDateTime()}..2019-12-31&api_key=${API_KEYV2}&exists=asset.assetName&per_page=50`);
        } 
        else if(!state.includes("All") && query === ''){
            console.log("Search by state")
            response = await axios.get(`http://api.amp.active.com/v2/search?query=running&category=event&country=United%20States&start_date=${getDateTime()}..2019-12-31&api_key=${API_KEYV2}&exists=asset.assetName&per_page=50&state=${state}`);
        } 
        else if(state === '' && query !== ''){
            console.log("Search by query")
            response = await axios.get(`http://api.amp.active.com/v2/search?query=running%20AND%20${query}&category=event&country=United%20States&start_date=${getDateTime()}..2019-12-31&api_key=${API_KEYV2}&exists=asset.assetName&per_page=50`);
        } 
        // else {
        //     console.log("Search by all")
        //     response = await axios.get(`http://api.amp.active.com/v2/search?topic=running&category=event&sort=date_asc&country=United%20States&state=${state}&start_date=${getDateTime()}..&api_key=${API_KEYV2}&query=${query}&exists=asset.assetName`);
        // }
        results = response.data.results;

        let responses = []
        for(let i = 0; i < results.length; i++){
            temp = resultFormat(results[i])

            if(Object.entries(temp).length !== 0){
                responses.push(temp);
            }
        }
        responses = sortDates(responses)
        return responses;
    } catch (error){
        console.log(error);
    }
}

function sortDates(results){
    for(let i = 0; i < results.length; i++){
        for(let j = i+1; j < results.length; j++){
            if(results[i].date > results[j].date){
                let temp = results[i].date;
                results[i].date = results[j].date;
                results[j].date = temp;
            }
        }
    }
    
    return results;
}

async function isPartOf(user_id, race_name){
    exists = await knex.schema.raw(`SELECT COUNT(*) AS COUNT
    FROM future_races
    WHERE user_id = ? AND race_name = ?`, [parseInt(user_id), race_name]);
    return exists[0].COUNT > 0;
}

module.exports = {
    RaceDetails: getRaceDetails,
    SingleRace: getSingleRaceDetail,
    IsPartOf: isPartOf,
    Recommendation: getRecommendation
}