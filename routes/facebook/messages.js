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
    pipeline.setSenderData(sender);

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
                
                pipeline.data[sender].location = {address: message.attachments[0].title, value: true};

                let messageData = {text: 'your location is ' + res[0].formattedAddress + '🎪'};
                pipeline.data[sender].location.address = res[0].formattedAddress;
                pipeline.data[sender].address.address = res[0].formattedAddress;

                request.sendRequestcall(sender, messageData, function() {
                    if(pipeline.data[sender].shortContext === 'region') {
                        // context menu
                        console.log("context region");
                        showRestaurants(sender, 'latlong', lat, lng, null)

                    }
                    else if (pipeline.data[sender].shortContext === 'address') {
                        // context cart
                        apiai.apiResetContext(sender);
                        let messageData = {text: 'What is the best phone number to reach you? '};
                        apiai.apiaiProcessor(sender, messageData.text);
                        request.sendRequest(sender, messageData);
                    }
                    else {
                        console.log("context none");
                        showRestaurants(sender, 'latlong', lat, lng, null)
                    }
                });
                
            });

            
        }
        else{
            // exact location

            let messageData = {text: 'your location is ' + message.attachments[0].title + '🎪'};

            pipeline.data[sender].location.address = message.attachments[0].title;
            pipeline.data[sender].address.address = message.attachments[0].title;

            request.sendRequestcall(sender, messageData, function() {
                if(pipeline.data[sender].shortContext === 'region') {
                    // context menu
                    console.log("context region");
                    showRestaurants(sender, 'latlong', lat, lng, null)

                }
                else if (pipeline.data[sender].shortContext === 'address') {
                    // context cart
                    apiai.apiResetContext(sender);
                    let messageData = {text: 'What is the best phone number to reach you? '};
                    apiai.apiaiProcessor(sender, messageData.text);
                    request.sendRequest(sender, messageData);
                }
                else {
                    console.log("context none");
                    showRestaurants(sender, 'latlong', lat, lng, null)
                }
            });
            
        }
    }

    else if (message.quick_reply) {
        console.log('quick reply :' + message.quick_reply.payload);
        if (message.quick_reply.payload === 'ORDER_FOOD') {

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
            request.sendRequest(sender, {text: 'Your order is on the way'});
        }
        else {
            let res = message.quick_reply.payload.split("_");
            if(res[0]=== 'REGION'){
                pipeline.data[sender].location.regions.push(res[1]);
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
            if (err) console.log("gen region on latlong err", err);
            else {
                if (results.length) {
                    console.log(results)
                    let finalRegions = [] ;
                    for(let i=0;i<results.length;i++){
                        pipeline.data[sender].location.regions.push(results[i].name);
                        finalRegions.push(results[i].name);
                    }
                    let messageData = {text: "I'm looking for restaurants for you... 😋🍦"};
                    request.sendRequestcall(sender, messageData, function () {
                        resTem.genRestaurantByRegionsGeneric(finalRegions, 0, function (err, results) {
                            if (err) console.log("gen res by regions err", err);
                            else {
                                if (results.attachment.payload.elements.length > 0) {
                                    
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
                    if (results.attachment.payload.elements.length > 0) {
                        
                        pipeline.data[sender].restaurant.index+=1;
                        request.sendRequest(sender, results);

                    }
                }
            });
        })
    } 
}

