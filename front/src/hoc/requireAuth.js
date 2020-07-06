import React, { Component } from "react";
import { connect } from "react-redux";

export default function(ComposedComponent) {
    class Authentication extends Component {
        componentWillMount() {
            if (!this.props.authenticated) {
                this.props.history.push('/signin');
            }
        }
        UNSAFE_componentWillUpdate() {
            if (!this.props.authenticated) {
                this.props.history.push('/signin');
            }
        }
        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    function mapStateToProps(state) {
        return { authenticated: state.auth.token ? true : false };
    }

    return connect(mapStateToProps)(Authentication);
}