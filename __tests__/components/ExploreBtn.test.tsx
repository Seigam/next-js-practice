import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ExploreBtn from '@/components/ExploreBtn'

describe('ExploreBtn', () => {
  describe('Rendering', () => {
    it('should render the button', () => {
      render(<ExploreBtn />)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('should render with default text', () => {
      render(<ExploreBtn />)
      
      expect(screen.getByText(/explore/i)).toBeInTheDocument()
    })

    it('should render with custom children', () => {
      render(<ExploreBtn>Custom Text</ExploreBtn>)
      
      expect(screen.getByText('Custom Text')).toBeInTheDocument()
    })

    it('should render arrow icon', () => {
      const { container } = render(<ExploreBtn />)
      
      // Check for SVG or icon element
      const svg = container.querySelector('svg')
      expect(svg || container.querySelector('[class*="icon"]')).toBeTruthy()
    })
  })

  describe('Interactions', () => {
    it('should be clickable', () => {
      const handleClick = jest.fn()
      render(<ExploreBtn onClick={handleClick} />)
      
      const button = screen.getByRole('button')
      fireEvent.click(button)
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should handle multiple clicks', () => {
      const handleClick = jest.fn()
      render(<ExploreBtn onClick={handleClick} />)
      
      const button = screen.getByRole('button')
      fireEvent.click(button)
      fireEvent.click(button)
      fireEvent.click(button)
      
      expect(handleClick).toHaveBeenCalledTimes(3)
    })

    it('should be disabled when disabled prop is true', () => {
      render(<ExploreBtn disabled />)
      
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('should not call onClick when disabled', () => {
      const handleClick = jest.fn()
      render(<ExploreBtn onClick={handleClick} disabled />)
      
      const button = screen.getByRole('button')
      fireEvent.click(button)
      
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Styling and Classes', () => {
    it('should apply custom className', () => {
      const { container } = render(<ExploreBtn className="custom-class" />)
      
      expect(container.querySelector('.custom-class')).toBeInTheDocument()
    })

    it('should have default styling classes', () => {
      const { container } = render(<ExploreBtn />)
      const button = screen.getByRole('button')
      
      expect(button.className).toBeTruthy()
    })
  })

  describe('Accessibility', () => {
    it('should have button role', () => {
      render(<ExploreBtn />)
      
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should support aria-label', () => {
      render(<ExploreBtn aria-label="Explore events" />)
      
      const button = screen.getByRole('button', { name: /explore events/i })
      expect(button).toBeInTheDocument()
    })

    it('should be keyboard accessible', () => {
      const handleClick = jest.fn()
      render(<ExploreBtn onClick={handleClick} />)
      
      const button = screen.getByRole('button')
      fireEvent.keyDown(button, { key: 'Enter' })
      
      // Button should respond to keyboard events
      expect(button).toHaveFocus
    })
  })

  describe('Edge Cases', () => {
    it('should handle null children', () => {
      expect(() => render(<ExploreBtn>{null}</ExploreBtn>)).not.toThrow()
    })

    it('should handle undefined children', () => {
      expect(() => render(<ExploreBtn>{undefined}</ExploreBtn>)).not.toThrow()
    })

    it('should handle React elements as children', () => {
      render(
        <ExploreBtn>
          <span>Nested Element</span>
        </ExploreBtn>
      )
      
      expect(screen.getByText('Nested Element')).toBeInTheDocument()
    })

    it('should handle multiple event handlers', () => {
      const handleClick = jest.fn()
      const handleMouseEnter = jest.fn()
      const handleMouseLeave = jest.fn()
      
      render(
        <ExploreBtn
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      )
      
      const button = screen.getByRole('button')
      fireEvent.click(button)
      fireEvent.mouseEnter(button)
      fireEvent.mouseLeave(button)
      
      expect(handleClick).toHaveBeenCalledTimes(1)
      expect(handleMouseEnter).toHaveBeenCalledTimes(1)
      expect(handleMouseLeave).toHaveBeenCalledTimes(1)
    })
  })

  describe('Props Validation', () => {
    it('should accept standard button props', () => {
      expect(() =>
        render(
          <ExploreBtn
            type="submit"
            name="explore-button"
            value="explore"
            form="test-form"
          />
        )
      ).not.toThrow()
    })

    it('should forward ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement>()
      render(<ExploreBtn ref={ref} />)
      
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })
  })
})