import { useCallback, useReducer } from 'react';

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
    case 'SET_DATA': 
      return {
        inputs: action.inputs,
        isValid: action.formIsValid
      }
    default:
      return state;
  }
}

export const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs ,
    isValid: initialFormValidity
  });

  const inputHandler = useCallback((id, value, isValid) => { // useCallback stop the infinity loop
    dispatch({type: 'INPUT_CHANGE', value, isValid, inputId: id}) // because this function will be use in Input coponent
  }, []);

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({type: 'SET_DATA', inputs: inputData, formIsValidity: formValidity })
  }, []);

  return [formState, inputHandler, setFormData];
}