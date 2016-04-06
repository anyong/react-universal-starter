import React, { PropTypes } from 'react';

function Master (props) {
    const children = props.children;

    return (
        <div>Hello, World!
            {children}
        </div>
    );
}

Master.displayName = 'Master';

Master.propTypes = {
    children: PropTypes.node,
};

export default Master;
