import React from 'react';
import { Outlet } from 'react-router';

const HomeLayout = () => {
    return (
        <div>
            <p>Home Layout</p>
            <Outlet></Outlet>
        </div>
    );
};

export default HomeLayout;