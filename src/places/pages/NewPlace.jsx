import React, { useCallback, useReducer } from 'react';
import Input from '../../shared/FormElements/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import Button, {} from '../../shared/FormElements/Button';
import './NewPlace.css';

const formReducer = (state, action) => {
  switch(action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for(let inputId in state.inputs) {
        if(inputId === action.inputId) { // action.isValid depends from validation in Input component
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {value: action.value, isValid: action.isValid}
        },
        isValid: formIsValid // isValid will become true only if all inputs have correctly values
      }
    default:
      return state;
  }
}

const NewPlace = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: { // set initial info for every element in this form
      title: {
        value: '',
        isValid: false
      },
      // description: {
      //   value: '',
      //   isValid: false
      // }
    },
    isValid: false
  });

  const inputHandler = useCallback((id, value, isValid) => { // useCallback stop the infinity loop
    dispatch({type: 'INPUT_CHANGE', value, isValid, inputId: id}) // because this function will be use in Input coponent
  }, []);

  const placeSubmitHandler = e => {
    e.preventDefault();
    console.log(formState.inputs);
  }
  
  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input 
        id="title"
        type="text"
        label="title"
        element="input"
        onInput={inputHandler}
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
      />
      <Input
        id="description" 
        element="textarea"
        label="description"
        onInput={inputHandler}
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)"
      />
      <Input
        id="address" 
        element="input"
        label="address"
        onInput={inputHandler}
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address"
      />
      <Button type="submit" disabled={!formState.isValid}>ADD Place</Button>
    </form>
  ); 
}

export default NewPlace;
 