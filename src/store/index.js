import {combineReducers,createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import orders from './reducer/order'
const rootReducer = combineReducers({
    orders,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk),
    )
);

export default store;