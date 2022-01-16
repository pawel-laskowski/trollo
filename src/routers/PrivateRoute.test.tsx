import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { PrivateRoute } from './PrivateRoute'

jest.mock('react-redux-firebase')
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as object),
  Navigate: () => <span>HOME</span>,
}))

const mockStore = configureStore()
const state = { firebase: {} }
const testComponent = <span>TEST</span>

afterEach(() => {
  jest.clearAllMocks()
})

const renderPrivateRoute = () => {
  render(
    <Provider store={mockStore(state)}>
      <MemoryRouter>
        <PrivateRoute children={testComponent} />
      </MemoryRouter>
    </Provider>
  )
}

it('should render component if user has been authenticated', () => {
  ;(isLoaded as unknown as jest.Mock).mockImplementation(() => true)
  ;(isEmpty as unknown as jest.Mock).mockImplementation(() => false)

  renderPrivateRoute()
  expect(screen.getByText(/test/i)).toBeInTheDocument()
})

it('should render loader if user data is not loaded', () => {
  ;(isLoaded as unknown as jest.Mock).mockImplementation(() => false)

  renderPrivateRoute()
  expect(screen.getByRole('progressbar')).toBeInTheDocument()
})

it('should redirect if user is not authenticated', () => {
  ;(isLoaded as unknown as jest.Mock).mockImplementation(() => true)
  ;(isEmpty as unknown as jest.Mock).mockImplementation(() => true)

  renderPrivateRoute()
  expect(screen.getByText(/home/i)).toBeInTheDocument()
})
