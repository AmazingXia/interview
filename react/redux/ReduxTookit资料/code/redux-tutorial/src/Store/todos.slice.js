import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector
} from "@reduxjs/toolkit"
import axios from "axios"

const todosAdapter = createEntityAdapter({
  selectId: todo => todo.cid
})

export const TODOS_FEATURE_KEY = "todos"

export const loadTodos = createAsyncThunk("todos/loadTodos", payload =>
  axios.get(payload).then(response => response.data)
)

const { reducer: TodosReducer, actions } = createSlice({
  name: TODOS_FEATURE_KEY,
  initialState: todosAdapter.getInitialState(),
  reducers: {
    addTodo: {
      reducer: todosAdapter.addOne,
      prepare: todo => {
        return {
          payload: { cid: Math.random(), ...todo }
        }
      }
    },
    setTodos: todosAdapter.addMany
  },
  extraReducers: {
    [loadTodos.pending]: (state, action) => {
      console.log("pending")
      return state
    },
    [loadTodos.fulfilled]: todosAdapter.addMany
  }
})

const { selectAll } = todosAdapter.getSelectors()

export const selectTodos = createSelector(
  state => state[TODOS_FEATURE_KEY],
  selectAll
)
export const { addTodo, setTodos } = actions
export default TodosReducer
