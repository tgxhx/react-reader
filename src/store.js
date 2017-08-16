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

if (process.env.NODE_ENV !== "production") {
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(rootReducer)
    })
  }
}

/*const store = () => {
  const storeConfig  = createStore(
    rootReducer,
    initialState,
    enhancers,
    compose(applyMiddleware(thunk))
  )
  /!*if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        store.replaceReducer(rootReducer)
      })
    }
  }*!/
  return storeConfig
}*/

export default store
