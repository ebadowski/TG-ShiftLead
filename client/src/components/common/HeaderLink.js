import React from 'react';
import { Link } from 'react-router-dom';

function HeaderLink(props) {
    console.log(props)
    function getIcon(s) {
        return s === 'dashboard'
            ? 'dashboard'
            : s === 'roster'
                ? 'recent_actors'
                : s === 'insight'
                    ? 'multiline_chart'
                    : s === 'map'
                        ? 'map'
                        : s === 'history'
                            ? 'access_time'
                            : 'help'
    }


    return (
        <li>
            <Link to={props.link} className="nav-link">
                <i className="material-icons left">{getIcon(props.children)}</i>
                <span className='nav-link hide-on-med-and-down'>{props.children}</span>
            </Link>
        </li>
    );
}

export default HeaderLink;
