import React from 'react';
import {
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
function RouterView ({routes=[]}){
    const redirectArr = routes.filter(item=>item.redirect);
    return <Switch>
        {
            routes.map((item,key)=>!item.redirect ? <Route key={key} path={item.path} render={props=>{
                return React.createElement(item.component,{
                    ...props,
                    routes:item.children
                });
            }} />:null).concat(redirectArr.map((item,key)=><Redirect key={key} from={item.path} to={item.redirect} />))
        }
    </Switch>
}

export default RouterView;