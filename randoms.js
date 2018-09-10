db.getCollection('regions').aggregate([
   {
     $project: { 
         delta: {
             $add: [
                 {$abs: { 
                     $subtract: [ "$lat", 23.7300 ] 
                 }}, 
                 {$abs: {
                     $subtract: [ "$long", 90.3900 ]    
                 }}
             ]
         }, 
         name: '$name' }
   }
])




db.getCollection('regions').aggregate([
   {
     $project: { 
         delta: {
             $add: [
                 {$abs: { 
                     $subtract: [ "$lat", 23.7365 ] 
                 }}, 
                 {$abs: {
                     $subtract: [ "$long", 90.407 ]    
                 }}
             ]
         }, 
         name: "$name" ,
      }
   },
   {
       $match : {
            delta: { $lt: 0.05 }
       }
   }
])