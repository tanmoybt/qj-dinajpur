let data = [];

module.exports.data = data;

module.exports.setSenderData = function (sender) {
    if (!data[sender]) {
        data[sender] =
            {
                context: 'menu',
                shortContext: '',
                whattodo: '',
                name : '',
                lastactiontaken: {
                    action:'', speech:'', parameters: []
                },
                location: {
                    address: '', regions: []
                },
                address: {
                    address: '', confirmed: false
                },
                restaurant: { index: 0,
                    res_id: '', name: '', image_url: '', confirmed: false
                },
                foodattending: '',
                phone: '',
                foods: []
            };
    }
};

module.exports.resetSenderData = function (sender) {
    data[sender] =
         {
            context: 'menu',
            shortContext: '',
            whattodo: '',
            name : '',
            lastactiontaken: {
                action:'', speech:'', parameters: []
            },
            location: {
                address: '', regions: []
            },
            address: {
                address: '', confirmed: false
            },
            restaurant: { index: 0,
                res_id: '', name: '', image_url: '', confirmed: false
            },
            foodattending: '',
            phone: '',
            foods: []
        };
};

module.exports.clearSenderData = function (sender) {
    if(data[sender]){
        data[sender].restaurant = { index: 0,
                res_id: '', name: '', image_url: '', confirmed: false
            };
        data[sender].foods = [];
    }
    else {
        data[sender] =
         {
            context: 'menu',
            shortContext: '',
            whattodo: '',
            name : '',
            lastactiontaken: {
                action:'', speech:'', parameters: []
            },
            location: {
                address: '', regions: []
            },
            address: {
                address: '', confirmed: false
            },
            restaurant: { index: 0,
                res_id: '', name: '', image_url: '', confirmed: false
            },
            foodattending: '',
            phone: '',
            foods: []
        };
    }
    
};