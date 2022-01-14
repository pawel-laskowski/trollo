import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { Header } from './Header'

jest.mock('react-redux-firebase')

let mockedUseNavigate: jest.Mock
beforeEach(() => {
  mockedUseNavigate = jest.fn()
})
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as object),
  useNavigate: () => mockedUseNavigate,
}))

const mockStore = configureStore()
const initialState = { firebase: {} }
const loggedInState = {
  firebase: {
    auth: 'user',
  },
}

const mockLoggedUser = () => {
  ;(isLoaded as unknown as jest.Mock).mockImplementation(() => true)
  ;(isEmpty as unknown as jest.Mock).mockImplementation(() => false)
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
  mockLoggedUser()

  render(
    <Provider store={mockStore(loggedInState)}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>
  )
  expect(screen.getByRole('button')).toHaveTextContent('Logout')
})

it('should call firebase login function', () => {
  const login = jest.fn().mockResolvedValue({})
  ;(useFirebase as jest.Mock).mockReturnValue({ login })

  render(
    <Provider store={mockStore(initialState)}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>
  )
  fireEvent.click(screen.getByRole('button'))
  expect(login).toHaveBeenCalled()
})

it('should call firebase logout function', () => {
  mockLoggedUser()

  const logout = jest.fn().mockResolvedValue({})
  ;(useFirebase as jest.Mock).mockReturnValue({ logout })

  render(
    <Provider store={mockStore(loggedInState)}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>
  )
  fireEvent.click(screen.getByRole('button'))
  expect(logout).toHaveBeenCalled()
})

it('should navigate to "/dashboard" after user logged in', async () => {
  const login = jest.fn().mockResolvedValue({})
  ;(useFirebase as jest.Mock).mockReturnValue({ login })

  render(
    <Provider store={mockStore(initialState)}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>
  )
  fireEvent.click(screen.getByRole('button'))
  await waitFor(() =>
    expect(mockedUseNavigate).toHaveBeenLastCalledWith('/dashboard')
  )
})

it('should navigate to "/" after user logged out', async () => {
  mockLoggedUser()

  const logout = jest.fn().mockResolvedValue({})
  ;(useFirebase as jest.Mock).mockReturnValue({ logout })

  render(
    <Provider store={mockStore(loggedInState)}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>
  )
  fireEvent.click(screen.getByRole('button'))
  await waitFor(() => expect(mockedUseNavigate).toHaveBeenLastCalledWith('/'))
})

it('should open alert when error occurs while login', async () => {
  const login = jest.fn().mockRejectedValue(Error())
  ;(useFirebase as jest.Mock).mockReturnValue({ login })

  render(
    <Provider store={mockStore(initialState)}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>
  )

  fireEvent.click(screen.getByRole('button'))

  await waitFor(() =>
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Login error! Please try again.'
    )
  )
})

it('should open alert when error occurs while logout', async () => {
  mockLoggedUser()

  const logout = jest.fn().mockRejectedValue(Error())
  ;(useFirebase as jest.Mock).mockReturnValue({ logout })

  render(
    <Provider store={mockStore(loggedInState)}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>
  )

  fireEvent.click(screen.getByRole('button'))
  await waitFor(() =>
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Logout error! Please try again.'
    )
  )
})
