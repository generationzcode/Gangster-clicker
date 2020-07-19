import React from "react";
class Intro extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (<div className="gang-intro-container">
    <h2 className="intro-gang">You are a part of a gang. The wealthiest, toughest, best gang there could be. You have been ordered to kill all other gang members until they are all gone!!</h2>
    </div>)
  }
}
export default Intro;