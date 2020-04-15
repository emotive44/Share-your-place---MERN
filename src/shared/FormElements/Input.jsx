import React, { useReducer, useEffect } from 'react';
import { validate } from '../util/validators';
import './Input.css';

const inputReducer = (state, action) => {
  switch(action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case 'TOUCH': 
      return {
        ...state,
        isTouched: true
      }
    default:
      return state;
  }
}

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {value: '', isValid: false, isTouched: false});
  const { value, isValid } = inputState;
  const { id, onInput } = props;

  // if: id, value, isValid, onInput are changed this component will be re-render;
  useEffect(() => {
    onInput(id, value, isValid)
  }, [id, value, isValid, onInput]);
  // end //

  const changeHandler = e => {
    dispatch({type: 'CHANGE', val: e.target.value, validators: props.validators});
  }

  const touchHandler = () => {
    dispatch({type: 'TOUCH'});
  }

  const element = props.element === 'input' 
    ? <input 
          id={props.id} 
          type={props.type} 
          onBlur={touchHandler}
          onChange={changeHandler} 
          value={inputState.value}
          placeholder={props.placeholder} 
      /> 
    : <textarea 
        id={props.id} 
        onBlur={touchHandler}
        rows={props.rows || 4} 
        onChange={changeHandler} 
        value={inputState.value}
      />

  return (  //here check for valid value and change styles if is not correct;
    <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
}

export default Input;
  