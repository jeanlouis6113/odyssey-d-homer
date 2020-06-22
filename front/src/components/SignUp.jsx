import React from 'react';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ""
        };
    }


    updateEmailField = event => {
        this.setState({ email: event.target.value });
    }



    render() {
        const {email} = this.state;
        const {updateEmailField } = this;
        return (
            <>
                <h1>{email}</h1>
                <form>
                    <input type="email" name="email" onChange={updateEmailField} />
                </form>
            </>
        );
    }
}
export default SignUp;