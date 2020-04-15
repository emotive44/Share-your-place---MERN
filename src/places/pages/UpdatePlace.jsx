import React from 'react';
import './PlaceForm.css';
import { DUMMY_PLACES } from './UserPlaces';
import { useParams } from 'react-router-dom';
import Input from '../../shared/FormElements/Input';
import Button from '../../shared/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';

const UpdatePlace = () => {
  const placeId = useParams().placeId;

  const identifiedPlace = DUMMY_PLACES.find(place => place.id === placeId);
  
  if(!identifiedPlace) { 
    return (
      <div className="center">
        <h2>Could not find place</h2> 
      </div>
    );
  }
  
  return (
    <form className="place-form">
      <Input 
        id="title"
        type="text"
        valid={true}
        label="title"
        element="input"
        onInput={() => {}}
        value={identifiedPlace.title}
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
      />
       <Input 
        valid={true}
        id="description"
        element="textarea"
        label="description"
        onInput={() => {}}
        value={identifiedPlace.description}
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
      /> 
      <Button type="submit">Update Place</Button>
    </form>
  );
}

export default UpdatePlace;
