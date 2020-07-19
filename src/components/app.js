import {FirebaseContext} from "../firebase";
import Clicker from "./clicker";
import React from "react";
import Intro from './start';
const AppBase = (props)=>{
  const [start,setStart] =  React.useState(false);
  const startIt = (e)=>{
    setStart(true);
  }
  let content = (<><Intro/><div className="start-container"><div className="start" onClick={startIt}>start</div></div></>);
  if(start == true){
    content = <><Clicker/></>
  }
  return content;
}
const App = ()=> {
  

  return (<FirebaseContext.Consumer>
  {firebase => <AppBase firebase={firebase} />}</FirebaseContext.Consumer>)
  }
  export default App