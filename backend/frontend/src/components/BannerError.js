import React, { Component } from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faExclamationTriangle as Error, faCheckCircle as Success, faInfoCircle as Info } from '@fortawesome/free-solid-svg-icons'

export default class BannerError extends Component {
    state = {
    }

    render () {
        return (
            <div className={"banner-error " + this.props.type} >
                <p className="message">
                    <FontAwesomeIcon icon={ this.props.type === "error" ? Error : ( this.props.type === "success" ? Success : Info)} /> &nbsp;
                    {this.props.message}
                </p>
            </div>
        )
    }
}
