import { Component } from 'react';
import './App.css';

class WhoAmI extends Component {
  constructor(props){
    super(props);
    this.state = {
        years: 27,
        text: 'tertser',
        position: ''
    }
    //this.nextYear = this.nextYear.bind(this);
  }
  nextYear = () =>  {
        this.setState(state =>({
            years: state.years + 1
        }))
  }
  next = () => {
        this.setState(state =>(
            {
          text: state.text +'*',
          years: state.years - 1,
      }
        ))
}
    commitInputChanges = (e, color) => {
        console.log(color);
       
        this.setState ({
        position: e.target.value
    })
}

    render() { 
        
            const {name, surname, link} = this.props;
            const {position, years, text} = this.state;
            return (
                <div>
                    <button onClick = {this.nextYear}>{text}</button>
                    <button onClick={this.next}>{text}</button>
                    <h1>My name is {name} , surname : {surname},
                     my age {years}, This state position:{position} </h1>
                    <a href={link}>My Profile</a>
                    <from>
                        <span>Enter employer</span>
                        <input type="text"onChange= {(e) => this.commitInputChanges(e, 'some color')} />
                    </from>
                </div>
                ) 
        }
}




function App() {
  return (
    <div className="App">
      <h1 className="App-header">
        <WhoAmI name='Alex' surname='Borsuk' link='www.leningad.ru'/>
        <WhoAmI name='Ivan' surname='ivanov' link='www.leningad.ru'/>
        </h1>
        
    </div>
  );
}

export default App;


