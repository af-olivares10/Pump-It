import React, {Component} from "react";
import PropTypes from "prop-types";
export default class Enter extends Component{
  constructor(props){
    super(props);

    this.state={
    };
  }
  enterMod = ()=>{
    if(this.props.howTo){
      return (<div><div className = "wait-text">Get points by pumping up the ball. Click the ball to pump it. The bigger the ball is, the more points you get. Make sure you click the ball or else you'll get some points discounted. If you pop the ball, you will loose a lot of points.</div>
      <div className="button enter">
        <button type="button" className="btn enter-button " onClick={()=>{this.props.howToF(false)}} > Got it!</button>
      </div>
     </div>)
    }
    if(this.props.gameStarted){
      return (<div><div className = "wait-text">There's a match taking place, please wait (5 minutes) until it's over...</div><div className="loader"></div> </div>)
    }
    if(this.props.onHold){
      return (<div><div className = "wait-text">Waiting for other players to join the game...</div><div className="loader"></div> </div>)
    }
    else return(
      <div className ="enter">
        <div className = "nick-name">
          <input type = "text" className = "input" placeholder="Nickname" ref = "text"/>
          <div style ={{  color: "red" }}>{this.props.errorMessage}</div>

        </div>
        <div className="button">
          <button type="button" className="btn enter-button" onClick={()=>{this.props.enter(this.refs.text.value.trim())}} >Enter</button>
        </div>
        <div className="button">
          <button type="button" className="btn howTo-button" onClick={()=>{this.props.howToF(true)}} >How to play</button>
        </div>
      </div>
    )
  }
  timeout = ()=>{
    if(this.props.gameStarted){
      this.props.timeout();
    }
    return;
  }
  render(){
    return(
      <div className =" container">
        <div className ="pump-it">
          <div style= {{"color":"white "}}>PUMP</div>
          <div style= {{"color":"#8e0000"}}>IT</div>
        </div>
        <div>
          {this.enterMod()}
        </div>
        <div>
          {this.timeout()}
        </div>
      </div>
    )

  }

}
