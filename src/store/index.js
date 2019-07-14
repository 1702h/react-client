import {createStore,combineReducers,applyMiddleware} from 'redux';
import nav from './nav/nav.reducer'
import user from './user/user.reducer'
import list from './list/list.reducer'
import thunk from 'redux-thunk'
const reducer = combineReducers({
    nav,
    user,
    list
})
const store = createStore(reducer,applyMiddleware(thunk));
window.store = store;
export default store;