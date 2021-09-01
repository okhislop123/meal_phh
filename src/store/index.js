import {combineReducers,createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import orders from './reducer/order'
const rootReducer = combineReducers({
    orders,
});

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )
);

export default store;