import React from 'react';
import { TextField, Button } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import { Snackbar } from "@material-ui/core";
import { Link, Redirect } from 'react-router-dom';



class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            name: "",
            lastname: "",
            password: "",
            passwordbis: "",
            flash: "",
            redirect: false
        };
    }



    updateEmailField = event => {
        this.setState({ email: event.target.value });
    }
    updateNameField = event => {
        this.setState({ name: event.target.value });
    }
    updateLastnameField = event => {
        this.setState({ lastname: event.target.value });
    }
    updatePasswordField = event => {
        this.setState({ password: event.target.value });
    }
    updatePasswordbisField = event => {
        this.setState({ passwordbis: event.target.value });
    }

    handleSubmit = event => {
        const { email, password, passwordbis, name, lastname } = this.state;
        event.preventDefault()
        console.log(this.state);
        if (password === passwordbis) {

            fetch("/auth/signup",
                {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({ email, password, name, lastname }),
                })
                .then(res => res.json())
                .then(
                    res => this.setState({ flash: res.flash, isFlash: true, redirect: true }),
                    err => this.setState({ flash: err.flash, isFlash: true })
                );

        } else {
            this.setState({ flash: "message: password it is not identique", isFlash: true })
        }


    }
    handleClose = () => {
        this.setState({ isFlash: false });
        this.state.flashIsOk && this.props.history.push("/");
    };


    render() {
        const { handleClose, } = this;
        const { updateEmailField } = this;
        const { updateNameField } = this;
        const { updateLastnameField } = this;
        const { updatePasswordField } = this;
        const { updatePasswordbisField } = this;
        return (
            <div className="form">
                {this.state.redirect && <Redirect to="/" />}
                <Link to="/signin">Sign In</Link>
                <form onSubmit={this.handleSubmit} className="formulaire">
                    <Grid container direction="column"
                        justify="center"
                        alignItems="stretch"
                        style={{ padding: 20 }} >
                        <h2>Sign Up!</h2>
                        <TextField
                            id="email"
                            label="Email"
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={updateEmailField}
                            required />
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={updatePasswordField}
                            required />
                        <TextField
                            id="passwordbis"
                            label="Password Copy"
                            type="password"
                            name="passwordbis"
                            value={this.state.passwordbis}
                            onChange={updatePasswordbisField}
                            required />
                        <TextField
                            id="name"
                            label="Name"
                            type="text"
                            name="name"
                            onChange={updateNameField}
                            value={this.state.name}
                            required />
                        <TextField
                            id="lastname"
                            label="Lastname"
                            type="text"
                            name="lastname"
                            value={this.state.lastname}
                            onChange={updateLastnameField}
                            required />
                        <Grid style={{ alignSelf: "flex-end", padding: 30 }} >
                            <Button
                                className="submitButton"
                                type="submit"
                                value="submit">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Snackbar
                    open={this.state.isFlash}
                    autoHideDuration={2000}
                    onClose={handleClose}
                    message={this.state.flash}>
                </Snackbar>
            </div>
        );
    }
}
export default SignUp;