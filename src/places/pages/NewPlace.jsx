import React, { useContext, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../shared/FormElements/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import Button from '../../shared/FormElements/Button';
import ErrorModal from '../../shared/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import ImageUpload from '../../shared/FormElements/ImageUpload';

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const [formState, inputHandler] = useForm({
    image: {
      value: null,
      isValid: false
    }
  }, false);
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const history = useHistory();

  const placeSubmitHandler = async e => {
    e.preventDefault();
    const { title, description, address, image } = formState.inputs;
    try {
      const formData = new FormData();
      formData.append('title', title.value);
      formData.append('description', description.value);
      formData.append('address', address.value);
      formData.append('creator', auth.userId);
      formData.append('image', image.value);
      await sendRequest('http://localhost:5000/api/places',
        'POST',
        formData,
        {
          'Authorization': 'Bearer' + auth.token
        }
      );
      history.push('/'); 
    } catch(err) {
      console.log(err);
    }
  }
  
  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
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
        <ImageUpload 
          id="image"
          onInput={inputHandler}
          errorText="Please provide a image."
        />
        <Button type="submit" disabled={!formState.isValid}>ADD Place</Button>
      </form>
    </Fragment>
  ); 
}

export default NewPlace;
 