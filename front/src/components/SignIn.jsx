import React from 'react';
import { Link } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";


class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {
                email: "",
                password: ""
            }
        }
    }
    LastnameField = event => {
        this.setState({ lastname: event.target.value });
    }
    PasswordField = event => {
        this.setState({ password: event.target.value });
    }

    handleSubmit = event => {
        const { email, password } = this.state;
        event.preventDefault()
        console.log(this.state);

        fetch("/auth/signup",
            {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({ email, password }),
            })
            .then(res => res.json())
            .then(
                res => this.setState({ flash: res.flash, isFlash: true }),
                err => this.setState({ flash: err.flash, isFlash: true })
            );
    }


    render() {
        const { EmailField } = this;
        const { PasswordField } = this;
        const { handleSubmit } = this;
        return (
            <div>
                <Link to="/signup">Sign Up</Link>
                <form onSubmit={handleSubmit} className="formulaire">
                    <Grid container direction="column"
                        justify="center"
                        alignItems="stretch"
                        style={{ padding: 20 }} >
                        <h2>Sign In!</h2>
                        <TextField
                            label="Email"
                            type="email"
                            name="email"
                            onChange={EmailField} />
                        <TextField
                            label="Password"
                            type="password"
                            name="password"
                            onChange={PasswordField} />
                        <Grid style={{ alignSelf: "flex-end", padding: 30 }} >
                        <Link to="/profile">
                            <Button variant="contained" color="primary" type="submit">
                                Submit
                        </Button>
                        </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        );
    }
}


export default SignIn;