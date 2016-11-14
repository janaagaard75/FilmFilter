import * as model from './model'
import { reducer } from './reducer'

export { Footer } from './components/Footer'
export { Header } from './components/Header'
export { MainSection } from './components/MainSection'
export { TodoItem } from './components/TodoItem'
export { TodoTextInput } from './components/TodoTextInput'
export * from './actions'
export { model }
// TODO: Remove default exports.
// TODO: Consider removing index files.
export default reducer