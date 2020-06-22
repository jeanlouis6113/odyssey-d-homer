import React from 'react';

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
        const { email, password, name, lastname } = this.state;
        event.preventDefault()
        console.log(this.state);


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
                res => this.setState({ "flash": res.flash }),
                err => this.setState({ "flash": err.flash })
            );
    }


    render() {
        const { updateEmailField } = this;
        const { updateNameField } = this;
        const { updateLastnameField } = this;
        const { updatePasswordField } = this;
        const { updatePasswordbisField } = this;
        return (
            <div className="form">
                <h1>{JSON.stringify(this.state)}</h1>
                <form onSubmit={this.handleSubmit} className="formulaire">
                    <label htmlFor="email">Email:</label>
                    <input className="button" type="email" name="email" onChange={updateEmailField} />
                    <label htmlFor="name">Name:</label>
                    <input className="button" type="text" name="name" onChange={updateNameField} />
                    <label htmlFor="Lastname">Lastname:</label>
                    <input className="button" type="text" name="lastname" onChange={updateLastnameField} />
                    <label htmlFor="Password">password:</label>
                    <input className="button" type="password" name="password" onChange={updatePasswordField} />
                    <label htmlFor="Passwordbis">Passwordbis:</label>
                    <input className="button" type="password" name="passwordbis" onChange={updatePasswordbisField} />
                    <input className="buttonSubmit" type="submit" value="Soumettre" />
                </form>
            </div>
        );
    }
}
export default SignUp;