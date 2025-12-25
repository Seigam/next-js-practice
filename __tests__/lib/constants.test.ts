import { events, EventItem } from '@/lib/constants'

describe('Constants - Events', () => {
  describe('Events Array', () => {
    it('should be defined and be an array', () => {
      expect(events).toBeDefined()
      expect(Array.isArray(events)).toBe(true)
    })

    it('should contain event items', () => {
      expect(events.length).toBeGreaterThan(0)
    })

    it('should have all required properties for each event', () => {
      events.forEach((event: EventItem) => {
        expect(event).toHaveProperty('title')
        expect(event).toHaveProperty('image')
        expect(event).toHaveProperty('slug')
        expect(event).toHaveProperty('location')
        expect(event).toHaveProperty('date')
        expect(event).toHaveProperty('time')
      })
    })
  })

  describe('Event Data Validation', () => {
    it('should have non-empty titles', () => {
      events.forEach((event: EventItem) => {
        expect(event.title).toBeTruthy()
        expect(event.title.length).toBeGreaterThan(0)
      })
    })

    it('should have valid image paths', () => {
      events.forEach((event: EventItem) => {
        expect(event.image).toMatch(/^\/images\//)
        expect(event.image).toMatch(/\.(png|jpg|jpeg|webp)$/i)
      })
    })

    it('should have URL-safe slugs', () => {
      events.forEach((event: EventItem) => {
        expect(event.slug).toMatch(/^[a-z0-9-]+$/)
        expect(event.slug).not.toMatch(/\s/)
      })
    })

    it('should have unique slugs', () => {
      const slugs = events.map((event: EventItem) => event.slug)
      const uniqueSlugs = new Set(slugs)
      expect(slugs.length).toBe(uniqueSlugs.size)
    })

    it('should have valid location strings', () => {
      events.forEach((event: EventItem) => {
        expect(event.location).toBeTruthy()
        expect(event.location.length).toBeGreaterThan(0)
      })
    })

    it('should have date in ISO format or readable format', () => {
      events.forEach((event: EventItem) => {
        expect(event.date).toBeTruthy()
        // Should be either ISO format or a readable date string
        const isValidDate = !isNaN(Date.parse(event.date))
        expect(isValidDate).toBe(true)
      })
    })

    it('should have time strings', () => {
      events.forEach((event: EventItem) => {
        expect(event.time).toBeTruthy()
        expect(event.time.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Event Time Validation', () => {
    it('should have properly formatted time strings', () => {
      events.forEach((event: EventItem) => {
        // Time should contain numbers and possibly timezone info
        expect(event.time).toMatch(/\d/)
      })
    })

    it('should have timezone information in time', () => {
      events.forEach((event: EventItem) => {
        // Most events should have timezone info (CET, PST, etc.)
        const hasTimezone = /[A-Z]{2,4}/.test(event.time)
        expect(hasTimezone || event.time.includes(':')).toBe(true)
      })
    })
  })

  describe('Event Date Validation', () => {
    it('should have dates that can be parsed', () => {
      events.forEach((event: EventItem) => {
        const parsedDate = new Date(event.date)
        expect(parsedDate.toString()).not.toBe('Invalid Date')
      })
    })

    it('should have future or recent dates', () => {
      const currentYear = new Date().getFullYear()
      events.forEach((event: EventItem) => {
        const eventYear = new Date(event.date).getFullYear()
        // Events should be within a reasonable timeframe
        expect(eventYear).toBeGreaterThanOrEqual(currentYear - 1)
        expect(eventYear).toBeLessThanOrEqual(currentYear + 10)
      })
    })
  })

  describe('Event Title Validation', () => {
    it('should have descriptive titles', () => {
      events.forEach((event: EventItem) => {
        // Titles should be at least a few characters long
        expect(event.title.length).toBeGreaterThan(5)
      })
    })

    it('should have properly formatted titles', () => {
      events.forEach((event: EventItem) => {
        // Titles should start with a capital letter or number
        expect(event.title[0]).toMatch(/[A-Z0-9]/)
      })
    })
  })

  describe('Event Location Validation', () => {
    it('should have location with city information', () => {
      events.forEach((event: EventItem) => {
        // Most locations should contain a comma (City, Country/State)
        const hasComma = event.location.includes(',')
        const hasMultipleWords = event.location.split(' ').length > 1
        expect(hasComma || hasMultipleWords).toBe(true)
      })
    })

    it('should have properly formatted locations', () => {
      events.forEach((event: EventItem) => {
        // Locations should start with a capital letter
        expect(event.location[0]).toMatch(/[A-Z]/)
      })
    })
  })

  describe('Event Slug Generation', () => {
    it('should have slugs derived from titles', () => {
      events.forEach((event: EventItem) => {
        // Slug should be lowercase version of title with hyphens
        const titleWords = event.title.toLowerCase().split(/\s+/)
        const slugContainsTitleWords = titleWords.some(word => 
          event.slug.includes(word.replace(/[^a-z0-9]/g, ''))
        )
        expect(slugContainsTitleWords).toBe(true)
      })
    })

    it('should not have consecutive hyphens', () => {
      events.forEach((event: EventItem) => {
        expect(event.slug).not.toMatch(/--+/)
      })
    })

    it('should not start or end with hyphen', () => {
      events.forEach((event: EventItem) => {
        expect(event.slug).not.toMatch(/^-/)
        expect(event.slug).not.toMatch(/-$/)
      })
    })
  })

  describe('Event Data Consistency', () => {
    it('should have consistent data types', () => {
      events.forEach((event: EventItem) => {
        expect(typeof event.title).toBe('string')
        expect(typeof event.image).toBe('string')
        expect(typeof event.slug).toBe('string')
        expect(typeof event.location).toBe('string')
        expect(typeof event.date).toBe('string')
        expect(typeof event.time).toBe('string')
      })
    })

    it('should not have null or undefined values', () => {
      events.forEach((event: EventItem) => {
        expect(event.title).not.toBeNull()
        expect(event.image).not.toBeNull()
        expect(event.slug).not.toBeNull()
        expect(event.location).not.toBeNull()
        expect(event.date).not.toBeNull()
        expect(event.time).not.toBeNull()
        
        expect(event.title).not.toBeUndefined()
        expect(event.image).not.toBeUndefined()
        expect(event.slug).not.toBeUndefined()
        expect(event.location).not.toBeUndefined()
        expect(event.date).not.toBeUndefined()
        expect(event.time).not.toBeUndefined()
      })
    })
  })

  describe('Event Image Paths', () => {
    it('should use existing image files', () => {
      const imageFiles = ['/images/event1.png', '/images/event2.png']
      events.forEach((event: EventItem) => {
        expect(imageFiles).toContain(event.image)
      })
    })

    it('should have consistent image naming', () => {
      events.forEach((event: EventItem) => {
        expect(event.image).toMatch(/^\/images\/event\d+\.png$/)
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle special characters in titles', () => {
      const specialCharEvents = events.filter((event: EventItem) => 
        /[&:+]/.test(event.title)
      )
      
      specialCharEvents.forEach((event: EventItem) => {
        // Slugs should not contain special characters
        expect(event.slug).not.toMatch(/[&:+]/)
      })
    })

    it('should handle numbers in titles and slugs', () => {
      const eventsWithNumbers = events.filter((event: EventItem) => 
        /\d/.test(event.title)
      )
      
      eventsWithNumbers.forEach((event: EventItem) => {
        // Numbers in title should be in slug
        const titleNumbers = event.title.match(/\d+/g) || []
        titleNumbers.forEach(num => {
          expect(event.slug).toContain(num)
        })
      })
    })
  })

  describe('Performance', () => {
    it('should have a reasonable number of events', () => {
      expect(events.length).toBeGreaterThan(0)
      expect(events.length).toBeLessThan(100) // Reasonable upper limit
    })

    it('should not have excessively long strings', () => {
      events.forEach((event: EventItem) => {
        expect(event.title.length).toBeLessThan(200)
        expect(event.location.length).toBeLessThan(200)
        expect(event.slug.length).toBeLessThan(200)
      })
    })
  })
})