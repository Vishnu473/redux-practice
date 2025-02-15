import { Provider } from 'react-redux'
import './App.css'
import store from './store/store'
import {Container, Typography } from '@mui/material'
import AddHabit from './components/add-habit'
import TodoList from './components/todo-list'

function App() {

  return (
    <Provider store={store}>
    <>
      <Container maxWidth="md">
      <Typography component="h2" variant='h4' align='center'>Redux Practice - Habit Tracker</Typography>
      <AddHabit />
      <TodoList />
      </Container>
    </>
    </Provider>
  )
}

export default App
