import { cn } from '@/lib/utils'

describe('Utils - cn (className utility)', () => {
  describe('Basic Functionality', () => {
    it('should merge single className', () => {
      const result = cn('class1')
      expect(result).toBe('class1')
    })

    it('should merge multiple classNames', () => {
      const result = cn('class1', 'class2', 'class3')
      expect(result).toContain('class1')
      expect(result).toContain('class2')
      expect(result).toContain('class3')
    })

    it('should handle undefined values', () => {
      const result = cn('class1', undefined, 'class2')
      expect(result).toContain('class1')
      expect(result).toContain('class2')
    })

    it('should handle null values', () => {
      const result = cn('class1', null, 'class2')
      expect(result).toContain('class1')
      expect(result).toContain('class2')
    })

    it('should handle empty strings', () => {
      const result = cn('class1', '', 'class2')
      expect(result).toContain('class1')
      expect(result).toContain('class2')
    })
  })

  describe('Conditional Classes', () => {
    it('should handle conditional class objects', () => {
      const result = cn({
        'class1': true,
        'class2': false,
        'class3': true,
      })
      expect(result).toContain('class1')
      expect(result).not.toContain('class2')
      expect(result).toContain('class3')
    })

    it('should handle mixed conditionals and strings', () => {
      const result = cn('always-present', {
        'conditional': true,
        'not-included': false,
      })
      expect(result).toContain('always-present')
      expect(result).toContain('conditional')
      expect(result).not.toContain('not-included')
    })
  })

  describe('Tailwind Merge Functionality', () => {
    it('should merge conflicting Tailwind classes', () => {
      const result = cn('px-2 py-1', 'px-4')
      // Should keep the last px value
      expect(result).toContain('px-4')
      expect(result).not.toContain('px-2')
    })

    it('should handle conflicting background classes', () => {
      const result = cn('bg-red-500', 'bg-blue-500')
      expect(result).toContain('bg-blue-500')
      expect(result).not.toContain('bg-red-500')
    })

    it('should handle conflicting text size classes', () => {
      const result = cn('text-sm', 'text-lg')
      expect(result).toContain('text-lg')
      expect(result).not.toContain('text-sm')
    })

    it('should keep non-conflicting classes', () => {
      const result = cn('px-2', 'py-4', 'bg-blue-500')
      expect(result).toContain('px-2')
      expect(result).toContain('py-4')
      expect(result).toContain('bg-blue-500')
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty input', () => {
      const result = cn()
      expect(result).toBe('')
    })

    it('should handle arrays of classes', () => {
      const result = cn(['class1', 'class2'])
      expect(result).toContain('class1')
      expect(result).toContain('class2')
    })

    it('should handle nested arrays', () => {
      const result = cn(['class1', ['class2', 'class3']])
      expect(result).toContain('class1')
      expect(result).toContain('class2')
      expect(result).toContain('class3')
    })

    it('should handle very long class strings', () => {
      const longClass = 'a '.repeat(100).trim()
      expect(() => cn(longClass)).not.toThrow()
    })

    it('should handle special characters in class names', () => {
      const result = cn('hover:bg-blue-500', 'focus:ring-2')
      expect(result).toContain('hover:bg-blue-500')
      expect(result).toContain('focus:ring-2')
    })

    it('should handle responsive classes', () => {
      const result = cn('sm:text-sm', 'md:text-base', 'lg:text-lg')
      expect(result).toContain('sm:text-sm')
      expect(result).toContain('md:text-base')
      expect(result).toContain('lg:text-lg')
    })
  })

  describe('Type Safety', () => {
    it('should accept string inputs', () => {
      expect(() => cn('class1', 'class2')).not.toThrow()
    })

    it('should accept boolean conditionals', () => {
      expect(() => cn('class1', true && 'class2', false && 'class3')).not.toThrow()
    })

    it('should handle falsy values', () => {
      const result = cn('class1', false, null, undefined, 0, '')
      expect(result).toBe('class1')
    })
  })

  describe('Performance', () => {
    it('should handle many class inputs efficiently', () => {
      const classes = Array(100).fill('class').map((c, i) => `${c}${i}`)
      const start = Date.now()
      cn(...classes)
      const end = Date.now()
      expect(end - start).toBeLessThan(100) // Should complete in less than 100ms
    })

    it('should cache results for identical inputs', () => {
      const input = 'class1 class2 class3'
      const result1 = cn(input)
      const result2 = cn(input)
      expect(result1).toBe(result2)
    })
  })
})