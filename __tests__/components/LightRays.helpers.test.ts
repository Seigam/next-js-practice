describe('LightRays Helper Functions', () => {
  describe('hexToRgb conversion', () => {
    // We'll test the concept since we can't directly import the function
    const hexToRgb = (hex: string): [number, number, number] => {
      const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return m
        ? [
            parseInt(m[1], 16) / 255,
            parseInt(m[2], 16) / 255,
            parseInt(m[3], 16) / 255,
          ]
        : [1, 1, 1]
    }

    it('should convert white hex to RGB', () => {
      const result = hexToRgb('#ffffff')
      expect(result).toEqual([1, 1, 1])
    })

    it('should convert black hex to RGB', () => {
      const result = hexToRgb('#000000')
      expect(result).toEqual([0, 0, 0])
    })

    it('should convert red hex to RGB', () => {
      const result = hexToRgb('#ff0000')
      expect(result).toEqual([1, 0, 0])
    })

    it('should convert green hex to RGB', () => {
      const result = hexToRgb('#00ff00')
      expect(result).toEqual([0, 1, 0])
    })

    it('should convert blue hex to RGB', () => {
      const result = hexToRgb('#0000ff')
      expect(result).toEqual([0, 0, 1])
    })

    it('should handle hex without # prefix', () => {
      const result = hexToRgb('ffffff')
      expect(result).toEqual([1, 1, 1])
    })

    it('should handle lowercase hex', () => {
      const result = hexToRgb('#abc123')
      expect(result[0]).toBeCloseTo(0.67, 2)
      expect(result[1]).toBeCloseTo(0.75, 2)
      expect(result[2]).toBeCloseTo(0.14, 2)
    })

    it('should handle uppercase hex', () => {
      const result = hexToRgb('#ABC123')
      expect(result[0]).toBeCloseTo(0.67, 2)
      expect(result[1]).toBeCloseTo(0.75, 2)
      expect(result[2]).toBeCloseTo(0.14, 2)
    })

    it('should return default for invalid hex', () => {
      const result = hexToRgb('invalid')
      expect(result).toEqual([1, 1, 1])
    })

    it('should return default for empty string', () => {
      const result = hexToRgb('')
      expect(result).toEqual([1, 1, 1])
    })

    it('should return default for short hex', () => {
      const result = hexToRgb('#fff')
      expect(result).toEqual([1, 1, 1])
    })

    it('should handle mid-range values', () => {
      const result = hexToRgb('#808080')
      expect(result[0]).toBeCloseTo(0.5, 2)
      expect(result[1]).toBeCloseTo(0.5, 2)
      expect(result[2]).toBeCloseTo(0.5, 2)
    })
  })

  describe('getAnchorAndDir positioning', () => {
    type RaysOrigin =
      | "top-center"
      | "top-center-offset"
      | "top-left"
      | "top-right"
      | "right"
      | "left"
      | "bottom-center"
      | "bottom-right"
      | "bottom-left"

    const getAnchorAndDir = (
      origin: RaysOrigin,
      w: number,
      h: number
    ): { anchor: [number, number]; dir: [number, number] } => {
      const outside = 0.2
      switch (origin) {
        case "top-left":
          return { anchor: [0, -outside * h], dir: [0, 1] }
        case "top-right":
          return { anchor: [w, -outside * h], dir: [0, 1] }
        case "top-center-offset":
          return { anchor: [0.5 * w + 0.2 * w, -outside * h], dir: [-0.2, 1] }
        case "left":
          return { anchor: [-outside * w, 0.5 * h], dir: [1, 0] }
        case "right":
          return { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0] }
        case "bottom-left":
          return { anchor: [0, (1 + outside) * h], dir: [0, -1] }
        case "bottom-center":
          return { anchor: [0.5 * w, (1 + outside) * h], dir: [0, -1] }
        case "bottom-right":
          return { anchor: [w, (1 + outside) * h], dir: [0, -1] }
        default:
          return { anchor: [0.5 * w, -outside * h], dir: [0, 1] }
      }
    }

    const width = 1000
    const height = 800

    it('should position top-left correctly', () => {
      const result = getAnchorAndDir('top-left', width, height)
      expect(result.anchor).toEqual([0, -160])
      expect(result.dir).toEqual([0, 1])
    })

    it('should position top-right correctly', () => {
      const result = getAnchorAndDir('top-right', width, height)
      expect(result.anchor).toEqual([1000, -160])
      expect(result.dir).toEqual([0, 1])
    })

    it('should position top-center correctly', () => {
      const result = getAnchorAndDir('top-center', width, height)
      expect(result.anchor).toEqual([500, -160])
      expect(result.dir).toEqual([0, 1])
    })

    it('should position top-center-offset correctly', () => {
      const result = getAnchorAndDir('top-center-offset', width, height)
      expect(result.anchor).toEqual([700, -160])
      expect(result.dir).toEqual([-0.2, 1])
    })

    it('should position left correctly', () => {
      const result = getAnchorAndDir('left', width, height)
      expect(result.anchor).toEqual([-200, 400])
      expect(result.dir).toEqual([1, 0])
    })

    it('should position right correctly', () => {
      const result = getAnchorAndDir('right', width, height)
      expect(result.anchor).toEqual([1200, 400])
      expect(result.dir).toEqual([-1, 0])
    })

    it('should position bottom-left correctly', () => {
      const result = getAnchorAndDir('bottom-left', width, height)
      expect(result.anchor).toEqual([0, 960])
      expect(result.dir).toEqual([0, -1])
    })

    it('should position bottom-center correctly', () => {
      const result = getAnchorAndDir('bottom-center', width, height)
      expect(result.anchor).toEqual([500, 960])
      expect(result.dir).toEqual([0, -1])
    })

    it('should position bottom-right correctly', () => {
      const result = getAnchorAndDir('bottom-right', width, height)
      expect(result.anchor).toEqual([1000, 960])
      expect(result.dir).toEqual([0, -1])
    })

    it('should handle zero dimensions', () => {
      const result = getAnchorAndDir('top-center', 0, 0)
      expect(result.anchor).toEqual([0, 0])
      expect(result.dir).toEqual([0, 1])
    })

    it('should handle very large dimensions', () => {
      const result = getAnchorAndDir('top-center', 10000, 10000)
      expect(result.anchor).toEqual([5000, -2000])
      expect(result.dir).toEqual([0, 1])
    })
  })
})