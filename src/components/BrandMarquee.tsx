import {
  useCallback,
  useEffect,
  useRef,
  type FocusEvent,
  type HTMLAttributes,
  type PointerEvent,
  type ReactNode,
  type WheelEvent,
} from 'react';
import { BrandLogoList } from './BrandLogos';
import styles from './BrandMarquee.module.css';
import { wrapBrandMarqueeOffset } from './BrandMarqueeUtils';

export interface BrandMarqueeProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: ReactNode;
  /** Accessible name for the single semantic logo list. */
  label: string;
  /** Automatic movement speed. Manual interaction always pauses movement. */
  pixelsPerSecond?: number;
  /** Visual separation between brand slots. */
  spacing?: 'default' | 'wide';
}

const MARQUEE_RESUME_DELAY = 250;

/** An infinitely wrapping brand rail with automatic motion and direct manipulation. */
export function BrandMarquee({
  children,
  label,
  pixelsPerSecond = 35,
  spacing = 'default',
  className = '',
  onBlur,
  onFocus,
  onPointerCancel,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onWheel,
  ...props
}: BrandMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstListRef = useRef<HTMLUListElement>(null);
  const cycleWidthRef = useRef(0);
  const offsetRef = useRef(0);
  const interactionRef = useRef({ active: false, pointerId: -1, x: 0 });
  const reducedMotionRef = useRef(false);
  const resumeTimerRef = useRef<number | undefined>(undefined);

  const writeOffset = useCallback((nextOffset: number) => {
    const track = trackRef.current;
    if (!track) return;
    offsetRef.current = wrapBrandMarqueeOffset(nextOffset, cycleWidthRef.current);
    track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
  }, []);

  const pause = useCallback(() => {
    window.clearTimeout(resumeTimerRef.current);
    marqueeRef.current?.setAttribute('data-interacting', '');
  }, []);

  const resumeSoon = useCallback(() => {
    window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      marqueeRef.current?.removeAttribute('data-interacting');
    }, MARQUEE_RESUME_DELAY);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const firstList = firstListRef.current;
    if (!track || !firstList) return;

    const updateWidth = () => {
      cycleWidthRef.current = firstList.getBoundingClientRect().width;
      writeOffset(offsetRef.current);
    };
    updateWidth();

    const resizeObserver =
      typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(updateWidth);
    resizeObserver?.observe(firstList);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => {
      reducedMotionRef.current = motionQuery.matches;
      if (motionQuery.matches) writeOffset(0);
    };
    updateMotion();
    motionQuery.addEventListener('change', updateMotion);

    let frame = 0;
    let previousTime = 0;
    const speed = Math.max(0, pixelsPerSecond) / 1000;
    const move = (time: number) => {
      const elapsed = previousTime === 0 ? 0 : Math.min(time - previousTime, 50);
      previousTime = time;
      if (!reducedMotionRef.current && !marqueeRef.current?.hasAttribute('data-interacting')) {
        writeOffset(offsetRef.current - elapsed * speed);
      }
      frame = window.requestAnimationFrame(move);
    };
    frame = window.requestAnimationFrame(move);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(resumeTimerRef.current);
      resizeObserver?.disconnect();
      motionQuery.removeEventListener('change', updateMotion);
    };
  }, [pixelsPerSecond, writeOffset]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    onPointerDown?.(event);
    if (event.defaultPrevented || event.button !== 0 || reducedMotionRef.current) return;
    interactionRef.current = {
      active: true,
      pointerId: event.pointerId,
      x: event.clientX,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
    pause();
  };
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(event);
    const interaction = interactionRef.current;
    if (!interaction.active || interaction.pointerId !== event.pointerId) return;
    const delta = event.clientX - interaction.x;
    interaction.x = event.clientX;
    writeOffset(offsetRef.current + delta);
  };
  const finishPointer = (event: PointerEvent<HTMLDivElement>) => {
    if (event.type === 'pointercancel') onPointerCancel?.(event);
    else onPointerUp?.(event);
    if (interactionRef.current.pointerId !== event.pointerId) return;
    interactionRef.current.active = false;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    resumeSoon();
  };
  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    onWheel?.(event);
    if (event.defaultPrevented || reducedMotionRef.current) return;
    const delta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.shiftKey
          ? event.deltaY
          : 0;
    if (delta === 0) return;
    event.preventDefault();
    pause();
    writeOffset(offsetRef.current - delta);
    resumeSoon();
  };
  const handleFocus = (event: FocusEvent<HTMLDivElement>) => {
    onFocus?.(event);
    pause();
    writeOffset(0);
  };
  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    onBlur?.(event);
    if (!event.currentTarget.contains(event.relatedTarget)) resumeSoon();
  };

  return (
    <div
      className={[
        styles['rvds-brand-marquee'],
        spacing === 'wide' ? styles['rvds-brand-marquee--wide'] : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onPointerCancel={finishPointer}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishPointer}
      onWheel={handleWheel}
      ref={marqueeRef}
      {...props}
    >
      <div className={styles['rvds-brand-marquee__track']} ref={trackRef}>
        <BrandLogoList
          aria-label={label}
          className={styles['rvds-brand-marquee__list']}
          ref={firstListRef}
        >
          {children}
        </BrandLogoList>
        <BrandLogoList aria-hidden="true" className={styles['rvds-brand-marquee__list']} inert>
          {children}
        </BrandLogoList>
        <BrandLogoList aria-hidden="true" className={styles['rvds-brand-marquee__list']} inert>
          {children}
        </BrandLogoList>
      </div>
    </div>
  );
}
