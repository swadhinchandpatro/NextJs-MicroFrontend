import { render, screen } from '@testing-library/react'
import Home from '../../src/pages/index'

describe('Home', () => {
  it('renders a heading', () => {
    const { container } = render(<Home />)

    const heading = screen.getByRole('heading', {
      name: "Welcome to Next (host)!",
    })

    expect(heading).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })
})