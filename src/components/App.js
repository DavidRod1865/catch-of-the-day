import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish"
import base from "../base"

class App extends React.Component{
    state = {
        fishes: {},
        order: {},
    };
    componentDidMount(){
        const { storeId } = this.props.match.params;
        //first reinstate localStorage
        const localStorageRef = localStorage.getItem(storeId);
        //turn localStorage string back to JSON Object and set Order state
        if(localStorageRef){
            this.setState({ order: JSON.parse(localStorageRef) });
        }
        this.ref = base.syncState(`${storeId}/fishes`, {
          context: this,
          state: 'fishes',
        });
    };

    componentDidUpdate(){
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
    };
    
    componentWillUnmount(){
        base.removeBinding(this.ref);
    };

    addFish = (fish) => {
        //Take a copy of the existing state
        const fishes ={ ...this.state.fishes };
        //Add new fish to fishes variable
        fishes[`fish${Date.now}`] = fish;
        //set new fishes object to state
        this.setState({
            fishes: fishes,
        });
    };

    updateFish = (key, updatedFish) =>{
        //Take copy of current state
        const fishes ={ ...this.state.fishes };
        //Update State
        fishes[key] = updatedFish;
        //Set that to state
        this.setState({
            fishes: fishes,
        });
    };

    deleteFish = (key) =>{
        //Take copy of current state
        const fishes ={ ...this.state.fishes };
        //Update State
        fishes[key] = null;
        //Set that to state
        this.setState({
            fishes: fishes,
        });
    };

    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes })
    };

    addToOrder = (key) => {
        //Take a copy of state
        const order = {...this.state.order };
        //Either add to order or update number of order
        order[key] = order[key] + 1 || 1;
        //Call setState to update our state object
        this.setState({
            order: order,
        });
    };

    removeFromOrder = (key) =>{
        //Take copy of current state
        const order = {...this.state.order };
        //Update State, not going to Firebase so use "delete"
        delete order[key];
        //set that to state
        this.setState({
            order: order,
        });
    };

    render(){
        return(
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(
                            key => 
                                <Fish 
                                key={key}
                                index={key}
                                details={this.state.fishes[key]} 
                                addToOrder={this.addToOrder}
                                /> 
                            )
                        }
                    </ul>
                </div>
                <Order 
                    fishes={this.state.fishes} 
                    order={this.state.order} 
                    removeFromOrder={this.removeFromOrder}
                />
                <Inventory 
                    fishes = {this.state.fishes}
                    addFish={this.addFish} 
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    loadSampleFishes={this.loadSampleFishes} 
                />
            </div>
        );
    };
};

export default App;