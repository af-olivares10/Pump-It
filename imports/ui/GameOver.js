import React, {Component} from "react";
import PropTypes from "prop-types";

export default class GameOver extends Component{
  constructor(props){
    super(props);

    this.state={
    };
  }
  render(){
    return(
      <div className =" container">
        <div className =" gameover">
          <div className ="gameover-text">
            <div>
              GAME OVER!
            </div>
            <div>
              winner: {this.props.winner}
            </div>
          </div>
          <div>
            <div className="button">
              <button type="button" className="btn enter-button" onClick={()=>{this.props.restart()}} >So what</button>
            </div>
          </div>
        </div>
      </div>
    )

  }

}
