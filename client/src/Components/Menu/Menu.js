//Comment.js
import React, {Component} from 'react';
import axios from 'axios';




export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foods: [],
            error: null,
            msg: false,
            sender: null,
            cart: [],
            cartCount: 0,
            disables: []
        };
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
        if(!this.state.sender){
            axios.post("/api/cartdata", {cart: this.state.cart, sender: this.state.sender, restaurant: this.props.match.params.restaurant_name})
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
                    let newDisables = [];
                    res.data.forEach(function(category){
                        category.foods.forEach(function(food){
                            food.food_size.forEach(function(size){
                                size.disabled = "";
                            });
                        });
                    });
                    that.setState({foods: res.data});
                }
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    onAddToCart = (foodId, foodName, sizeId, size, price) => {
        
        let cartInState = this.state.cart;
        let foodsNew = this.state.foods;
        let cartCount = this.state.cartCount;

        let flag = true;
        cartInState.forEach(function(cartItem){
            if(cartItem.food_id === foodId && cartItem.size_id === sizeId){
                cartItem.quantity ++;
                flag = false;
            }
        })
        if(flag){
            cartInState.push({
                food_id: foodId,
                food_name: foodName,
                size_id: sizeId,
                size: size,
                quantity: 1,
                price: price,
                image_url: "https://media-cdn.tripadvisor.com/media/photo-s/0a/56/44/5a/restaurant.jpg"
            })
            
            foodsNew.forEach(function(category){
                category.foods.forEach(function(food){
                    if(food._id === foodId){
                        food.food_size.forEach(function(size){
                            if(size._id === sizeId){
                                size.disabled = "disabled"
                            }
                        })
                    }
                })
            })

        }
        cartCount ++;

        this.setState({cart: cartInState, foods: foodsNew, cartCount: cartCount});
        
    }

    onRemoveFromCart = (foodId, foodName, sizeId, size, price) => {
        
        let cartInState = this.state.cart;
        let foodsNew = this.state.foods;
        let cartCount = this.state.cartCount;


        for(let i=0; i < cartInState.length; i++){
            if(cartInState[i].food_id === foodId && cartInState[i].size_id === sizeId){
                console.log("found");
                if(cartInState[i].quantity === 1){
                    // remove
                    cartInState.splice(i, 1);
                    cartCount--;

                    foodsNew.forEach(function(category){
                        category.foods.forEach(function(food){
                            if(food._id === foodId){
                                food.food_size.forEach(function(size){
                                    if(size._id === sizeId){
                                        size.disabled = ""
                                    }
                                })
                            }
                        })
                    })

                }

                else if(cartInState[i].quantity > 1){
                    // reduce
                    cartInState[i].quantity--;
                    cartCount--;
                    this.setState({cartCount: cartCount});
                }

                break;
            }
        }

        this.setState({cart: cartInState, foods: foodsNew, cartCount: cartCount});
        
    }


    render() {

        let that=this;
        let menu = this.state.foods.map(function(category){
            return (
                    <div key={category._id}>
                        <h2 style={{marginBottom: 16}}>{category._id}</h2>
                        {
                            category.foods.map(function(food){
                                return (
                                        <div style={{display: 'flex'}} key={food._id}>
                                            <div style={{flex: 1}} id="foodname" >
                                                <h3 style={{marginTop: 0}}>{food.food_name}</h3>
                                                <h6 style={{marginTop: 0}}>{food.desc}</h6>
                                            </div>
                                            <div style={{flex: 1}} id="sizes" >
                                                {
                                                    food.food_size.map(function(size){
                                                        return (
                                                                <div key={size._id} style={{display: 'flex'}}>
                                                                    <div style={{flex: 1}}>
                                                                        <h5 style={{marginTop: 0}}>{size.size}</h5>
                                                                        <h5 style={{marginTop: 0}}> ৳{size.price}</h5>
                                                                    </div>
                                                                    <div style={{flex: 1}}>
                                                                        <button onClick={(e) => that.onAddToCart(food._id, food.food_name, size._id, size.size, size.price)} 
                                                                            className='btn btn-success'><span className='glyphicon glyphicon-plus'></span></button> 
                                                                        <button disabled={!size.disabled} className='btn btn-danger'
                                                                                onClick={(e) => that.onRemoveFromCart(food._id, food.food_name, size._id, size.size, size.price)}>
                                                                            <span className='glyphicon glyphicon-minus'></span>
                                                                        </button> 

                                                                    </div>
                                                                </div>

                                                            )
                                                    })
                                                }
                                            </div>
                                            <hr/>
                                        </div>

                                    )
                            })
                        }
                    </div>
                )
        })

        return (
            <div style={{padding: 3}}>
                <div style={{display: "flex", marginBottom: 16}}>
                    <h1 style={{flex: 1}}>{this.props.match.params.restaurant_name}</h1>
                    <h2 ><i className="fas fa-shopping-cart"></i><sup id="count">{this.state.cartCount}</sup></h2>
                </div>
                {this.state.error && 
                    <h2>Restaurant not found</h2>
                }
                {!this.state.error && !this.state.foods.length &&
                    <h2>Food Menu Loading</h2>
                }
                {this.state.foods.length && !this.state.error &&
                    <div style={{marginBottom: 50}}>
                        {menu}
                    </div>
                }
                <div style={{position: 'fixed', bottom: 5, left: 0, width: '100%'}}>

                    {this.state.sender &&
                         <button disabled={!this.state.cart.length} style={{width: '100%'}} className="btn btn-danger" onClick={this.onSubmit}>
                            Submit
                        </button>
                    }
                   
                </div>
            </div>
        )
    }
}