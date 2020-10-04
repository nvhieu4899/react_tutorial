import React from 'react';

const Style = {
    width: "50px",
    height: "50px",
};

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null
        };
    }

    render() {
        return (
            <button className="btn btn-outline-secondary" style={Style} onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
}

export default Square;
