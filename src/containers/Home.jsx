import React from 'react';
import { Link } from 'react-router';

function Home () {
    return (
        <div>
            <Link to="/example"><button>Go to example</button></Link>
        </div>
    );
}

Home.displayName = 'Home';

export default Home;
