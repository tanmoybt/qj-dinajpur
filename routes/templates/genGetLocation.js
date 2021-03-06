const Regions = require('../../model/Regions');

module.exports.genGetLocation = function (callback) {
    let location_reply= {
                            "content_type": "location"
                        };

    Regions.find(function (err, regions) {
        let replies = [];
        replies.push(location_reply);

        let res = {
                "text": "Please select a region to find restaurants in... 🍴🍕🍔",
                "quick_replies": replies
            };

        if (err) {
            callback(null, res);
        }
        else{
            replies = makeTemplate(regions);
            replies.unshift(location_reply);
            res = {
                "text": "Please select a region to find restaurants in... 🍴🍕🍔",
                "quick_replies": replies
            };
            console.log(res);
            callback(null, res);
        }
    
    });

};

module.exports.getRegionsOnLatLong = function(lat, long, cb) {
    Regions.aggregate([
       {
         $project: { 
             delta: {
                 $add: [
                     {$abs: { 
                         $subtract: [ "$lat", lat ] 
                     }}, 
                     {$abs: {
                         $subtract: [ "$long", long ]    
                     }}
                 ]
             }, 
             name: "$name" ,
          }
       },
       {
           $match : {
                delta: { $lt: 0.06 }
           }
       }
    ], function(err, regions){
        if(err) cb(err, null)
        else {
            cb(null, regions);
        }
    })
}

module.exports.genGetRegion = function (cb) {
    Regions.find(function (err, regions) {

        if (err) {

            cb(err, null);
        }
        else{
            replies = makeTemplate(regions);
            res = {
                "text": "Please select a region to find restaurants in... 🍴🍕🍔",
                "quick_replies": replies
            };

            cb(null, res);
        }
    
    });
};

module.exports.genGetAddress = function () {
    return {
        "text": "Please share your location if you'd like delivery at your place",
        "quick_replies": [
            {
                "content_type": "location",
            }
        ]
    };
};

function makeTemplate(regions) {
    if (!regions.size) {
        let messageElements = regions.map(region => {
            return (
                {
                    "content_type": "text",
                    "title": region.name,
                    "payload": "REGION_" + region.name
                }
            )
        });
        return messageElements;
    }
    else {
        return [];
    }
}

