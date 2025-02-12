import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Singin from './pages/Signin';
import Singup from './pages/Signup';
import NewPost from './pages/NewPost';
import Profile from './pages/Profile';
import Profiles from './pages/Profiles';
import PostDetail from './pages/PostDetail';

const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Singin />}></Route>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/register' element={<Singup />}></Route>
            <Route path='/create' element={<NewPost />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/profiles' element={<Profiles />}></Route>
            <Route path='/posts/:postId' element={<PostDetail />}></Route>
        </Routes>
    );
}

export default Routers;



