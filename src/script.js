function App() {

  const [currentOp, setCurrentOp] = React.useState('0');
  const [previousOp, setPreviousOp] = React.useState('');
  const [mathFormula, setMathFormula] = React.useState('');
  const [wasEvaluated, setWasEvaluated] = React.useState(false);
  
  function handleClear() {
    setCurrentOp('0')
    setPreviousOp('')
    setMathFormula('')
    setWasEvaluated(false)
  }
  
  function handleNumber(e) {
    const value = e.target.innerText;
    console.log(typeof value, value);
      
      if (value >= '0' && value <= '9') {
    if (wasEvaluated === true) {
      setCurrentOp(value);
      setMathFormula(value);
      setWasEvaluated(false);
    } else if (isNaN(currentOp)) {
      setCurrentOp(value);
      setMathFormula(mathFormula + value);
    } else if (currentOp === '0') {
      setCurrentOp(value);
      setMathFormula(value);
    } else {
      setCurrentOp(currentOp + value);
      setMathFormula(mathFormula + value);
    }
  } else if (value === '0' && currentOp !== '0') {
    setCurrentOp(currentOp + value);
    setMathFormula(mathFormula + value);
  }
  else if (value === '0' && currentOp === '0') {
    handleClear();
  }
}
   
 function handleDecimal(e) {
  const decimal = e.target.innerText;

  if (decimal === '.' && currentOp.includes('.')) {
    return;
  }
  
  setCurrentOp(currentOp + decimal);
  setMathFormula(mathFormula + decimal);

  console.log(typeof value, decimal);
 }
    
  
  function handleEquals() {
  const result = eval(mathFormula);
  setMathFormula(mathFormula + '=' + result);
  setCurrentOp(result);
  setWasEvaluated(true);
  setPreviousOp(result.toString());
}

function handleOperator(e) {
  const operator = e.target.innerText;
  const lastChar = mathFormula.slice(-1);

  if (['+', '-', '*', '/'].includes(lastChar) && lastChar !== '-') {
    setMathFormula(mathFormula.slice(0, -1) + operator);
  } else if (wasEvaluated === true) {
    setMathFormula(previousOp + operator);
    setCurrentOp(operator);
    setWasEvaluated(false)
  } else {
    if (!isNaN(parseFloat(currentOp))) {
      const currentOpAsNumber = parseFloat(currentOp);
      setMathFormula(mathFormula + currentOpAsNumber + operator);
      setCurrentOp(operator);
      setPreviousOp(currentOpAsNumber);
    } else if (lastChar === '-' && currentOp === '0') {
      setMathFormula(mathFormula.slice(0, -1) + operator);
      setCurrentOp(operator);
    }
  }
  
  if (operator === '+' || operator === '/' || operator === '*' || operator === '-') {
    if (wasEvaluated === true) {
      setMathFormula(previousOp + operator);
      setPreviousOp('');
      setWasEvaluated(false);
    } else {
      setMathFormula(mathFormula + operator);
    }
  }
}

  return (
    <>
      <div className="App">
        <div className="calculator">
          <div className="formula">{mathFormula}</div>
          <div className="output-display" id="display">{currentOp}</div>
          <div className="clicks">
            <button id="clear" className="doubleW" onClick={handleClear}>C</button>
            <button id="divide" onClick={handleOperator}>/</button>
            <button id="multiply" onClick={handleOperator}>*</button>
            <button id="seven" onClick={handleNumber}>7</button>
            <button id="eight" onClick={handleNumber}>8</button>
            <button id="nine" onClick={handleNumber}>9</button>
            <button id="subtract" onClick={handleOperator}>-</button>
            <button id="four" onClick={handleNumber}>4</button>
            <button id="five" onClick={handleNumber}>5</button>
            <button id="six" onClick={handleNumber}>6</button>
            <button id="add" onClick={handleOperator}>+</button>
            <button id="one" onClick={handleNumber}>1</button>
            <button id="two" onClick={handleNumber}>2</button>
            <button id="three" onClick={handleNumber}>3</button>
            <button id="equals" className="doubleH" onClick={handleEquals}>=</button>
            <button id="zero" className="doubleW" onClick={handleNumber}>0</button>
            <button id="decimal" onClick={handleDecimal}>.</button>
          </div>
        </div>
        <div className="author">
        Created by 
        <br />  
        <a href="https://github.com/TMHermes">THermes</a>
        </div>
      </div>
    </>
  )
}


const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);