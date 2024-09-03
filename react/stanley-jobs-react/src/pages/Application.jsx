import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Application() {

    const location = useLocation();
    console.log(location);

    const handleApply = (event) => {
        // TODO : post user to backend and set id and role accordingly
    }

    return (
        <>
            <p>Register Page</p>
            <form onSubmit={handleApply}>
                
            </form>
        </>
    )
}

export default Application;