import React, {Component} from "react";
import PropTypes from "prop-types";
import {withTracker} from "meteor/react-meteor-data"
import {Ball} from "../api/ball"
import {User} from "../api/user"
import Enter from "./Enter"
import Game from "./Game"
import GameOver from "./GameOver"

export  class App extends Component{
  constructor(props){
    super(props);

    this.state={
      errorMessage: "",
      nickname:"bnpiplayer",
      howTo:false,
      ball: {},
      enterLoader :false,
      privateNumber: null,
      wantToJoin: false
    };
  }

  play = (event)=>{
    // var s = new buzz.sound('../imports/media/cluck.mp3');
    // s.play();
    let targetElement = event.target || event.srcElement;
    let id = 1;
    if(targetElement.id==="circle"){
      let nickname = this.state.nickname;

      let user = User.findOne({nickname});
      let nBall = Ball.findOne({_id:this.state.ball._id});

      if(nBall.size < nBall.maxSize){
        user.score += Math.floor(100*(nBall.size/nBall.maxSize));
        nBall.size += 1;
        if(nBall.size%(Math.floor(Math.random()*5)+11)===0 && this.state.nickname === nBall.p1){
          nBall.x = Math.floor(Math.random()*(1500-nBall.size))
          nBall.y = Math.floor(Math.random()*(1000-nBall.size))
          nBall.x = nBall.x >= nBall.size? nBall.x:nBall.size;
          nBall.y = nBall.y >= nBall.size? nBall.y:nBall.size;
        }
        else {
          nBall.xPrev =  nBall.x;
          nBall.yPrev =  nBall.y;
        }
        Meteor.call("users.update",user);
        Meteor.call("balls.update",nBall);

      }
      else{
        nBall.users = 0;
        user.score -= Math.floor(1000*(nBall.size/nBall.maxSize));
        let opponentNickName = nBall.p1===nickname? nBall.p2: nBall.p1;
        let opponent = User.findOne({nickname:opponentNickName});
        nBall.winner = opponent.score > user.score? opponent.nickname : user.nickname;

        Meteor.call("users.update",user);
        Meteor.call("balls.update",nBall);
      }
    }
    else{
      let nBall = Ball.findOne({_id:this.state.ball._id});
      let nickname = this.state.nickname;
      let user = User.findOne({nickname});
      user.score -= Math.floor(300*(nBall.size/nBall.maxSize));
      nBall.xPrev =  nBall.x;
      nBall.yPrev =  nBall.y;
      Meteor.call("users.update",user);
      Meteor.call("balls.update",nBall);


    }

  }

  enter = (nickname, profile) => {

    if(!nickname){
      this.setState({errorMessage:"Please choose a nickname"});
      return;
    }
    let user=User.findOne({nickname});
    if(user){
      this.setState({errorMessage:"Nickname already taken, please choose another one."});
    }
    else{
      this.setState({enterLoader:true});
      this.setState({errorMessage:""});
      this.setState({nickname});
      Meteor.call("users.insert",{nickname,score:0,profile});
      let balls = Ball.find({});
      let nBall = {};
      balls.forEach(function(ba) {
        if(ba.users === 1 && !ba.private){
          nBall = ba;
          return;
        }
      });

      if(!nBall.p1){
        nBall.p1 = nickname;
        nBall.users = 1;
        nBall.winner = "";
        Meteor.call("balls.insert",nBall,function(error, ballId){
          this.setState({ ball:Ball.findOne({_id:ballId}), enterLoader:false }  );
        }.bind(this));
      }
      else{
        nBall.p2 = nickname;
        nBall.users = 2;
        nBall.maxSize = 150 + Math.floor(100*Math.random());
        nBall.size = 20;
        nBall.x = 1000;
        nBall.y = 300;

        nBall.xPrev = nBall.x;
        nBall.yPrev = nBall.y;
        this.setState({ ball: nBall});
        Meteor.call("balls.update",nBall);
      }
    }

  }
  restart= ()=>{
    this.setState({nickname:"", enterLoader:false, ball: {} });
  }

  howToF= (b)=>{
    this.setState({howTo: b});
  }

  createPrivateMatch = (nickname, profile)=>{
    if(!nickname){
      this.setState({errorMessage:"Please choose a nickname"});
      return;
    }
    let user=User.findOne({nickname});
    if(user){
      this.setState({errorMessage:"Nickname already taken, please choose another one."});
    }
    else{
      this.setState({enterLoader:true});
      this.setState({errorMessage:""});
      this.setState({nickname});

      Meteor.call("users.insert",{nickname,score:0,profile});
      let nBall = {};
      nBall.p1 = nickname;
      nBall.users = 1;
      nBall.private = true;
      nBall.winner = "";
      Meteor.call("balls.insert",nBall,function(error, ballId){
        this.setState({ ball:Ball.findOne({_id:ballId}), enterLoader:false, privateNumber:ballId }  );
      }.bind(this));
    }
  }
  joinView= (b)=>{
    this.setState({wantToJoin: b});
  }
  joinPrivateMatch = (id,nickname,profile)=>{
    if(!nickname){
      this.setState({errorMessage:"Please choose a nickname"});
      return;
    }
    let user=User.findOne({nickname});
    if(user){
      this.setState({errorMessage:"Nickname already taken, please choose another one."});
    }
    else{
      this.setState({enterLoader:true});
      this.setState({errorMessage:""});
      this.setState({nickname});
      let nBall = Ball.findOne({_id:id});
      if(!nBall){
        this.setState({errorMessage:"Invalid code"});
        return;
      }
      if(nBall.users === 2){
        this.setState({errorMessage:"Invalid code"});
        return;
      }
      Meteor.call("users.insert",{nickname,score:0,profile});
      nBall.p2 = nickname;
      nBall.users = 2;
      nBall.maxSize = 150 + Math.floor(100*Math.random());
      nBall.size = 20;
      nBall.x = 1000;
      nBall.y = 300;
      nBall.xPrev = nBall.x;
      nBall.yPrev = nBall.y;
      this.setState({ ball: nBall});
      Meteor.call("balls.update",nBall);
    }
  }

  render(){

    if(this.state.ball.p1){
      var bigBall = Ball.findOne({_id:this.state.ball._id});
      if(bigBall.winner){ //Fin del juego
        return(
          <GameOver winner = {bigBall.winner} restart = {this.restart}></GameOver>
        )
      }
      if(bigBall.users===2 ){ //Inicio de juego
        return(
          <Game play = {this.play} ball = {bigBall} opponent = {bigBall.p1===this.state.nickname?bigBall.p2:bigBall.p1}  users = {this.props.users} user ={this.state.nickname}></Game>
        )
      }
      return <Enter wantToJoin ={this.state.wantToJoin} enter ={this.enter} onHold = {(bigBall.p1===this.state.nickname&&bigBall.users===1)}
        privateNumber = {this.state.privateNumber} errorMessage = {this.state.errorMessage} howTo = {this.state.howTo} howToF = {this.howToF}
         enterLoader = {this.state.enterLoader} createPrivateMatch={this.createPrivateMatch} joinPrivateMatch={this.joinPrivateMatch} joinView = {this.joinView}></Enter>
    }
    else{
      return <Enter wantToJoin ={this.state.wantToJoin} enter ={this.enter}  errorMessage = {this.state.errorMessage} howTo = {this.state.howTo}
        howToF = {this.howToF} enterLoader = {this.state.enterLoader} createPrivateMatch={this.createPrivateMatch}
        joinPrivateMatch={this.joinPrivateMatch} joinView = {this.joinView}></Enter>
    }

  }
}

export default withTracker(()=>{
  return {
    users: User.find({}).fetch(),
    balls: Ball.find({}).fetch()
  }
})(App);
