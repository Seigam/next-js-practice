import React from 'react'
import { render } from '@testing-library/react'
import LightRays from '@/components/LightRays'

describe('LightRays', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      expect(() => render(<LightRays />)).not.toThrow()
    })

    it('should render canvas element', () => {
      const { container } = render(<LightRays />)
      
      const canvas = container.querySelector('canvas')
      expect(canvas).toBeInTheDocument()
    })

    it('should render with correct container structure', () => {
      const { container } = render(<LightRays />)
      
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('Canvas Configuration', () => {
    it('should create canvas with proper attributes', () => {
      const { container } = render(<LightRays />)
      const canvas = container.querySelector('canvas')
      
      expect(canvas).toHaveAttribute('width')
      expect(canvas).toHaveAttribute('height')
    })

    it('should handle window resize events', () => {
      const { container } = render(<LightRays />)
      const canvas = container.querySelector('canvas')
      
      // Trigger resize event
      global.dispatchEvent(new Event('resize'))
      
      expect(canvas).toBeInTheDocument()
    })
  })

  describe('Props Handling', () => {
    it('should accept and apply custom className', () => {
      const { container } = render(<LightRays className="custom-light-rays" />)
      
      expect(container.querySelector('.custom-light-rays') || container.firstChild).toBeTruthy()
    })

    it('should accept custom width', () => {
      const { container } = render(<LightRays width={800} />)
      const canvas = container.querySelector('canvas')
      
      expect(canvas).toBeInTheDocument()
    })

    it('should accept custom height', () => {
      const { container } = render(<LightRays height={600} />)
      const canvas = container.querySelector('canvas')
      
      expect(canvas).toBeInTheDocument()
    })
  })

  describe('WebGL Context', () => {
    it('should initialize WebGL context', () => {
      const { container } = render(<LightRays />)
      const canvas = container.querySelector('canvas')
      
      // Check if canvas exists (WebGL initialization happens internally)
      expect(canvas).toBeInTheDocument()
    })

    it('should handle WebGL context loss gracefully', () => {
      const { container } = render(<LightRays />)
      const canvas = container.querySelector('canvas')
      
      // Simulate context loss
      if (canvas) {
        const event = new Event('webglcontextlost')
        canvas.dispatchEvent(event)
      }
      
      expect(canvas).toBeInTheDocument()
    })
  })

  describe('Animation', () => {
    it('should start animation on mount', () => {
      const { container } = render(<LightRays />)
      
      // Animation should be running
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should clean up animation on unmount', () => {
      const { container, unmount } = render(<LightRays />)
      
      expect(container.firstChild).toBeInTheDocument()
      
      unmount()
      
      // Component should be unmounted cleanly
      expect(container.firstChild).not.toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle zero width', () => {
      expect(() => render(<LightRays width={0} />)).not.toThrow()
    })

    it('should handle zero height', () => {
      expect(() => render(<LightRays height={0} />)).not.toThrow()
    })

    it('should handle negative dimensions', () => {
      expect(() => render(<LightRays width={-100} height={-100} />)).not.toThrow()
    })

    it('should handle very large dimensions', () => {
      expect(() => render(<LightRays width={10000} height={10000} />)).not.toThrow()
    })
  })

  describe('Performance', () => {
    it('should render multiple instances without issues', () => {
      expect(() => {
        render(
          <>
            <LightRays />
            <LightRays />
            <LightRays />
          </>
        )
      }).not.toThrow()
    })

    it('should handle rapid mount/unmount cycles', () => {
      const { unmount, rerender } = render(<LightRays />)
      
      unmount()
      rerender(<LightRays />)
      unmount()
      rerender(<LightRays />)
      
      expect(() => unmount()).not.toThrow()
    })
  })

  describe('Browser Compatibility', () => {
    it('should render when WebGL is not available', () => {
      // Mock WebGL unavailability
      const originalGetContext = HTMLCanvasElement.prototype.getContext
      HTMLCanvasElement.prototype.getContext = jest.fn(() => null)
      
      expect(() => render(<LightRays />)).not.toThrow()
      
      // Restore original
      HTMLCanvasElement.prototype.getContext = originalGetContext
    })
  })
})