import React, {Component} from "react";
import PropTypes from "prop-types";

export  default class Game extends Component{
  constructor(props){
    super(props);

    this.state={
      users:[]
    };
  }

  componentDidUpdate(){
    document.getElementById("animateCircleCx").beginElement();
    document.getElementById("animateCircleCy").beginElement();

  }

  showBall = ()=>{
    if(this.props.ball){
      let size = this.props.ball.size;
      let vRed = 255+ Math.floor(255*20/this.props.ball.maxSize)- Math.floor(255*this.props.ball.size/this.props.ball.maxSize);
      let rRed = 255;
      let gRed = vRed;
      let bRed = vRed;
      let sRRed = Math.floor(0.3*rRed);
      let sGRed = Math.floor(0.3*gRed);
      let sBRed = Math.floor(0.3*bRed);
      let rgbRed = "rgb("+rRed+","+gRed+","+bRed+")";
      let rgbSRed = "rgb("+sRRed+","+sGRed+","+sBRed+")";

      let rYellow = 255;
      let gYellow = 255;
      let bYellow = 255;
      let sRYellow = Math.floor(0.3*rYellow);
      let sGYellow = Math.floor(0.3*gYellow);
      let sBYellow = Math.floor(0.3*bYellow);
      let rgbYellow = "rgb("+rYellow+","+gYellow+","+bYellow+")";
      let rgbSYellow = "rgb("+sRYellow+","+sGYellow+","+sBYellow+")";


      let x =  this.props.ball.x;
      let y =  this.props.ball.y;
      let xPrev =  this.props.ball.xPrev;
      let yPrev =  this.props.ball.yPrev;
      let animateColor = rgbYellow+";"+rgbRed+";"+rgbYellow
      let animateColorShadow = rgbSYellow+";"+rgbSRed+";"+rgbSYellow

      return  (
        <svg className="full" id="svg" onClick= {this.props.play}>
          <circle cx={x} cy={y} r={size} stroke="black" strokeWidth="2"    id="circle" fill = "url(#gradient)"/>
          <animate
            id= "animateCircleCx"
            xlinkHref="#circle"
            attributeName="cx"
            from={xPrev}
            to={x}
            dur="0.1"
            begin="click"
            fill="freeze" />
            <animate
              id= "animateCircleCy"
              xlinkHref="#circle"
              attributeName="cy"
              from={yPrev}
              to={y}
              dur="0.1"
              begin="click"
              fill="freeze" />
              <defs>
                <radialGradient id="gradient" cx="40%" cy="40%" r="50%" fx="40%" fy="40%">
                  <stop offset="0%"  stopOpacity= "1" >
                    <animate attributeName="stop-color" values={animateColor} dur="1s" repeatCount="indefinite"></animate>
                  </stop>
                  <stop offset="100%"  stopOpacity= "1" >
                    <animate attributeName="stop-color" values={animateColorShadow} dur="1s" repeatCount="indefinite"></animate>
                  </stop>
                </radialGradient>
              </defs>
            </svg>
          )
        }
      }
      showHighScores = ()=>{
        let users =this.props.users;
        users.sort(function(a,b){
          return parseFloat(b.score) - parseFloat(a.score);
        });
        return users.slice(0,10).map((u,i) =>
        <div key = {i} > {u.nickname}: {u.score}</div>
      );
    }
    showCurrentScores = ()=>{
      let users =this.props.users;
      users.sort(function(a,b){
        return parseFloat(b.score) - parseFloat(a.score);
      });
      return users.map((u,i) =>{
        if(u.nickname === this.props.user){
          return(
            <div key = {i} > {u.nickname} (you): {u.score}</div>
          )
        }
        else if(u.nickname === this.props.opponent){
          return(
            <div key = {i} > {u.nickname}: {u.score}</div>
          )
        }
      }
    );
  }
  render(){
    return(
      <div className="full">
        <div className="in-game-text position-absolute" onClick= {()=>this.props.play(false)}>
          <span className ="opponent-text"> Playing against {this.props.opponent}</span>
          <div className ="highscore">Current match</div>
          <span className ="highscores-text">{this.showCurrentScores()}</span>
          <div className ="highscore">High Scores</div>
          <span className ="highscores-text">{this.showHighScores()}</span>

          {/* Playing against {this.props.opponent} */}
        </div>
        <div className="full">
          {this.showBall()}
        </div>
      </div>

    )
  }
}
