/*import React, { Component } from 'react';
import { reduxForm, Field, Form } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {
    render() {
        const { handleSubmit, fields: { email, password, passwordConfirm}} = this.props;
        return (
            <form>
                <Field className="form-group">
                    <label>Email:</label>
                    <input className="form-control" {...email} />

            </form>
        );
    }
}

export default reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm']
})(Signup);
*/

/*import React, { Component } from 'react';
import { reduxForm, Field, Form } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const renderInput = field => {
    const { input, type } = field;
    return (
        <div>
            <input {...input} type={type} className="form-control" />
        </div>
    );
}

class Signup extends Component {
    handleFormSubmit({ email, password, passwordConfirm }) {    
        this.props.signinUser({ email, password, passwordConfirm });
    }

    renderAlert(){
        if(this.props.errorMessage){
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }

    render(){
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

                <div className="form-group">
                    <label>Email:</label>
                    <Field name="email" 
                        type="email" component={renderInput} />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <Field name="password" 
                        type="password" component={renderInput} />
                </div>
                <div className="form-group">
                    <label>Password Confirm:</label>
                    <Field name="passwordConfirm" 
                        type="password" component={renderInput} />
                </div>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign in</button>
            </form>
        );
    }
}

function validate(formProps){
    const errors = {};
    const { password, passwordConfirm, email } = formProps;

    if(formProps.password !== formProps.passwordConfirm){
        errors.password = 'Passwords must match';
    }

    return errors;
}

function mapStateToProps(state) {
    return { 
        errorMessage: state.auth.error
     };
}

Signup = connect(mapStateToProps, actions)(Signup);
Signup = reduxForm({
 form: 'signup',
 validate
})(Signup);
export default Signup; */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, Form } from 'redux-form';
import * as actions from '../../actions';

const renderInput = (field) => {
    const { label, type, input, meta: { error, touched } } = field;
    return (
        <div>
            <label>{label}:</label>
            <input {...input} type={type}
                className="form-control" />
                {touched && error && <div className="error">{error}</div>}
        </div>
    );
}

class Signup extends Component {
    handleFormSubmit(formProps) {
        // Call action creator to sign up the user
        this.props.signupUser(formProps);
    }

    renderAlert() {
        if(this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <div className="form-group">
                    <Field name="email" 
                        type="email" component={renderInput} label="Email" />
                </div>
                <div className="form-group">
                    <Field name="password" 
                        type="password" component={renderInput} label="Password" />
                        
                </div>
                <div className="form-group">
                    <Field name="passwordConfirm" 
                        type="password" component={renderInput} label="Confirm Password" />
                </div>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign up!</button>
            </Form>
        );
    }
}

function validate(formProps) {
    const errors = {};
    const { password, passwordConfirm, email } = formProps;

    if (!email) {
        errors.email = 'Please enter an email';
    }

    if (!password) {
        errors.password = 'Please enter a password';
    }

    if (!passwordConfirm) {
        errors.passwordConfirm = 'Please enter a password confirmation';
    }

    if (password !== passwordConfirm) {
        errors.password = 'Passwords must match';
    }

    return errors;
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error  };
}


const form = reduxForm({ form: 'signup', validate });
export default connect(mapStateToProps, actions)(form(Signup));