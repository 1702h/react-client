import React from 'react'
import {
    BrowserRouter as Router,
} from 'react-router-dom'
import routes from './routerSettings';
import RouterView from './routerView'
class RouterIndex extends React.Component{
    render(){
        return <Router>
            <RouterView routes={routes}/>
        </Router>
    }
}

export default RouterIndex;