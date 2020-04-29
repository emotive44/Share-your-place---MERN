import React, { useState, useContext, Fragment } from 'react';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { AuthContext } from '../../shared/context/auth-context';
import { useForm } from '../../shared/hooks/form-hook';
import Button from '../../shared/FormElements/Button';
import Input from '../../shared/FormElements/Input';
import ErrorModal from '../../shared/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import Card from '../../shared/UIElements/Card';
import './Auth.css';
import { useHistory } from 'react-router-dom'
import { useHttpClient } from '../../shared/hooks/http-hook';
import ImageUpload from '../../shared/FormElements/ImageUpload';

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm({}, false);
  const value = useContext(AuthContext);
  const history = useHistory();

  const authSubmitHandler = async e => {
    e.preventDefault();
    const { name, email, password, image } = formState.inputs;
    
    if(isLoginMode) {
      try{
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/login', 
          'POST',
          JSON.stringify({
            email: email.value,
            password: password.value,
          }),
          {
            'Content-Type': 'application/json'
          }
        );

        value.login(responseData.userId, responseData.token);
        history.push('/') // After login user will be redirec to home page
      } catch(err) {
        console.log(err);
      }
    } else {
      try {
        const formData = new FormData();
        formData.append('email', email.value);
        formData.append('name', name.value);
        formData.append('password', password.value);
        formData.append('image', image.value);
        const responseData = await sendRequest('http://localhost:5000/api/users/signup',
         'POST',
          formData,
        );
       
        history.push('/') // After register user will be redirec to home page
        value.login(responseData.userId, responseData.token);
      } catch(err) {
        console.log(err);
      }
    }
  }

  const switchModeHandler = () => { 
    if(!isLoginMode) {
      console.log(formState.inputs)
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData({
        ...formState.inputs,
        name: { value: '', isValid: false },
        image: { value: null, isValid: false }
      }, false);
    }
    setIsLoginMode(prevMode => !prevMode);
  }


  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError}/>
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay/>}
        <h2>Login Required</h2>
        <hr/>
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input  
              id="name"
              type="text"
              element="input"
              label="Your Name"
              onInput={inputHandler}
              errorText="Please enter a name"
              validators={[VALIDATOR_REQUIRE()]}
            />
          )}
          {!isLoginMode && (
            <ImageUpload 
              id="image" 
              center
              onInput={inputHandler}
            />
          )}
          <Input 
            id="email"
            type="email"
            label="Email"
            element="input"
            onInput={inputHandler}
            validators={[VALIDATOR_EMAIL()]} 
            errorText="Please enter a valid email address"
          />
          <Input 
            id="password"
            type="password"
            element="input"
            label="Password"
            onInput={inputHandler}
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 character"
          />
          <Button type="submit" disabled={!formState.isValid} >
            {isLoginMode ? 'Login' : 'Sign Up'}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          Switch to {isLoginMode ? 'Sign Up' : 'Login'}
        </Button>
      </Card>
    </Fragment>
  );
}

export default Auth;
