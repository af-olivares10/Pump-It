import React, {Component} from "react";
import PropTypes from "prop-types";
import PostList from "./PostList"
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
      onHold:false,
      errorMessage: "",
      nickname:"bnpiplayer",
      howTo:false
    };
  }

  play = (event)=>{
    // var s = new buzz.sound('../imports/media/cluck.mp3');
    // s.play();
    // console.log(s);
    var targetElement = event.target || event.srcElement;
    if(targetElement.id==="circle"){
      let nickname = this.state.nickname;
      let user=User.findOne({nickname});
      let nBall = Ball.findOne({});
      if(nBall.size < nBall.maxSize){
        user.score += Math.floor(100*(nBall.size/nBall.maxSize));
        nBall.size += 1;
        if(nBall.size%11===0){
          nBall.x = Math.floor(Math.random()*(1500-nBall.size))
          nBall.y = Math.floor(Math.random()*(1000-nBall.size))
          nBall.x = nBall.x >= nBall.size? nBall.x:nBall.size;
          nBall.y = nBall.y >= nBall.size? nBall.y:nBall.size;
        }
        else {
          nBall.xPrev =  nBall.x;
          nBall.yPrev =  nBall.y;
        }
        User.update(user._id,user);
        Ball.update(nBall._id,nBall);
      }
      else{
        nBall.users = 0;
        user.score -= Math.floor(1000*(nBall.size/nBall.maxSize));
        let opponentNickName = nBall.p1===nickname? nBall.p2: nBall.p1;
        let opponent=User.findOne({nickname: opponentNickName});

        nBall.winner = opponent.score > user.score? opponent.nickname : user.nickname;

        User.update(user._id,user);
        Ball.update(nBall._id,nBall);
      }
    }
    else{

      let nBall = Ball.findOne({});
      let nickname = this.state.nickname;
      let user=User.findOne({nickname});
      user.score -= Math.floor(300*(nBall.size/nBall.maxSize));
      nBall.xPrev =  nBall.x;
      nBall.yPrev =  nBall.y;
      Ball.update(nBall._id,nBall);
      User.update(user._id,user);
    }
  }

  enter = (nickname) => {
    if(!nickname){
      this.setState({errorMessage:"Please choose a nickname"});
      return;
    }
    let user=User.findOne({nickname});
    if(user){
      this.setState({errorMessage:"Nickname already taken, please choose another one."});
    }
    else{
      this.setState({errorMessage:""});
      this.setState({nickname});
      User.insert({nickname,score:0});
      let nBall = Ball.findOne({});
      nBall.users+=1;
      if(nBall.users===1){
        nBall.p1 = nickname;
        nBall.winner = "";
        this.setState({onHold:true});
      }
      else{
        nBall.p2 = nickname;
        nBall.maxSize = 150 + Math.floor(100*Math.random());
        nBall.size = 20;
      }
      Ball.update(nBall._id,nBall);
    }

  }
  restart= ()=>{
    this.setState({nickname:"",onHold:false});
  }
  timeout= ()=>{
    setTimeout(function(){
      let nBall = Ball.findOne({});
      nBall.users = 0;
      Ball.update(nBall._id,nBall);
    }, 300000);
  }
  howToF= (b)=>{
    this.setState({howTo: b});
  }
  render(){
    if(this.props.ball){
      if((this.props.ball.p1===this.state.nickname||this.props.ball.p2===this.state.nickname) && this.props.ball.winner){ //Fin del juego
        return(
          <GameOver winner = {this.props.ball.winner} restart = {this.restart}></GameOver>
        )
      }
      if(this.props.ball.users===2 && (this.props.ball.p1===this.state.nickname||this.props.ball.p2===this.state.nickname)){ //Inicio de juego
        return(
          <Game play = {this.play} ball = {this.props.ball} opponent = {this.props.ball.p1===this.state.nickname?this.props.ball.p2:this.props.ball.p1}  users = {this.props.users} user ={this.state.nickname}></Game>
        )
      }
      if(this.props.ball.users===2){ // Juego en curso
        return <Enter  gameStarted = {true} timeout = {this.timeout}></Enter>
      }
      return <Enter enter ={this.enter} onHold = {(this.props.ball.p1===this.state.nickname&&this.props.ball.users===1)} errorMessage = {this.state.errorMessage} howTo = {this.state.howTo} howToF = {this.howToF}></Enter>
    }
    else{
      return <div></div>
    }

  }
}

export default withTracker(()=>{
  return {
    users: User.find({}).fetch(),
    ball: Ball.find({}).fetch()[0]
  }
})(App);
