const apiaiApp = require('apiai')('67efa2ecd2514286b05cb58fdc3643fc');
const actions = require('./actions');
const request = require('request');
const DEVELOPER_ACCESS_TOKEN = '70b079efacff42f38ad9a9d41e0e04ae';


module.exports.apiaiProcessor = function (sender, text) {
    let apiai = apiaiApp.textRequest(text, {
        sessionId: sender // use any arbitrary id
    });

    apiai.on('response', (response) => {
        let speech = response.result.fulfillment.speech;
        let action = response.result.action;
        let parameters = response.result.parameters;
        let resolvedQuery = response.result.resolvedQuery;
        console.log('from api :');
        console.log(JSON.stringify(response, null, 2));
        //console.log(data[sender]);
        actions.actionsProcessor(sender, action, speech, parameters, resolvedQuery);
    });

    apiai.on('error', (error) => {
        console.log(error);
    });

    apiai.end();
};

module.exports.apiResetContext = function (sender) {
    let options = {
        sessionId: sender
    };

    let request = apiaiApp.deleteContextsRequest(options);

    request.on('response', function(response) {
        console.log(response);
    });

    request.on('error', function(error) {
        console.log(error);
    });

    request.end();
};

module.exports.buildEntity=  function(entities, callback){
    // console.log(entities);
    console.log('entities: ' + JSON.stringify(entities, null, 2));

    request({
        url: "https://api.dialogflow.com/v1/entities?v=20150910",
        headers: {
            'Authorization': 'Bearer ' +DEVELOPER_ACCESS_TOKEN,
            'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify(entities)
    }, function (err, response, body) {
        if (err) {
            console.log("sending error");
            console.log(err);
        } else if (response.body.error) {
            console.log("response body error");
            console.log(response.body.error);
        }
        else {
            // console.log(response);
            callback();
        }
    })
}

module.exports.addCuisineEntity=  function(entities, callback){
    console.log(entities);

    request({
        url: "https://api.dialogflow.com/v1/entities/3a1a900e-3199-41ad-8341-5c847603ed5a/entries?v=20150910",
        headers: {
            'Authorization': 'Bearer ' +DEVELOPER_ACCESS_TOKEN,
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(entities)
    }, function (err, response, body) {
        if (err) {
            console.log("sending error");
            console.log(err);
        } else if (response.body.error) {
            console.log("response body error");
            console.log(response.body.error);
        }
        else {
            // console.log(response);
            callback();
        }
    })
}

module.exports.addFoodTagEntity=  function(entities, callback){
    console.log(entities);

    request({
        url: "https://api.dialogflow.com/v1/entities/3a1a900e-3199-41ad-8341-5c847603ed5a/entries?v=20150910",
        headers: {
            'Authorization': 'Bearer ' +DEVELOPER_ACCESS_TOKEN,
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(entities)
    }, function (err, response, body) {
        if (err) {
            console.log("sending error");
            console.log(err);
        } else if (response.body.error) {
            console.log("response body error");
            console.log(response.body.error);
        }
        else {
            // console.log(response);
            callback();
        }
    })
}

module.exports.addIngredientTagEntity=  function(entities, callback){
    console.log(entities);

    request({
        url: "https://api.dialogflow.com/v1/entities/3a1a900e-3199-41ad-8341-5c847603ed5a/entries?v=20150910",
        headers: {
            'Authorization': 'Bearer ' +DEVELOPER_ACCESS_TOKEN,
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(entities)
    }, function (err, response, body) {
        if (err) {
            console.log("sending error");
            console.log(err);
        } else if (response.body.error) {
            console.log("response body error");
            console.log(response.body.error);
        }
        else {
            // console.log(response);
            callback();
        }
    })
}

module.exports.getEntities=  function(callback){
    // console.log(entities);

    request({
        url: "https://api.dialogflow.com/v1/entities?v=20150910",
        headers: {
            'Authorization': 'Bearer ' +DEVELOPER_ACCESS_TOKEN,
            'Content-Type': 'application/json'
        },
        method: "GET"
    }, function (err, response, body) {
        if (err) {
            console.log("sending error");
            console.log(err);
        } else if (response.body.error) {
            console.log("response body error");
            console.log(response.body.error);
        }
        else {
            console.log('full event : ' + JSON.stringify(body, null, 2));
            callback();
        }
    })
}
