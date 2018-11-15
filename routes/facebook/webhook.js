const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Router = express.Router();
const request = require("request");

const postback = require("./postbacks");
const messages = require("./messages");

/* For Facebook Validation */
Router.get("/", (req, res) => {
	if (req.query["hub.mode"] && req.query["hub.verify_token"] === "foodbot") {
		res.status(200).send(req.query["hub.challenge"]);
	} else {
		res.status(403).end();
	}
});

let data = [];

/* Handling all messenges */
Router.post("/", (req, res) => {
    console.log("********* new entry ********** ", JSON.stringify(req.body, null, 2));
    return;
	if (req.body.object === "page") {
		console.log("full event : " + JSON.stringify(event, null, 2));
		req.body.entry.forEach(entry => {
			if (entry.messaging) {
				entry.messaging.forEach(event => {
					console.log("full event : " + JSON.stringify(event, null, 2));
					if (event.postback) {
						postback.postbackProcessor(event.sender.id, event.postback);
					}
					if (event.message) {
						messages.messagesProcessor(event.sender.id, event.message);
					}
				});
			}
		});
		res.status(200).end();
	}
});

module.exports = Router;
