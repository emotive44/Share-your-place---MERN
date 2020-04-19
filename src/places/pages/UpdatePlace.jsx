import React, { useEffect, useState } from 'react';
import './PlaceForm.css';
import { DUMMY_PLACES } from './UserPlaces';
import { useParams } from 'react-router-dom';
import Card from '../../shared/UIElements/Card';
import Input from '../../shared/FormElements/Input';
import Button from '../../shared/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;

  const identifiedPlace = DUMMY_PLACES.find(place => place.id === placeId);
  
  const [formState, inputHandler, setFormData] = useForm({}, false);

  useEffect(() => {
    if(identifiedPlace) { // check if we can not found place for Edit
      setFormData({
        title: {
          value: identifiedPlace.title,
          isValid: true
        },
        description: {
          value: identifiedPlace.description,
          isValid: true
        }
      }, true);
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  const placeUpdateSubmitHandler = e => {
    e.preventDefault();
    console.log(formState.inputs);
  }

  if(!identifiedPlace) { 
    return (
      <div className="center">
        <Card>
          <h2>Could not find place</h2> 
        </Card>
      </div>
    );
  }

  if(isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    )
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