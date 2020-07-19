import React from "react";
import {FirebaseContext} from "../firebase";
const Clicker = (props)=> {
  return (<FirebaseContext.Consumer>
  {firebase => <ClickerBase firebase={firebase} />}</FirebaseContext.Consumer>)
}
class ClickerBase extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      population:Math.random()*(10**8),
      rateOfDecrease:1,
      priceOfDecay:10,
      numberKilled:this.props.firebase.getData(),
      errMsg:"",
    };
        this.props.firebase.db.ref('users/score').once("value",async (snap)=>{
      var max = snap.val();
    this.setState({
      population:Math.ceil(500000000000)-max,
      rateOfDecrease:1,
      priceOfDecay:10,
      numberKilled:max,
      errMsg:"",
    })
    });
    this.clicker="";
    this.handleUpgrade = this.handleUpgrade.bind(this)
  }
  componentDidMount(){
    this.tick = setInterval(()=>{
      this.props.firebase.writeScoreData(this.state.numberKilled,"anonymous");
      this.setState({
      population:this.state.population - this.state.rateOfDecrease,
      numberKilled:this.state.numberKilled + this.state.rateOfDecrease
    });
    if(this.state.population < 0 | this.state.population ===0){
      clearInterval(this.tick);
      this.setState({
        population:0
      })
      alert("You have won. You have killed all gangsters. But at what cost?")
    } },2000);
    this.props.firebase.db.ref('users/score').once("value",async (snap)=>{
      var max = snap.val();
    this.setState({
      population:Math.ceil(500000000000000)-max,
      rateOfDecrease:1,
      priceOfDecay:10,
      numberKilled:max,
      errMsg:"",
    })
    });
    console.log(this.state);
  }
  componentWillUnmount() {
    this.tock = clearInterval(this.tick);
  }
  upgrade(){
    this.setState({
      rateOfDecrease:this.state.rateOfDecrease+4,
      priceOfDecay:this.state.priceOfDecay+42
      })
  }
  buy(){
    this.setState({
      numberKilled: this.state.numberKilled-this.state.priceOfDecay,
    })
    this.upgrade()
  }
  handleUpgrade(e){
    if(this.state.numberKilled>=this.state.priceOfDecay){
      this.buy()
      this.setState({
        errMsg:""
      })
    }
    else{
      this.setState({
        errMsg:"Not enough gangsters"
      })
    }
  }
  render(){
    return (
      <div className="gangsters-container">
      <p className="gangsters-error">{this.state.errMsg}</p>
      <img className="gangsters-picture" src="gangsta.png" width={(this.state.population/(150*10**7)).toString()+"px"} onClick={()=>{
        if(this.state.population > 0){
        this.setState({
          population:this.state.population - this.state.rateOfDecrease,numberKilled:this.state.numberKilled + this.state.rateOfDecrease
        });
        }
    }}/>
    <div className="gangsters-stats-container">
      <p className="gangsters-stats">number of gangsters killed: {this.state.numberKilled}</p>
      <p className="gangsters-stats">rate of decrease: {this.state.rateOfDecrease}</p>
      <p className="gangsters-stats">population: {this.state.population}</p>
      </div>
      <button className="gangsters-upgrade"  onClick={this.handleUpgrade}>increase the number of gangsters killed! costs {this.state.priceOfDecay} dead gangsters-</button>
      </div>
    )
  }
}

export default Clicker;