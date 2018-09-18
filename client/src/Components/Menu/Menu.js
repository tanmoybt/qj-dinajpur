//Comment.js
import React, {Component} from 'react';
import axios from 'axios';

export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pillow: 'off',
            text: "",
            sender: null
        };
    }
    
    pillowChange = e => {
        console.log(e.target.value);
        this.setState({pillow: "on"});
    }
    textChange = e => {
        console.log(e.target.value);
        this.setState({text: e.target.value});
    }

    sendData = () => {
        if(this.state.sender){
            axios.post("/api/cartdata", {data: this.state})
                .then(function(res){
                    console.log(res);
                })
                .catch(function(err){
                    console.log(err);
                })
        }
        
    }

    loadFbMessengerApi = () => {
        let that=this;

        (function(d, s, id){
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {return;}
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/en_US/messenger.Extensions.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'Messenger'));

        window.extAsyncInit = function() {
          // the Messenger Extensions JS SDK is done loading 
            window.MessengerExtensions.getSupportedFeatures(function success(result) {
                let features = result.supported_features;

                if (features.includes("context")) {
                    window.MessengerExtensions.getContext('1794887400602479',
                        function success(thread_context) {
                            // success
                            that.setState({sender: thread_context.psid});
                            console.log(thread_context.psid);
                        },
                        function error(err) {
                            // error
                            console.log(err);
                        }
                    );
                }
            }, function error(err) {
                // error retrieving supported features
                console.log(err);
            });

            document.getElementById('submitButton').addEventListener('click', () => {
                that.sendData();
                window.MessengerExtensions.requestCloseBrowser(function success() {
                    console.log("Webview closing");
                }, function error(err) {
                    console.log(err);
                });
            });
        };
    }

    componentDidMount() {
        this.loadFbMessengerApi();
    }


    render() {
        return (
            <div>
                <h3>Pillows</h3>
                <input type="checkbox" name="pillows" onChange={this.pillowChange} />
                <input type="text" name="pillows" onChange={this.textChange}/>
                <input type="button" id="submitButton" onClick={this.press} value="press"/>
            </div>
        )
    }
}