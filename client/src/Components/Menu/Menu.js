//Comment.js
import React, {Component} from 'react';
import axios from 'axios';

export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foods: [],
            error: null,
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
            axios.post("api/cartdata", {data: this.state})
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
        };
    }

    onSubmit = e => {
        if(this.state.sender){
            axios.post("api/cartdata", {data: this.state})
                .then(function(res){
                    console.log(res);
                    window.MessengerExtensions.requestCloseBrowser(function success() {
                        console.log("Webview closing");
                    }, function error(err) {
                        console.log(err);
                    });
                })
                .catch(function(err){
                    console.log(err);
                    window.MessengerExtensions.requestCloseBrowser(function success() {
                        console.log("Webview closing");
                    }, function error(err) {
                        console.log(err);
                    });
                })
        }
        else {
            window.MessengerExtensions.requestCloseBrowser(function success() {
                console.log("Webview closing");
            }, function error(err) {
                console.log(err);
            });
        }
        
    }

    componentDidMount() {

        this.loadFbMessengerApi();
        console.log(this.props.match.params.restaurant_name);
        let that=this;
        axios.get("/api/menu/" + this.props.match.params.restaurant_name)
            .then(res => {
                if(res.data.error){
                    that.setState({error: "error"});
                }
                else{
                    that.setState({foods: res.data});
                }
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }


    render() {
        return (
            <div style={{padding: 3}}>
                <div style={{display: "flex", marginBottom: 16}}>
                    <h1 style={{flex: 1}}>{this.props.match.params.restaurant_name}</h1>
                    <h2 ><i className="fas fa-shopping-cart"></i><sup id="count">0</sup></h2>
                </div>
                {this.state.error && 
                    <h2>Restaurant not found</h2>
                }
                {!this.state.error && !this.state.foods.length &&
                    <h2>Food Menu Loading</h2>
                }
                {this.state.foods.length && !this.state.error &&
                    <div>
                        Hi
                    </div>
                }
                <div>

                </div>
            </div>
        )
    }
}