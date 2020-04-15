import React from 'react';
import Input from '../../shared/FormElements/Input';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
import './NewPlace.css';

const NewPlace = () => {
  return (
    <form className="place-form">
      <Input 
        type="text"
        label="title"
        element="input"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
      />
    </form>
  ); 
}

export default NewPlace;
 