import React from 'react';
import Input from '../../shared/FormElements/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import Button, {} from '../../shared/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css';

const NewPlace = () => {
  const [formState, inputHandler] = useForm({}, false);

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
 