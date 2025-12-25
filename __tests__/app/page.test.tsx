import React from 'react'
import { render, screen } from '@testing-library/react'
import Page from '@/page'

// Mock the components
jest.mock('@/components/ExploreBtn', () => {
  return function MockExploreBtn() {
    return <button data-testid="explore-btn">Explore Events</button>
  }
})

jest.mock('@/components/EventCard', () => {
  return function MockEventCard(props: any) {
    return <div data-testid="event-card">{props.title}</div>
  }
})

jest.mock('@/lib/constants', () => ({
  events: [
    {
      title: 'Test Event 1',
      image: '/images/event1.png',
      slug: 'test-event-1',
      location: 'Test City',
      date: '2024-12-31',
      time: '18:00',
    },
    {
      title: 'Test Event 2',
      image: '/images/event2.png',
      slug: 'test-event-2',
      location: 'Test City 2',
      date: '2024-12-31',
      time: '19:00',
    },
  ],
}))

describe('Page Component', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      expect(() => render(<Page />)).not.toThrow()
    })

    it('should render the main heading', () => {
      render(<Page />)
      
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
      expect(heading.textContent).toContain('The Hub for Every Dev')
    })

    it('should render the subtitle', () => {
      render(<Page />)
      
      expect(screen.getByText(/Hackathons, Meetups, and Conferences/i)).toBeInTheDocument()
    })

    it('should render the ExploreBtn component', () => {
      render(<Page />)
      
      expect(screen.getByTestId('explore-btn')).toBeInTheDocument()
    })

    it('should render the Featured Events heading', () => {
      render(<Page />)
      
      expect(screen.getByRole('heading', { name: /Featured Events/i })).toBeInTheDocument()
    })

    it('should render event cards', () => {
      render(<Page />)
      
      const eventCards = screen.getAllByTestId('event-card')
      expect(eventCards.length).toBeGreaterThan(0)
    })

    it('should render all events from constants', () => {
      render(<Page />)
      
      expect(screen.getByText('Test Event 1')).toBeInTheDocument()
      expect(screen.getByText('Test Event 2')).toBeInTheDocument()
    })
  })

  describe('Structure', () => {
    it('should have a section wrapper', () => {
      const { container } = render(<Page />)
      
      expect(container.querySelector('section')).toBeInTheDocument()
    })

    it('should have events list', () => {
      const { container } = render(<Page />)
      
      const list = container.querySelector('ul.events')
      expect(list).toBeInTheDocument()
    })

    it('should render events as list items', () => {
      const { container } = render(<Page />)
      
      const listItems = container.querySelectorAll('ul.events li')
      expect(listItems.length).toBe(2)
    })
  })

  describe('Content', () => {
    it('should display heading with line break', () => {
      const { container } = render(<Page />)
      
      const heading = container.querySelector('h1')
      expect(heading?.innerHTML).toContain('<br')
    })

    it('should have text centered class on heading', () => {
      const { container } = render(<Page />)
      
      const heading = container.querySelector('h1')
      expect(heading?.className).toContain('text-center')
    })

    it('should have proper spacing classes', () => {
      const { container } = render(<Page />)
      
      const subtitle = container.querySelector('p')
      expect(subtitle?.className).toContain('mt-5')
    })
  })

  describe('Event Rendering', () => {
    it('should use event title as key', () => {
      const { container } = render(<Page />)
      
      const listItems = container.querySelectorAll('ul.events li')
      listItems.forEach((item, index) => {
        expect(item).toBeInTheDocument()
      })
    })

    it('should pass event props to EventCard', () => {
      render(<Page />)
      
      // Check that event titles are rendered (passed as props to EventCard)
      expect(screen.getByText('Test Event 1')).toBeInTheDocument()
      expect(screen.getByText('Test Event 2')).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('should have proper class names', () => {
      const { container } = render(<Page />)
      
      expect(container.querySelector('.text-center')).toBeInTheDocument()
      expect(container.querySelector('.mt-5')).toBeInTheDocument()
      expect(container.querySelector('.mt-20')).toBeInTheDocument()
      expect(container.querySelector('.space-y-7')).toBeInTheDocument()
    })

    it('should have events list without default styling', () => {
      const { container } = render(<Page />)
      
      const list = container.querySelector('ul.events')
      expect(list?.className).toContain('list-none')
    })
  })

  describe('Integration', () => {
    it('should integrate with ExploreBtn component', () => {
      render(<Page />)
      
      const exploreBtn = screen.getByTestId('explore-btn')
      expect(exploreBtn).toBeInTheDocument()
    })

    it('should integrate with EventCard components', () => {
      render(<Page />)
      
      const eventCards = screen.getAllByTestId('event-card')
      expect(eventCards.length).toBe(2)
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty events array', () => {
      jest.resetModules()
      jest.mock('@/lib/constants', () => ({
        events: [],
      }))
      
      const { container } = render(<Page />)
      const listItems = container.querySelectorAll('ul.events li')
      expect(listItems.length).toBe(0)
    })

    it('should handle events with special characters', () => {
      jest.resetModules()
      jest.mock('@/lib/constants', () => ({
        events: [{
          title: 'Event & Conference: "Special"',
          image: '/images/event1.png',
          slug: 'event-conference-special',
          location: 'City, Country',
          date: '2024-12-31',
          time: '18:00',
        }],
      }))
      
      expect(() => render(<Page />)).not.toThrow()
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<Page />)
      
      const h1 = screen.getByRole('heading', { level: 1 })
      const h3 = screen.getByRole('heading', { level: 3 })
      
      expect(h1).toBeInTheDocument()
      expect(h3).toBeInTheDocument()
    })

    it('should have semantic HTML structure', () => {
      const { container } = render(<Page />)
      
      expect(container.querySelector('section')).toBeInTheDocument()
      expect(container.querySelector('ul')).toBeInTheDocument()
    })
  })
})