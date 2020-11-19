import React from 'react';
import { Link } from 'react-router-dom';


class NotFound extends React.Component {
    render(){
        return  <div><h1>Not Found</h1><p>We can't find what you're looking for...</p>
                    <Link to="/">Return Home</Link>
</div>
    }
}

export default NotFound;