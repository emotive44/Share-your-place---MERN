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

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm({}, false);
  const value = useContext(AuthContext);
  const history = useHistory();

  const authSubmitHandler = async e => {
    e.preventDefault();
    const { name, email, password } = formState.inputs;
    
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

        value.login(responseData.user.id);
        history.push('/') // After login user will be redirec to home page
      } catch(err) {
        console.log(err);
      }
    } else {
      try {
        const responseData = await sendRequest('http://localhost:5000/api/users/signup',
         'POST',
          JSON.stringify({
            name: name.value,
            email: email.value,
            password: password.value,
          }),
          {
            'Content-Type': 'application/json'
          }
        );
       
        history.push('/') // After register user will be redirec to home page
        value.login(responseData.user.id);
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
          name: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData({
        ...formState.inputs,
        name: { value: '', isValid: false }
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
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid password, at least 5 character"
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
