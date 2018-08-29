const Restaurant = require('../../model/Restaurants');
const Food = require('../../model/Foods');

let SERVER_URL = "https://www.facebook.com";

module.exports.genRestaurantByRegion = function (region, index, callback) {
    let perPage = 4;
    let page = index+1;
    Restaurant.paginate({region : region}, { page: page, limit: perPage }, function(err, result) {
        console.log(result.total);
        if(result.total > (page)*perPage){
            callback(err, makeTemplate(result.docs, true));
        }
        else {
            callback(err, makeTemplate(result.docs, false));
        }
    });
};

module.exports.genRestaurantByRegionGeneric = function (region, index, callback) {
    let perPage = 10;
    let page = index + 1;
    Restaurant.paginate({region : region}, { page: page, limit: perPage }, function(err, result) {
        console.log(result.total);
        if(result.total > (page)*perPage){
            callback(err, makeTemplateGeneric(result.docs, true));
        }
        else {
            callback(err, makeTemplateGeneric(result.docs, false));
        }
    });
}

module.exports.genRestaurantByZip = function (zip, index, callback) {
    let perPage = 4;
    let page = index+1;
    Restaurant.paginate({zip_code : zip}, { page: page, limit: perPage }, function(err, result) {
        console.log(result.total);
        if(result.total > (page)*perPage){
            callback(err, makeTemplate(result.docs, true));
        }
        else {
            callback(err, makeTemplate(result.docs, false));
        }
    });
};

module.exports.genRestaurantByCuisine = function (cuisine,index, callback) {
    let perPage = 4;
    let page = index+1;
    Restaurant.paginate({cuisine : cuisine}, { page: page, limit: perPage }, function(err, result) {
        console.log(result.total);
        if(result.total > (page)*perPage){
            callback(err, makeTemplate(result.docs, true));
        }
        else {
            callback(err, makeTemplate(result.docs, false));
        }
    });

};

function makeTemplate(restaurants, viewFlag) {
    let view= [];
    if (viewFlag){
        view = [
            {
                "title": "View More",
                "type": "postback",
                "payload": "SEE_MORE"
            }
        ]
    }
    if(!restaurants.size) {
        let messageElements = restaurants.map(restaurant => {
            return (
                {
                    "title": restaurant.name,
                    "subtitle": restaurant.cuisine + ', Rating :' + restaurant.rating + ', ' + restaurant.region,
                    "image_url": "https://media-cdn.tripadvisor.com/media/photo-s/0a/56/44/5a/restaurant.jpg",
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "Pick",
                            "payload": restaurant.name
                        }
                    ]
                }
            )
        });
        return {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "list",
                    "top_element_style": "compact",
                    "elements": messageElements,
                    "buttons": view
                }
            }
        }
    }
    else {
        return [];
    }
}


function makeTemplateGeneric(restaurants, viewFlag) {
    let view= [];
    if (viewFlag){
        view = [
            {
                "title": "View More",
                "type": "postback",
                "payload": "SEE_MORE"
            }
        ]
    }
    if(!restaurants.size) {
        let messageElements = restaurants.map(restaurant => {
            return (
                {
                    "title": restaurant.name,
                    "subtitle": restaurant.cuisine + ', Rating :' + restaurant.rating + ', ' + restaurant.region,
                    "image_url": "https://media-cdn.tripadvisor.com/media/photo-s/0a/56/44/5a/restaurant.jpg",
                    "default_action": {
                        "type": "web_url",
                        "url": "fb.com/foodbot",
                        "messenger_extensions": false,
                        "webview_height_ratio": "tall"
                    },
                    "buttons": [{
                        "type": "web_url",
                        "url": SERVER_URL + "/anjantb",
                        "title": "MENU",
                        "webview_height_ratio": "tall",
                        "messenger_extensions": true
                    }]
                }
            )
        });
        return {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": messageElements
                }
            }
        }
    }
    else {
        return [];
    }
}


