import React, { useEffect, useState, Fragment, useContext } from 'react';
import './PlaceForm.css';
import { useParams, useHistory } from 'react-router-dom';
import Card from '../../shared/UIElements/Card';
import Input from '../../shared/FormElements/Input';
import Button from '../../shared/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/UIElements/ErrorModal';

const UpdatePlace = () => {
  const auth = useContext(AuthContext);
  const [place, setPlace] = useState([]);
  const placeId = useParams().placeId;
  const history = useHistory();
  const { isLoading, error, sendRequest, clearError } = useHttpClient(); 
  const [formState, inputHandler, setFormData] = useForm({}, false);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/places/${placeId}`);
        setPlace(responseData.place);
        // setFormData({
        //   title: {
        //     value: responseData.title,
        //     isValid: true
        //   },
        //   description: {
        //     value: responseData.description,
        //     isValid: true
        //   }
        // }, true);
      } catch(err) {
        console.log(err);
      }
    }
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  const placeUpdateSubmitHandler = async e => {
    e.preventDefault();
    try {
      await sendRequest(`http://localhost:5000/api/places/${placeId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value
        }),
        {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer' + auth.token
        }
      );

      history.push(`/${auth.userId}/places`);
    } catch(err) {
      console.log(err);
    }
  }

  if(!place && !error) { 
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
        <LoadingSpinner />
      </div>
    )
  }
  
  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError}/>
      {place.title && place.description && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
        <Input 
          id="title"
          type="text"
          label="title"
          element="input"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          value={place.title}
          valid={true}
          errorText="Please enter a valid title."
          />
        <Input 
          id="description"
          element="textarea"
          label="description"
          onInput={inputHandler}
          validators={[VALIDATOR_MINLENGTH(5)]}  
          value={place.description}
          valid={true}
          errorText="Please enter a valid description (min. 5 characters)."
          /> 
        <Button type="submit" disabled={!formState.isValid}>
          Update Place
        </Button>
      </form>
      )}
    </Fragment>
  );
}

export default UpdatePlace;
