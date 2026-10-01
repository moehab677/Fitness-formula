import { useCallback, useRef, type RefObject, type MouseEvent, type TouchEvent } from 'react'

/**
 * Hook that adds touch-swipe and mouse-drag interaction to a carousel element.
 *
 * Returns event handlers to spread onto the scrollable container and a `dragOffset`
 * ref that reports the live pixel displacement during a drag (for real-time visual
 * feedback). The caller supplies `onMove(direction)` to advance slides and `isRtl`
 * so the swipe direction is mirrored correctly for Arabic layouts.
 *
 * Swipe threshold: 40 px (matches the existing touch threshold in Transformations).
 * While dragging, the track receives an inline `--drag` custom property (px) so CSS
 * can add the offset to the current transform for fluid feedback.
 */

const SWIPE_THRESHOLD = 40

interface UseCarouselDragOptions {
  /** Callback to move by ±1 slide. */
  onMove: (direction: number) => void
  /** Whether the layout is right-to-left. */
  isRtl: boolean
  /** Ref to the track element to apply live drag offset. */
  trackRef: RefObject<HTMLElement | null>
  /** Optional callback fired when a drag gesture begins (e.g. to pause autoplay). */
  onDragStart?: () => void
  /** Optional callback fired when a drag gesture ends (e.g. to resume autoplay). */
  onDragEnd?: () => void
}

export function useCarouselDrag({
  onMove,
  isRtl,
  trackRef,
  onDragStart,
  onDragEnd,
}: UseCarouselDragOptions) {
  // Shared drag state persisted across renders via refs (no re-renders during drag).
  const startX = useRef(0)
  const dragging = useRef(false)
  const moved = useRef(false)

  // ---------- helpers ----------

  /** Apply the live pixel offset to the track via a CSS custom property. */
  const setDragOffset = useCallback(
    (px: number) => {
      trackRef.current?.style.setProperty('--drag', `${px}px`)
    },
    [trackRef],
  )

  /** Enable/disable the CSS transition on the track during/after drag. */
  const setTransition = useCallback(
    (enabled: boolean) => {
      if (!trackRef.current) return
      if (enabled) {
        trackRef.current.style.removeProperty('--dragging')
      } else {
        trackRef.current.style.setProperty('--dragging', '1')
      }
    },
    [trackRef],
  )

  /** Common drag-start logic. */
  const beginDrag = useCallback(
    (clientX: number) => {
      startX.current = clientX
      dragging.current = true
      moved.current = false
      setTransition(false)
      setDragOffset(0)
      onDragStart?.()
    },
    [setTransition, setDragOffset, onDragStart],
  )

  /** Common drag-move logic. */
  const updateDrag = useCallback(
    (clientX: number) => {
      if (!dragging.current) return
      const delta = clientX - startX.current
      if (Math.abs(delta) > 5) moved.current = true
      setDragOffset(delta)
    },
    [setDragOffset],
  )

  /** Common drag-end logic: snap to next/prev slide or spring back. */
  const endDrag = useCallback(
    (clientX: number) => {
      if (!dragging.current) return
      dragging.current = false
      setDragOffset(0)
      setTransition(true)
      const delta = clientX - startX.current
      if (Math.abs(delta) >= SWIPE_THRESHOLD) {
        // In LTR: dragging left (negative delta) → next slide (+1)
        // In RTL: directions are reversed.
        const forward = isRtl ? delta > 0 : delta < 0
        onMove(forward ? 1 : -1)
      }
      onDragEnd?.()
    },
    [isRtl, onMove, setDragOffset, setTransition, onDragEnd],
  )

  // ---------- touch handlers ----------

  const onTouchStart = useCallback(
    (e: TouchEvent) => {
      const touch = e.touches[0]
      if (touch) beginDrag(touch.clientX)
    },
    [beginDrag],
  )

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      const touch = e.touches[0]
      if (touch) updateDrag(touch.clientX)
    },
    [updateDrag],
  )

  const onTouchEnd = useCallback(
    (e: TouchEvent) => {
      const touch = e.changedTouches[0]
      if (touch) endDrag(touch.clientX)
    },
    [endDrag],
  )

  // ---------- mouse handlers ----------

  const onMouseDown = useCallback(
    (e: MouseEvent) => {
      // Only primary button.
      if (e.button !== 0) return
      e.preventDefault()
      beginDrag(e.clientX)

      // Attach window-level listeners so the drag continues even if the cursor
      // leaves the carousel bounds.
      const handleMouseMove = (ev: globalThis.MouseEvent) => updateDrag(ev.clientX)
      const handleMouseUp = (ev: globalThis.MouseEvent) => {
        endDrag(ev.clientX)
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    },
    [beginDrag, updateDrag, endDrag],
  )

  return {
    /** Spread these onto the carousel's scrollable container element. */
    containerProps: {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onMouseDown,
    },
    /** True while a gesture is in progress (for conditional cursor styling). */
    isDragging: dragging,
    /** True if the pointer moved significantly (to distinguish click from drag). */
    hasMoved: moved,
  }
}
