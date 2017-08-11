import  { createStore,applyMiddleware, compose} from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'

const initialState = {}

const enhancers = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
)

const store = createStore(
    rootReducer,
    initialState,
    enhancers,
    compose(applyMiddleware(thunk))
)

export default store
