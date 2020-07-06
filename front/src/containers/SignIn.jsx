
import React from 'react';
import { TextField, Button } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import { Snackbar } from "@material-ui/core";
import { Link, Redirect } from 'react-router-dom';



class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            flash: "",
            redirect: false
        };
    }



    EmailField = event => {
        this.setState({ email: event.target.value });
    }
    PasswordField = event => {
        this.setState({ password: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault()
        console.log(this.state);

        fetch("/auth/signin",
            {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(this.state),
            })
            .then(res => res.json())
            .then(
                res => this.setState({ flash: res.flash, isFlash: true, redirect: true }),
                err => this.setState({ flash: err.flash, isFlash: true })
            );

    }



    handleClose = () => {
        this.setState({ isFlash: false });
        this.state.flashIsOk && this.props.history.push("/");
    };


    render() {
        if (this.state.redirect) {
            return <Redirect to="/profile" />
        } else {
            return (
                <div className="form">
                    {this.state.redirect && <Redirect to="/profile" />}
                    <Link to="/signup">Sign Up</Link>
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
                                onChange={this.EmailField}
                                required />
                            <TextField
                                id="password"
                                label="Password"
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.PasswordField}
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
                        onClose={this.handleClose}
                        message={this.state.flash}>
                    </Snackbar>
                </div>
            );
        }
    }
}
export default SignIn;