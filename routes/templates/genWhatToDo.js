

module.exports.genWhatToDo = function () {
    return {
        "text": "Hi, :D how can I help you today 🍴🍕🍔🍗🍖🍟?",
        "quick_replies": [
            {
                "content_type": "text",
                "title": "ORDER FOOD",
                "payload": "ORDER_FOOD"
            }
        ]
    };
};

module.exports.genGetStarted = function (name) {
    return {
        "text": 'Hello ' + name+   "😍😁😈 I'm FoodBot, Oder me foods from resturants around your location 🍴🍕🍔🍗🍖🍟",
        "quick_replies": [
            {
                "content_type": "text",
                "title": "ORDER FOOD",
                "payload": "ORDER_FOOD"
            }
        ]
    };
};