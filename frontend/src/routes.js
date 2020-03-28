import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewProduct from './pages/NewProduct';

export default function Routes() {
    return (
        <BrowserRouter>
        <Switch> 
            <Route path="/" exact component={Login} />
            <Route path="/register" component={Register}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/products/new" component={NewProduct}/>

        </Switch>
        </BrowserRouter>

    )
}// Switch garante que apenas uma rota seja executada por momento
//o exact em Route fala que aquele path só deverá ser seguido caso seja exatamente igual