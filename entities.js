/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

// var apiai = require("../module/apiai");
const apiai = require("./routes/facebook/apiai");
const Cuisine = require("./model/Cuisines");
const FoodTag = require("./model/Food_Tags");
const IngredientTag = require("./model/Ingredients_Tags");
const Restaurant = require("./model/Restaurants");

var sessionId = "1";

var user_entities = [
	{
		synonyms: ["kiwi"],
		value: "kiwi"
	}
];

module.exports.makeCuisineEntities = function() {
	let data = [];

	Cuisine.find(function(err, cuisines) {
		console.log("cuisines" + cuisines);
		cuisines.forEach(function(cuisine) {
			let subData = {
				value: cuisine.cuisine
			};

			data.push(subData);
		});
		console.log("data : " + JSON.stringify(data, null, 2));
		let entities = {
			entries: data,
			name: "cuisine"
		};
		apiai.buildEntity(entities, function() {});
	});
};

module.exports.makeFoodTagEntities = function() {
	let data = [];

	FoodTag.find(function(err, foodtags) {
		console.log("foodtags" + foodtags);
		foodtags.forEach(function(foodtag) {
			let subData = {
				value: foodtag.tag
			};

			data.push(subData);
		});
		console.log("dtat : " + JSON.stringify(data, null, 2));
		let entities = {
			entries: data,
			name: "food_tag"
		};
		apiai.buildEntity(entities, function() {});
	});
};

module.exports.makeIngredientTagEntities = function() {
	let data = [];
	IngredientTag.find(function(err, ingredienttags) {
		console.log("foodtags" + ingredienttags);
		ingredienttags.forEach(function(ingredienttag) {
			let subData = {
				value: ingredienttag.tag
			};

			data.push(subData);
		});
		console.log("dtat : " + JSON.stringify(data, null, 2));
		let entities = {
			entries: data,
			name: "ingredient_tag"
		};
		apiai.buildEntity(entities, function() {});
	});
};

module.exports.makeRestaurantNameEntities = function() {
	let data = [];
	Restaurant.find(function(err, restaurants) {
		console.log("foodtags" + restaurants);
		restaurants.forEach(function(restaurant) {
			let subData = {
				value: restaurant.name
			};

			data.push(subData);
		});
		console.log("dtat : " + JSON.stringify(data, null, 2));
		let entities = {
			entries: data,
			name: "restaurant_name"
		};
		apiai.buildEntity(entities, function() {});
	});
};

// entities.makeCuisineEntities();
// entities.makeFoodTagEntities ();
// entities.makeFoodTagEntities ();
// entities.makeIngredientTagEntities();
// entities.makeRestaurantNameEntities();
