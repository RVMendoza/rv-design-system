import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BrandLogo } from './BrandLogos';
import { BrandMarquee } from './BrandMarquee';
import { wrapBrandMarqueeOffset } from './BrandMarqueeUtils';

beforeEach(() => {
  vi.stubGlobal(
    'requestAnimationFrame',
    vi.fn(() => 1),
  );
  vi.stubGlobal('cancelAnimationFrame', vi.fn());
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('BrandMarquee', () => {
  it('renders one accessible list and two inert visual copies', () => {
    const { container } = render(
      <BrandMarquee label="Brand partners">
        <li>
          <BrandLogo name="Example Brand" />
        </li>
      </BrandMarquee>,
    );

    expect(screen.getByRole('list', { name: 'Brand partners' })).toBeVisible();
    const copies = container.querySelectorAll('.rvds-brand-marquee__list[aria-hidden="true"]');
    expect(copies).toHaveLength(2);
    expect(copies[0]).toHaveAttribute('inert');
  });

  it('exposes the wide spacing variant through a stable modifier', () => {
    const { container } = render(
      <BrandMarquee label="Brand partners" spacing="wide">
        <li>
          <BrandLogo name="Example Brand" />
        </li>
      </BrandMarquee>,
    );

    expect(container.querySelector('.rvds-brand-marquee')).toHaveClass('rvds-brand-marquee--wide');
  });

  it('pauses automatic movement while a pointer moves the shared offset', () => {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      bottom: 80,
      height: 80,
      left: 0,
      right: 300,
      top: 0,
      width: 300,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });
    const { container } = render(
      <BrandMarquee label="Brand partners">
        <li>
          <BrandLogo name="Example Brand" />
        </li>
      </BrandMarquee>,
    );
    const marquee = container.querySelector('.rvds-brand-marquee');
    const track = container.querySelector('.rvds-brand-marquee__track');
    expect(marquee).not.toBeNull();
    expect(track).not.toBeNull();

    fireEvent.pointerDown(marquee!, { button: 0, clientX: 100, pointerId: 1 });
    fireEvent.pointerMove(marquee!, { clientX: 40, pointerId: 1 });

    expect(marquee).toHaveAttribute('data-interacting');
    expect(track).toHaveStyle({ transform: 'translate3d(-60px, 0, 0)' });
  });

  it('resumes automatic movement when pointer capture is already lost', () => {
    vi.useFakeTimers();
    let animationFrame: FrameRequestCallback | undefined;
    vi.stubGlobal(
      'requestAnimationFrame',
      vi.fn((callback: FrameRequestCallback) => {
        animationFrame = callback;
        return 1;
      }),
    );
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      bottom: 80,
      height: 80,
      left: 0,
      right: 300,
      top: 0,
      width: 300,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });
    const { container } = render(
      <BrandMarquee label="Brand partners">
        <li>
          <BrandLogo name="Example Brand" />
        </li>
      </BrandMarquee>,
    );
    const marquee = container.querySelector<HTMLElement>('.rvds-brand-marquee')!;
    const track = container.querySelector<HTMLElement>('.rvds-brand-marquee__track')!;
    marquee.setPointerCapture = vi.fn();
    marquee.hasPointerCapture = vi.fn(() => true);
    marquee.releasePointerCapture = vi.fn(() => {
      throw new DOMException('Capture was already released', 'NotFoundError');
    });

    animationFrame?.(1000);
    animationFrame?.(1016);
    fireEvent.pointerDown(marquee, { button: 0, clientX: 100, pointerId: 7 });
    fireEvent.pointerMove(marquee, { clientX: 40, pointerId: 7 });
    fireEvent.pointerUp(marquee, { clientX: 40, pointerId: 7 });
    expect(marquee).toHaveAttribute('data-interacting');

    vi.advanceTimersByTime(250);
    expect(marquee).not.toHaveAttribute('data-interacting');
    const manualOffset = track.style.transform;
    animationFrame?.(1032);
    expect(track.style.transform).not.toBe(manualOffset);
    vi.useRealTimers();
  });

  it('recovers an active drag from lost capture, outside release, and window blur', () => {
    vi.useFakeTimers();
    const { container } = render(
      <BrandMarquee label="Brand partners">
        <li>
          <BrandLogo name="Example Brand" />
        </li>
      </BrandMarquee>,
    );
    const marquee = container.querySelector<HTMLElement>('.rvds-brand-marquee')!;
    marquee.setPointerCapture = vi.fn();

    for (const { pointerId, recover } of [
      { pointerId: 1, recover: () => fireEvent.lostPointerCapture(marquee, { pointerId: 1 }) },
      { pointerId: 2, recover: () => fireEvent.pointerUp(window, { pointerId: 2 }) },
      { pointerId: 3, recover: () => fireEvent.blur(window) },
    ]) {
      fireEvent.pointerDown(marquee, { button: 0, clientX: 100, pointerId });
      expect(marquee).toHaveAttribute('data-interacting');
      recover();
      vi.advanceTimersByTime(250);
      expect(marquee).not.toHaveAttribute('data-interacting');
    }
    vi.useRealTimers();
  });

  it('resumes after horizontal wheel input and ignores pointer exit without interaction', () => {
    vi.useFakeTimers();
    const { container } = render(
      <BrandMarquee label="Brand partners">
        <li>
          <BrandLogo name="Example Brand" />
        </li>
      </BrandMarquee>,
    );
    const marquee = container.querySelector<HTMLElement>('.rvds-brand-marquee')!;
    fireEvent.pointerLeave(marquee, { pointerId: 4 });
    expect(marquee).not.toHaveAttribute('data-interacting');
    fireEvent.wheel(marquee, { deltaX: 40, deltaY: 0 });
    expect(marquee).toHaveAttribute('data-interacting');
    vi.advanceTimersByTime(250);
    expect(marquee).not.toHaveAttribute('data-interacting');
    vi.useRealTimers();
  });

  it('does not start interaction or automatic movement under reduced motion', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => ({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    );
    const { container } = render(
      <BrandMarquee label="Brand partners">
        <li>
          <BrandLogo name="Example Brand" />
        </li>
      </BrandMarquee>,
    );
    const marquee = container.querySelector<HTMLElement>('.rvds-brand-marquee')!;
    const track = container.querySelector<HTMLElement>('.rvds-brand-marquee__track')!;
    fireEvent.pointerDown(marquee, { button: 0, clientX: 100, pointerId: 9 });
    fireEvent.wheel(marquee, { deltaX: 40 });
    expect(marquee).not.toHaveAttribute('data-interacting');
    expect(track).toHaveStyle({ transform: 'translate3d(0px, 0, 0)' });
  });

  it('wraps manual movement infinitely in either direction', () => {
    expect(wrapBrandMarqueeOffset(-350, 300)).toBe(-50);
    expect(wrapBrandMarqueeOffset(50, 300)).toBe(-250);
    expect(wrapBrandMarqueeOffset(-600, 300)).toBe(-0);
  });
});
