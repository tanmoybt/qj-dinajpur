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
}' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=EAAZAgcMnsu28BAOmeKajr99VWHjmdj3YQ3OcVHZBBVl6aTZCNcyA3xZAHJLCE3vKIHmMFEuCZBsWvrFFs01r7WVaVMP6zhHPgmlcFAHjIxjp34tgPQngnH6IIzdwclL9sTZBMraFk7Cq44tOu2UuXtpK4fUwk9XACMKll7sK6PSQZDZD"



// whitelist

curl -X POST -H "Content-Type: application/json" -d '{
  "whitelisted_domains":[
  "https://6454895f.ngrok.io"
  ]
}' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=EAAZAgcMnsu28BAOmeKajr99VWHjmdj3YQ3OcVHZBBVl6aTZCNcyA3xZAHJLCE3vKIHmMFEuCZBsWvrFFs01r7WVaVMP6zhHPgmlcFAHjIxjp34tgPQngnH6IIzdwclL9sTZBMraFk7Cq44tOu2UuXtpK4fUwk9XACMKll7sK6PSQZDZD" 







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
}' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=EAAZAgcMnsu28BAOmeKajr99VWHjmdj3YQ3OcVHZBBVl6aTZCNcyA3xZAHJLCE3vKIHmMFEuCZBsWvrFFs01r7WVaVMP6zhHPgmlcFAHjIxjp34tgPQngnH6IIzdwclL9sTZBMraFk7Cq44tOu2UuXtpK4fUwk9XACMKll7sK6PSQZDZD" 


curl -X POST -H "Content-Type: application/json" -d '{
  "greeting":[
  {
      "locale":"default",
      "text":"Hi {{user_first_name}} 😊, I am FoodBot, Hungry? Order me foods from around your location. just tell me what you want 🍗🍕🥂"
  }
  ]
}' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=EAAZAgcMnsu28BAOmeKajr99VWHjmdj3YQ3OcVHZBBVl6aTZCNcyA3xZAHJLCE3vKIHmMFEuCZBsWvrFFs01r7WVaVMP6zhHPgmlcFAHjIxjp34tgPQngnH6IIzdwclL9sTZBMraFk7Cq44tOu2UuXtpK4fUwk9XACMKll7sK6PSQZDZD" 




curl -X POST -H "Content-Type: application/json" -d '{
  "get_started":{
    "payload":"GET_STARTED_PAYLOAD"
}
}' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=EAAZAgcMnsu28BAOmeKajr99VWHjmdj3YQ3OcVHZBBVl6aTZCNcyA3xZAHJLCE3vKIHmMFEuCZBsWvrFFs01r7WVaVMP6zhHPgmlcFAHjIxjp34tgPQngnH6IIzdwclL9sTZBMraFk7Cq44tOu2UuXtpK4fUwk9XACMKll7sK6PSQZDZD" 



curl -X POST -H "Content-Type: application/json" -d '{    
  "messages": [
    {
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"generic",
          "elements":[
             {
              "title":"Welcome to Our Marketplace!",
              "image_url":"https://www.facebook.com/jaspers.png",
              "subtitle":"Fresh fruits and vegetables. Yum.",
                  
            }
          ]
        }       
      }
    }
  ]
}' "https://graph.facebook.com/v2.11/me/message_creatives?access_token=EAAZAgcMnsu28BAK6A4XhI6fAEeUrPyx1tuKcEhgBBZA5TVeV81EXuh93GDlRbgsRGaZAr4eBbeG4YgRmLIQLODiaOXFJ3AWFyLQh5UK6x2rgPjvZBPYoxQYuZAyC8PjBc45KCcOzbskukGVW1D0UDIXgqVnaoLe1YeNNFA9vnKZAD9sf3xQk36rw9LLKPtCw0ZD"