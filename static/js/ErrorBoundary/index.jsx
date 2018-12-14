import React, { Component } from 'react';

export default class ErrorBoundary extends Component {

        state = { hasError: false };

    componentDidCatch(error, errorInfo) {

        this.setState({
            hasError: true
        })

    }

    render() {

        if (this.state.hasError) {

            return <h1>Something went wrong. Please reload the page or try again later.</h1>;
        }

        return this.props.children;
    }
}