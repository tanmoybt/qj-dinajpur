const NodeGeocoder = require('node-geocoder');
const resTem = require('../templates/genRestaurantTemplate');
const foodTem = require('../templates/genFoodTemplate');
const genWhat = require('../templates/genWhatToDo');
const genLoc = require('../templates/genGetLocation');
const genCart = require('../templates/genCartTemplate');
const pipeline = require('./pipeline');
const postback = require('./postbacks');
const request = require('./requests');
const apiai = require('./apiai');
const actions= require('./actions');


module.exports.messagesProcessor = function (sender, message) {
    if (message.attachments && message.attachments[0].type === 'location') {
        
        let lat = message.attachments[0].payload.coordinates.lat;
        let lng = message.attachments[0].payload.coordinates.long;

        if(message.attachments[0].title.includes("'s Location")){
            // vague location
            let options = {
                provider: 'google',
                apiKey: 'AIzaSyBeMeLnG6dPdAmOnhNeIyBZhYgsY9HGGbw'
            };

            const geocoder = NodeGeocoder(options);

            let messageData;
            geocoder.reverse({lat: lat, lon: lng}, function (err, res) {
                if (err) { console.log(err); return; }

                console.log(res);
                console.log(res[0].formattedAddress);
                pipeline.setSenderData(sender);
                pipeline.data[sender].location = {address: message.attachments[0].title, value: true};

                let messageData = {text: 'your location is ' + res[0].formattedAddress + '🎪'};

                request.sendRequestcall(sender, messageData, function() {
                    if(pipeline.data[sender].shortContext === 'region') {
                    // context menu
                    showRestaurants(sender, 'latlong', lat, lng, null)

                    }
                    else if (pipeline.data[sender].shortContext === 'cart') {
                        // context cart
                    }
                });
                
            });

            
        }
        else{
            // exact location
            pipeline.setSenderData(sender);
            pipeline.data[sender].location = {address: message.attachments[0].title, value: true};

            let messageData = {text: 'your location is ' + message.attachments[0].title + '🎪'};

            request.sendRequestcall(sender, messageData, function() {
                if(pipeline.data[sender].shortContext === 'region') {
                    // context menu
                    showRestaurants(sender, 'latlong', lat, lng, null)

                }
                else if (pipeline.data[sender].shortContext === 'cart') {
                    // context cart
                }
            });
            
        }
    }

    else if (message.quick_reply) {
        console.log('quick reply :' + message.quick_reply.payload);
        if (message.quick_reply.payload === 'ORDER_FOOD') {

            pipeline.setSenderData(sender);
            pipeline.data[sender].whattodo= 'ORDER';
            pipeline.data[sender].shortContext= 'region';

            actions.setLastAction(sender, "showLocationOnOrder", null, null);

            genLoc.genGetLocation(function(err, messageData){
                if(!err){
                    request.sendRequest(sender, messageData);
                }
            });
        }
        else if(message.quick_reply.payload === 'GET_ORDER'){
            request.sendRequest(sender, {text: 'done'});
        }
        else {
            let res = message.quick_reply.payload.split("_");
            if(res[0]=== 'REGION'){
                showRestaurants(sender, 'region', null, null, res[1])
            }
        }
    }

    else if (message.text) {
        //getProfile(sender);
        console.log('text : ' + message.text);
        apiai.apiaiProcessor(sender, message.text);
    }
};

function showRestaurants(sender, mode, lat, long, region) {
    console.log(mode, region);
    if(mode === 'latlong'){
        genLoc.getRegionsOnLatLong(parseFloat(lat), parseFloat(long), function (err, results) {
            if (err) throw err;
            else {
                if (results.length) {
                    console.log(results)
                    let finalRegions = [] ;
                    for(let i=0;i<results.length;i++){
                        finalRegions.push(results[i].name);
                    }
                    let messageData = {text: "I'm looking for restaurants for you... 😋🍦"};
                    request.sendRequestcall(sender, messageData, function () {
                        resTem.genRestaurantByRegionsGeneric(finalRegions, 0, function (err, results) {
                            if (err) throw err;
                            else {
                                if (results.attachment.payload.elements.length > 1) {
                                    
                                    pipeline.data[sender].restaurant.index+=1;
                                    request.sendRequest(sender, results);

                                }
                            }
                        });
                        
                    }) 
                }
                else {
                    messageData = {text: "Sorry 🙁, delivery in this area is currently off. 🛎"};
                    request.sendRequestcall(sender, messageData, function () {
                        genLoc.genGetRegion(function(err, messageData){
                            if(!err){
                                request.sendRequest(sender, messageData);
                            }
                        });
                    });
                }
            }
        })
    }
    else if(mode === 'region'){
        let messageData = {text: "I'm looking for restaurants for you... 😋🍦"};
        request.sendRequestcall(sender, messageData, function () {
            resTem.genRestaurantByRegionGeneric(region, 0, function (err, results) {
                if (err) throw err;
                else {
                    if (results.attachment.payload.elements.length > 1) {
                        
                        pipeline.data[sender].restaurant.index+=1;
                        request.sendRequest(sender, results);

                    }
                }
            });
        })
    } 
}

