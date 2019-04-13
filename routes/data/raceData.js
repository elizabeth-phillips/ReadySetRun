const axios = require('axios');

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
        if(res.tagDescription.includes('Distance')){
            output.push(res.tagName);
        }
    }
    return output;
}

async function getRaceDetails(){
    try{
        var API_KEYV2 = 'esdnh7utmgwp82uj9qwgktyp';
        let response = await axios.get(`http://api.amp.active.com/v2/search?query=running&category=event&country=United%20States&start_date=${getDateTime()}..&api_key=${API_KEYV2}`);
        let results = response.data.results;
        responses = []
        for(let i = 0; i < results.length; i++){
            console.log(results[i]);
            res = results[i];
            if (res){
                responses.push({
                    activityStartDate: res.activityStartDate,
                    socialMedia: res.socialMedia,
                    image: getImages(res.assetImages),
                    homePageUrl: res.homePageUrlAdr,
                    logoUrlAdr: res.logoUrlAdr,
                    distances: getDistances(res.assetTags),
                    contactPhone: res.contactPhone,
                    country: res.place.countryName,
                    city: res.place.cityName,
                    zipcode: res.place.postalCode
                })
            }
        }
        return responses;
    } catch (error){
        console.log(error);
    }
}


module.exports = {
    RaceDetails: getRaceDetails
}