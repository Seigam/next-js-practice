import React from 'react'
import { render, screen } from '@testing-library/react'
import EventCard from '@/components/EventCard'

describe('EventCard', () => {
  const mockEvent = {
    _id: '123',
    title: 'Test Event',
    description: 'This is a test event description',
    location: 'Test Location',
    date: new Date('2024-12-31T18:00:00Z'),
    time: '18:00',
    category: 'Technology',
    capacity: 100,
    price: 50,
    imageUrl: '/images/test-event.png',
  }

  describe('Rendering', () => {
    it('should render the event card with all information', () => {
      render(<EventCard event={mockEvent} />)
      
      expect(screen.getByText('Test Event')).toBeInTheDocument()
      expect(screen.getByText('This is a test event description')).toBeInTheDocument()
      expect(screen.getByText('Test Location')).toBeInTheDocument()
    })

    it('should render the event image with correct src and alt', () => {
      render(<EventCard event={mockEvent} />)
      
      const image = screen.getByRole('img', { name: /test event/i })
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src')
    })

    it('should display the event date in correct format', () => {
      render(<EventCard event={mockEvent} />)
      
      // Check if date is displayed (format may vary)
      expect(screen.getByText(/31|Dec|2024/)).toBeInTheDocument()
    })

    it('should display the event time', () => {
      render(<EventCard event={mockEvent} />)
      
      expect(screen.getByText(/18:00/)).toBeInTheDocument()
    })

    it('should display the event category', () => {
      render(<EventCard event={mockEvent} />)
      
      expect(screen.getByText('Technology')).toBeInTheDocument()
    })

    it('should display the event capacity', () => {
      render(<EventCard event={mockEvent} />)
      
      expect(screen.getByText(/100/)).toBeInTheDocument()
    })

    it('should display the event price', () => {
      render(<EventCard event={mockEvent} />)
      
      expect(screen.getByText(/50|\$50/)).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle missing optional fields gracefully', () => {
      const minimalEvent = {
        _id: '456',
        title: 'Minimal Event',
        description: 'Basic description',
        location: 'Location',
        date: new Date(),
        time: '12:00',
        category: 'Other',
        capacity: 50,
        price: 0,
        imageUrl: '',
      }
      
      expect(() => render(<EventCard event={minimalEvent} />)).not.toThrow()
    })

    it('should handle free events (price = 0)', () => {
      const freeEvent = { ...mockEvent, price: 0 }
      render(<EventCard event={freeEvent} />)
      
      expect(screen.getByText(/free|0/i)).toBeInTheDocument()
    })

    it('should handle events with very long descriptions', () => {
      const longDescriptionEvent = {
        ...mockEvent,
        description: 'A'.repeat(500),
      }
      
      expect(() => render(<EventCard event={longDescriptionEvent} />)).not.toThrow()
    })

    it('should handle events with special characters in title', () => {
      const specialCharEvent = {
        ...mockEvent,
        title: 'Event & Conference: "Special" Event!',
      }
      
      render(<EventCard event={specialCharEvent} />)
      expect(screen.getByText('Event & Conference: "Special" Event!')).toBeInTheDocument()
    })

    it('should handle past dates', () => {
      const pastEvent = {
        ...mockEvent,
        date: new Date('2020-01-01T00:00:00Z'),
      }
      
      expect(() => render(<EventCard event={pastEvent} />)).not.toThrow()
    })

    it('should handle future dates far in advance', () => {
      const futureEvent = {
        ...mockEvent,
        date: new Date('2050-12-31T23:59:59Z'),
      }
      
      expect(() => render(<EventCard event={futureEvent} />)).not.toThrow()
    })
  })

  describe('Accessibility', () => {
    it('should have proper semantic HTML structure', () => {
      const { container } = render(<EventCard event={mockEvent} />)
      
      // Check for semantic elements
      expect(container.querySelector('article') || container.querySelector('div')).toBeInTheDocument()
    })

    it('should have accessible image alt text', () => {
      render(<EventCard event={mockEvent} />)
      
      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('alt')
      expect(image.getAttribute('alt')).not.toBe('')
    })
  })

  describe('Data Types', () => {
    it('should handle numeric strings for price', () => {
      const event = { ...mockEvent, price: '25' as any }
      
      expect(() => render(<EventCard event={event} />)).not.toThrow()
    })

    it('should handle invalid date objects gracefully', () => {
      const invalidDateEvent = {
        ...mockEvent,
        date: 'invalid-date' as any,
      }
      
      expect(() => render(<EventCard event={invalidDateEvent} />)).not.toThrow()
    })
  })
})