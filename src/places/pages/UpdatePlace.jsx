import React from 'react';
import './PlaceForm.css';
import { DUMMY_PLACES } from './UserPlaces';
import { useParams } from 'react-router-dom';
import Input from '../../shared/FormElements/Input';
import Button from '../../shared/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';

const UpdatePlace = () => {
  const placeId = useParams().placeId;

  const identifiedPlace = DUMMY_PLACES.find(place => place.id === placeId);
  
  const [formState, inputHandler] = useForm({
    title: {
      value: identifiedPlace.title,
      isValid: true
    },
    description: {
      value: identifiedPlace.description,
      isValid: true
    }
  }, true);

  const placeUpdateSubmitHandler = e => {
    e.preventDefault();
    console.log(formState.inputs);
  }

  if(!identifiedPlace) { 
    return (
      <div className="center">
        <h2>Could not find place</h2> 
      </div>
    );
  }
  
  return ( 
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input 
        id="title"
        type="text"
        label="title"
        element="input"
        onInput={inputHandler}
        validators={[VALIDATOR_REQUIRE()]}
        value={formState.inputs.title.value}
        valid={formState.inputs.title.isValid}
        errorText="Please enter a valid title."
      />
       <Input 
        id="description"
        element="textarea"
        label="description"
        onInput={inputHandler}
        validators={[VALIDATOR_MINLENGTH(5)]}  
        value={formState.inputs.description.value}
        valid={formState.inputs.description.isValid}
        errorText="Please enter a valid description (min. 5 characters)."
      /> 
      <Button type="submit" disabled={!formState.isValid}>
        Update Place
      </Button>
    </form>
  );
}

export default UpdatePlace;
