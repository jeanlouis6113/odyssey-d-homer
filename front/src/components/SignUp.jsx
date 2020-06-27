import React from 'react';
import { TextField } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Snackbar } from "@material-ui/core";
import { Link } from 'react-router-dom';



class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            name: "",
            lastname: "",
            password: "",
            passwordbis: "",
            flash: ""
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
                    res => this.setState({ flash: res.flash, isFlash: true }),
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
        const { handleClose } = this;
        const { updateEmailField } = this;
        const { updateNameField } = this;
        const { updateLastnameField } = this;
        const { updatePasswordField } = this;
        const { updatePasswordbisField } = this;
        return (
            <div className="form">
                {/* <h1>{JSON.stringify(this.state)}</h1> */}
                <Link to="/signin">Sign In</Link>
                <form onSubmit={this.handleSubmit} className="formulaire">
                    <Grid container direction="column"
                        justify="center"
                        alignItems="stretch"
                        style={{ padding: 20 }} >
                        <h2>Sign Up!</h2>
                        <TextField
                            label="Email"
                            type="email"
                            name="email"
                            onChange={updateEmailField}
                            required />
                        <TextField
                            label="Password"
                            type="password"
                            name="password"
                            onChange={updatePasswordField} 
                            required/>
                        <TextField
                            label="Password Copy"
                            type="password"
                            name="passwordbis"
                            onChange={updatePasswordbisField}
                            required/>
                        <TextField
                            label="Name"
                            type="text"
                            name="name"
                            onChange={updateNameField} 
                            required/>
                        <TextField
                            label="Lastname"
                            type="text"
                            name="lastname"
                            onChange={updateLastnameField} 
                            reuqired />
                        <Grid style={{ alignSelf: "flex-end", padding: 30 }} >
                            <Button onClick={event =>  window.location.href='/'} variant="contained" color="primary" type="submit">
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