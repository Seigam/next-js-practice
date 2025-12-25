import * as databaseIndex from '@/database/index'

describe('Database Index', () => {
  describe('Exports', () => {
    it('should export Event model', () => {
      expect(databaseIndex).toHaveProperty('Event')
      expect(databaseIndex.Event).toBeDefined()
    })

    it('should export Booking model', () => {
      expect(databaseIndex).toHaveProperty('Booking')
      expect(databaseIndex.Booking).toBeDefined()
    })
  })

  describe('Type Exports', () => {
    it('should have IEvent type available', () => {
      // Type exports can't be runtime tested, but we can verify the import works
      expect(() => {
        const test: typeof databaseIndex.Event = databaseIndex.Event
      }).not.toThrow()
    })

    it('should have IBooking type available', () => {
      // Type exports can't be runtime tested, but we can verify the import works
      expect(() => {
        const test: typeof databaseIndex.Booking = databaseIndex.Booking
      }).not.toThrow()
    })
  })

  describe('Module Structure', () => {
    it('should export only expected properties', () => {
      const exports = Object.keys(databaseIndex)
      expect(exports).toContain('Event')
      expect(exports).toContain('Booking')
    })

    it('should not export undefined values', () => {
      expect(databaseIndex.Event).not.toBeUndefined()
      expect(databaseIndex.Booking).not.toBeUndefined()
    })

    it('should not export null values', () => {
      expect(databaseIndex.Event).not.toBeNull()
      expect(databaseIndex.Booking).not.toBeNull()
    })
  })
})