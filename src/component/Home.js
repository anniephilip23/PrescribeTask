import React, { Component } from 'react';
import fire from '../config/Fire';
import * as firebase from "firebase"

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            butn1: false, //flag for enabing/diabling button1 
            butn2: false, //flag for enabing/diabling button1 
            btn1Onclick: false, //flag for button1 click event
            btn2Onclick: false, //flag for button2 click event
        }
    }

    // event to run during log out
    logout = () => {
        firebase.database().ref("button2").set(false)
        firebase.database().ref("button1").set(false)
        fire.auth().signOut();
    }

    componentDidMount() {
        // check for button clic
        if (this.state.btn1Onclick == false) {
            //database().ref().on() -- will update changes in Db without refreshing the page. 
            firebase.database().ref("button1").on('value', (snapshot) => {
                const userObj1 = snapshot.val();
                this.setState({ butn1: userObj1 })
            });
        }
        if (this.state.btn1Onclick == false) {
            //database().ref().on() -- will update changes in Db without refreshing the page. 
            firebase.database().ref("button2").on('value', (snapshot) => {
                const userObj2 = snapshot.val();
                this.setState({ butn2: userObj2 })
            });
        }
        window.addEventListener('beforeunload', this.update);// event to triger on window or browser close
        window.addEventListener('onpopstate', this.onBackButtonEvent);// event to triger on window back button

    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.update);
        window.removeEventListener('onpopstate', this.onBackButtonEvent);
    }

    // button1 onClick event
    click1 = e => {
        firebase.database().ref("button1").set(true) // set button1 to disbale statein DB
        this.setState({ butn1: false })
        this.setState({ btn1Onclick: true }) // set button1 clicked flag true
    }
    // button2 onClick event
    click2 = e => {
        firebase.database().ref("button2").set(true) // set button1 to disbale statein DB
        this.setState({ butn2: false })
        this.setState({ btn2Onclick: true })  // set button2 clicked flag true
    }

    // event to execute on window or browser close
    update = e => {
        if (this.state.btn1Onclick == true) { firebase.database().ref("button1").set(false) }
        if (this.state.btn2Onclick == true) { firebase.database().ref("button2").set(false) }
    }
    // event for back button press in window or browser
    onBackButtonEvent = e => {
        if (this.state.btn1Onclick == true) { firebase.database().ref("button1").set(false) }
        if (this.state.btn2Onclick == true) { firebase.database().ref("button2").set(false) }
    }

    render() {
        return (

            <div>
                <div className="row" style={{ paddingTop: "3%", textAlign: "center" }}>
                    <div className="col-md-8"><h1> Welcome home!</h1></div>
                    <div className="col-md-4"><button id="log" onClick={this.logout}> Log Out </button></div>
                </div>
                <div className="row" style={{ marginTop: "10%", textAlign: "center" }}>
                    <div className="col-md-4"><button className="butn" disabled={this.state.butn1} onClick={this.click1} >Button 1</button></div>
                    <div className="col-md-4"><button className="butn" disabled={this.state.butn2} onClick={this.click2}>Button 2</button></div>

                </div>
            </div>

        )
    }
}

export default Home;