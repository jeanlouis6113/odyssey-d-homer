import React from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";



class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {
                email: "homer.simpson@wildcodeschool.fr",
                name: "Homer",
                lastname: "Simpson"
            },
        };
    }
    handleClick = () => {
        this.props.history.push("/signin");
    }

    render() {
        const { email, name, lastname } = this.state.profile;
        const { handleClick } = this;
        return (
            <div>
                <List>
                    <ListItem component="nav">
                        <ListItemText primary="email" secondary={email} />
                        <ListItemText primary="name" secondary={name} />
                        <ListItemText primary="lastname" secondary={lastname} />
                    </ListItem>
                </List>
                <Button onClick={handleClick} variant="contained" color="primary" type="submit">
                    Logout
            </Button>
            </div>
        )
    }
}

export default Profile;