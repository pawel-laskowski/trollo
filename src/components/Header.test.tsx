import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { Header } from './Header'

const mockStore = configureStore()
const initialState = { firebase: {} }
const loggedInState = {
  firebase: {
    auth: 'user',
  },
}

it('should render Login button if user is logged out', () => {
  render(
    <Provider store={mockStore(initialState)}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>
  )
  expect(screen.getByRole('button')).toHaveTextContent('Login')
})

it('should render Logout button if user is logged in', () => {
  render(
    <Provider store={mockStore(loggedInState)}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>
  )
  expect(screen.getByRole('button')).toHaveTextContent('Logout')
})
