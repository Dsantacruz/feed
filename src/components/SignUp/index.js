import React, { Component } from 'react';
import {
  Link,
  withRouter,
} from 'react-router-dom';
import { Form, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { Form as form, FormGroup, Label, Input, FormFeedback, FormText, Container, Row, Col, Button, ButtonGroup } from 'reactstrap';

import { auth, db } from '../../firebase';
import * as routes from '../../constants/routes';

const SignUpPage = ({ history }) =>
<Container>
  <Row>
    <Col sm="12" md={{ size: 8, offset: 2 }}>
    <h1 className="text-center">Registrarse</h1>
      <SignUpForm history={history} />
    </Col>
  </Row>
</Container>

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  fullname: '',
  username: '',
  password: '',
  confirm_password: '',
  error: null,
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {

    const {
      username,
      fullname,
      password,
    } = this.state;
    const {
      history,
    } = this.props;

    return auth.doCreateUserWithEmailAndPassword(username, password)
      .then(authUser => {
        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.uid, fullname, username)
          .then(() => {
            history.push(routes.FEED);
          })
          .catch(error => {
            window.alert("Error al crear usuario.");
          });

      })
      .catch(error => {
        let errorCode = error.code;

        let errorMessage = error.message;

        if(errorCode === 'auth/email-already-in-use')
        {
          return { username : 'El email ya se encuentra registrado, intenta con otro' }
        }

        if(errorCode === 'operation-not-allowed')
        {
          return { username : 'Las cuentas no se encuentra habilitadas' }
        }

        if(errorCode === 'auth/weak-password')
        {
          return { password : 'La contraseña es muy débil, intenta una nueva' }
        }
      });

    event.preventDefault();
  }

  render() {
    const {
      fullname,
      username,
      password,
      confirm_password,
      error,
    } = this.state;

    const isInvalid =
      password !== confirm_password ||
      password === '' ||
      fullname === '' ||
      username === '';

    return (
      <Form
        onSubmit={this.onSubmit}
        render={({
          submitError,
          handleSubmit,
          reset,
          submitting,
          pristine,
        }) => (
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Field name="fullname">
                {({ input, meta }) => (
                  <div>
                    <Label for="fullname">Nombres completos</Label>
                    <Input 
                      {...input} 
                      type="text" 
                      placeholder="Nombres completos" 
                      value={fullname}
                      onChange={event => this.setState(updateByPropertyName('fullname', event.target.value))}
                    />
                    {(meta.error || meta.submitError) &&
                    meta.touched && <small className="text-danger">{meta.error || meta.submitError}</small>}
                  </div>
                )}
              </Field>
            </FormGroup>
            <FormGroup>
              <Field name="username">
                {({ input, meta }) => (
                  <div>
                    <Label for="username">Usuario</Label>
                    <Input 
                      {...input} 
                      type="text" 
                      placeholder="Ingresar email" 
                      value={username}
                      onChange={event => this.setState(updateByPropertyName('username', event.target.value))}
                    />
                    {(meta.error || meta.submitError) &&
                    meta.touched && <small className="text-danger">{meta.error || meta.submitError}</small>}
                  </div>
                )}
              </Field>
            </FormGroup>
            <FormGroup>
              <Field name="password">
                {({ input, meta }) => (
                  <div>
                    <Label for="password">Password</Label>
                    <Input 
                      {...input} 
                      type="password" 
                      placeholder="Password" 
                      value={password}  
                      onChange={event => this.setState(updateByPropertyName('password', event.target.value))}
                    />
                    {meta.error && meta.touched && <small className="text-danger">{meta.error}</small>}
                  </div>
                )}
              </Field>
            </FormGroup>
            <FormGroup>
              <Field name="confirm_password">
                {({ input, meta }) => (
                  <div>
                    <label>Confirmar Password</label>
                    <Input 
                      {...input} 
                      type="password" 
                      placeholder="Confirmar password" 
                      value={confirm_password}
                      onChange={event => this.setState(updateByPropertyName('confirm_password', event.target.value))}
                    />
                    {meta.error && meta.touched && <small className="text-danger">{meta.error}</small>}
                  </div>
                )}
              </Field>
            </FormGroup>
            {submitError && <small className="text-danger">{submitError}</small>}
            <br/>
            <ButtonGroup>
              <Button 
                color="info" 
                type="submit" 
                disabled={isInvalid}
              >Registrarse</Button>{' '}
            </ButtonGroup>
            {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
          </form>
        )}
      />
      /*<form onSubmit={this.onSubmit}>
        <input
          value={username}
          onChange={event => this.setState(updateByPropertyName('username', event.target.value))}
          type="text"
          placeholder="Full Name"
        />
        <input
          value={email}
          onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={passwordOne}
          onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <input
          value={passwordTwo}
          onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        { error && <p>{error.message}</p> }
      </form>*/
    );
  }
}

const SignUpLink = () =>
  <p>
    ¿Aún no tienes una cuenta?
    {' '}
    <Link to={routes.SIGN_UP}>Regístrate</Link>
  </p>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};