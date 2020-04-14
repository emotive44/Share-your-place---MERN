import React, { useReducer } from 'react';
import './Input.css';

const inputReducer = (state, action) => {
  switch(action.type) {
    case 'CHANGE':
      return {
        ...state,
        isValid: true,
        value: action.val
      };
    default:
      return state;
  }
}

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {value: '', isValid: false});


  const changeHandler = e => {
    dispatch({type: 'CHANGE', val: e.target.value});
  }

  const element = props.element === 'input' 
    ? <input 
          id={props.id} 
          type={props.type} 
          onChange={changeHandler} 
          value={inputState.value}
          placeholder={props.placeholder} 
      /> 
    : <textarea 
        id={props.id} 
        rows={props.rows || 4} 
        onChange={changeHandler} 
        value={inputState.value}
      />

  return (
    <div className={`form-control ${!inputState.isValid && 'form-control--invalid'}`}>
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && <p>{props.errorText}</p>}
    </div>
  );
}

export default Input;
  