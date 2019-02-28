import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      expression: "",
      currentNum: "",
      display: false,
      wasCalculate: false,
      test: ""
    }
    this.handleClick = this.handleClick.bind(this);
    this.clear = this.clear.bind(this);
    this.sumAll = this.sumAll.bind(this);
  }

  sumAll(){
    const operators = ['+', '-', '*', '/'];
    if(operators.indexOf(this.state.currentNum) !== -1 || this.state.currentNum[this.state.currentNum.length-1] === "." || this.state.wasCalculate){
      return;
    }
    const sum = eval(this.state.expression);
    const sum1 = this.state.expression + "=" + sum;
    this.setState({ expression: sum1, currentNum: sum, wasCalculate: true })
  }

  clear(){
    this.setState({expression: "", currentNum: "", display: false});
  }

  handleClick(e){
    const operators = ['+', '-', '*', '/']
    const text = e.target.innerText;
    let { expression } = this.state;
    let { currentNum } = this.state;
    //The case if the calculation was done
    if(expression.indexOf("=") !== -1){
      if(operators.indexOf(text) === -1 && text !== "."){
        expression = text;
        currentNum = text;
      } else if(text === "."){
        expression = "0.";
        currentNum = "0.";
      } else {
        expression = currentNum + text;
        currentNum = text;
      }
      this.setState({expression, currentNum, wasCalculate: false});
      return;
    }
    //Prevents multiple dots
    if(text === "." && currentNum.indexOf(".") !== -1){
      return;
    }
    //Adds 0 if next value begin with dot (.)
    if(text === "." && (!currentNum || operators.indexOf(expression[expression.length-1]) !== -1)){
      currentNum = "0";
      expression += "0";
    }
    //Prevents beginning of the mathematical expression with an aritmetic function
    if(!expression && (text === '+' || text === '-' || text === '/' || text === '*' || text ==='0')){
      return;
    }
    expression += text;
    //Prevents using of multiple operators consecutively
    if(operators.indexOf(text) !== -1){
      if(operators.indexOf(currentNum) !== -1){
        expression = expression.slice(0, expression.length-2) + text;
        currentNum = text;
      } else{
        currentNum = text;
      }
    } else{
      if(operators.indexOf(currentNum) === -1){
        currentNum += text;
      } else {
        currentNum = text;
      }
    }
    this.setState({ expression, currentNum, display: true, wasCalculate: false })    
  }

  render() {
    return (
      <div className="calculator">
        <div id="screen">
          <div id="expression">{this.state.display && this.state.expression}</div>
          <div id="display">{!this.state.currentNum ? "0" : this.state.currentNum}</div>
        </div>
        <div id="keyboard">
          <div className="column">
            <div className="row">
              <div id="clear" className="pad" onClick={this.clear}>
                <span>AC</span>
              </div>
              <div id="divide" className="pad" onClick={this.handleClick}>
                <span>/</span>
              </div>
            </div>
            <div className="row">
              <div id="seven" className="pad" onClick={this.handleClick}>
                <span>7</span>
              </div>
              <div id="eight" className="pad" onClick={this.handleClick}>
                <span>8</span>
              </div>
              <div id="nine" className="pad" onClick={this.handleClick}>
                <span>9</span>
              </div>
            </div>
            <div className="row">
              <div id="four" className="pad" onClick={this.handleClick}>
                <span>4</span>
              </div>
              <div id="five" className="pad" onClick={this.handleClick}>
                <span>5</span>
              </div>
              <div id="six" className="pad" onClick={this.handleClick}>
                <span>6</span>
              </div>
            </div>
            <div className="row">
              <div id="one" className="pad" onClick={this.handleClick}>
                <span>1</span>
              </div>
              <div id="two" className="pad" onClick={this.handleClick}>
                <span>2</span>
              </div>
              <div id="three" className="pad" onClick={this.handleClick}>
                <span>3</span>
              </div>
            </div>
            <div className="row">
              <div id="zero" className="pad" onClick={this.handleClick}>
                <span>0</span>
              </div>
              <div id="decimal" className="pad" onClick={this.handleClick}>
                <span>.</span>
              </div>
            </div>
          </div>
          <div className="column">
            <div id="multiply" className="pad" onClick={this.handleClick}>
              <span>*</span>
            </div>
            <div id="subtract" className="pad" onClick={this.handleClick}>
              <span>-</span>
            </div>
            <div id="add" className="pad" onClick={this.handleClick}>
              <span>+</span>
            </div>
            <div id="equals" className="pad" onClick={this.sumAll}>
              <span>=</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;