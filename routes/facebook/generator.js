const request = require('./requests');
const pipeline = require('./pipeline');
const apiai = require('./apiai');

module.exports.foodAttending = function(err, sender, res, food){
	if (err || !food) return;

    console.log(food);
    console.log('more: ' + JSON.stringify(pipeline.data[sender], null,2));
    let flag = true;

    pipeline.data[sender].foods.forEach(function (foodItem) {

        if(foodItem.food_id.equals(food.food_id) && foodItem.size_id.equals(food.size_id)){
            console.log('falsify');
            flag= false;
        }
    });
    if(flag){
        pipeline.data[sender].foodattending= food;

        apiai.apiaiProcessor(sender, 'add ' + food.food_name + ' to my cart, confirm');

        let messageData= {text: 'How many of '+ food.food_name + " (" + food.size + ") would you order?"};
        request.sendRequest(sender, messageData);

    }
    else {
        let messageData= {text: food.food_name+ " is already in your cart. To modify visit cart"};
        request.sendRequest(sender, messageData);
    }
}

module.exports.foodFromMenu = function(sender, foods, restaurant, res_id){
    pipeline.setSenderData(sender);
    if (!foods.length || !pipeline.data[sender].restaurant) return;

    pipeline.data[sender].foods = foods;
    pipeline.data[sender].restaurant = { index: 0,
                res_id: res_id, name: restaurant, 
                image_url: "https://media-cdn.tripadvisor.com/media/photo-s/0a/56/44/5a/restaurant.jpg", 
                confirmed: false
            };

            console.log(pipeline.data[sender]);

    let messageData= {text: "Your order from " + restaurant + " is in your cart :D"};
    request.sendRequest(sender, messageData);
    
}

module.exports.foodAttendingRes = function(err, sender, res, food){
	if (err || !food ) return;


	pipeline.data[sender].restaurant = { index: 0,
                res_id: res.res_id, name: res.name, image_url: res.url, confirmed: false
            };

    console.log(food);
    console.log('more: ' + JSON.stringify(pipeline.data[sender], null,2));
    let flag = true;

    pipeline.data[sender].foods.forEach(function (foodItem) {

        if(foodItem.food_id.equals(food.food_id) && foodItem.size_id.equals(food.size_id)){
            console.log('falsify');
            flag= false;
        }
    });
    if(flag){
        pipeline.data[sender].foodattending= food;

        apiai.apiaiProcessor(sender, 'add ' + food.food_name + ' to my cart, confirm');

        let messageData= {text: 'How many of '+ food.food_name + " (" + food.size + ") would you order?"};
        request.sendRequest(sender, messageData);

    }
    else {
        let messageData= {text: food.food_name+ " is already in your cart. To modify visit cart"};
        request.sendRequest(sender, messageData);
    }
}

module.exports.foodInLine = function(err, sender, res, food){
	
	let messageData= {text: "There are items in your cart from another restaurant, Please clear cart before proceeding."};

	request.sendRequest(sender, messageData);
}