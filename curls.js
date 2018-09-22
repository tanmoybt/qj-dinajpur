curl -X POST -H "Content-Type: application/json" -d '{
"get_started":{
    "payload":"GET_STARTED_PAYLOAD"
},
"greeting":[
  {
    "locale":"default",
    "text":"Hi {{user_first_name}} 😊, I'm FoodBot, Hungry? Order me foods from around your location. just tell me what you want"
  }
],
"persistent_menu":[
  {
    "locale":"default",
    "composer_input_disabled": true,
    "call_to_actions":[
      {
        "title":"View cart",
        "type":"postback",
        "payload":"VIEW_CART_POSTBACK"
      },
      {
        "title":"Clear cart",
        "type":"postback",
        "payload":"CLEAR_CART_POSTBACK"
      },
      {
        "title":"More",
        "type":"nested",
        "call_to_actions":[
          {
            "title":"Restart bot",
            "type":"postback",
            "payload":"RESTART_BOT_POSTBACK"
          },
          {
            "title":"Developed by BIGGO LTD",
            "type":"web_url",
            "url":"fb.com/anjantb",
            "webview_height_ratio":"full"
          }
        ]
      }
    ]
  },
  {
    "locale":"zh_CN",
    "composer_input_disabled":false
  }
]
}' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=EAAZAgcMnsu28BAIsqPdoRxn8WumndMZBUFCuvvUguFUPS0V9LL7A13SbqCPzWbP77weIJhW9W9X6pXn6TmfaHaJhVRlFGcqo087hjxBXYPVfWSP0lg1RsO6jk4PCMZCxUZC9vd8zgdkLgGwY8racKtv3WB4yZA0KSgAEArXhqYAZDZD"



// whitelist

curl -X POST -H "Content-Type: application/json" -d '{
  "whitelisted_domains":[
    "https://ancient-fjord-45295.herokuapp.com/"
  ]
}' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=EAAZAgcMnsu28BAIsqPdoRxn8WumndMZBUFCuvvUguFUPS0V9LL7A13SbqCPzWbP77weIJhW9W9X6pXn6TmfaHaJhVRlFGcqo087hjxBXYPVfWSP0lg1RsO6jk4PCMZCxUZC9vd8zgdkLgGwY8racKtv3WB4yZA0KSgAEArXhqYAZDZD" 







curl -X POST -H "Content-Type: application/json" -d '{
  "persistent_menu":[
    {
      "locale":"default",
      "composer_input_disabled": false,
      "call_to_actions":[
        {
          "title":"View cart",
          "type":"postback",
          "payload":"VIEW_CART_POSTBACK"
        },
        {
          "title":"Clear cart",
          "type":"postback",
          "payload":"CLEAR_CART_POSTBACK"
        },
        {
          "title":"More",
          "type":"nested",
          "call_to_actions":[
            {
              "title":"Unsubscribe",
              "type":"postback",
              "payload":"UNSUBSCRIBE_POSTBACK"
            },
            {
              "title":"Developed by BIGGO LTD",
              "type":"web_url",
              "url":"fb.com/anjantb",
              "webview_height_ratio":"full"
            }
          ]
        }
      ]
    }
  ]
}' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=EAAZAgcMnsu28BAIsqPdoRxn8WumndMZBUFCuvvUguFUPS0V9LL7A13SbqCPzWbP77weIJhW9W9X6pXn6TmfaHaJhVRlFGcqo087hjxBXYPVfWSP0lg1RsO6jk4PCMZCxUZC9vd8zgdkLgGwY8racKtv3WB4yZA0KSgAEArXhqYAZDZD" 


curl -X POST -H "Content-Type: application/json" -d '{
  "greeting":[
    {
      "locale":"default",
      "text":"Hi {{user_first_name}} 😊, I am FoodBot, Hungry? Order me foods from around your location. just tell me what you want 🍗🍕🥂"
    }
  ]
}' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=EAAZAgcMnsu28BAIsqPdoRxn8WumndMZBUFCuvvUguFUPS0V9LL7A13SbqCPzWbP77weIJhW9W9X6pXn6TmfaHaJhVRlFGcqo087hjxBXYPVfWSP0lg1RsO6jk4PCMZCxUZC9vd8zgdkLgGwY8racKtv3WB4yZA0KSgAEArXhqYAZDZD" 




curl -X POST -H "Content-Type: application/json" -d '{
  "get_started":{
    "payload":"GET_STARTED_PAYLOAD"
  }
}' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=EAAZAgcMnsu28BAIsqPdoRxn8WumndMZBUFCuvvUguFUPS0V9LL7A13SbqCPzWbP77weIJhW9W9X6pXn6TmfaHaJhVRlFGcqo087hjxBXYPVfWSP0lg1RsO6jk4PCMZCxUZC9vd8zgdkLgGwY8racKtv3WB4yZA0KSgAEArXhqYAZDZD" 
