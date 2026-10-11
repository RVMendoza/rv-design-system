import {
  useCallback,
  useEffect,
  useRef,
  type HTMLAttributes,
  type ImgHTMLAttributes,
  type PointerEvent,
  type ReactNode,
} from 'react';
import { BrandLogo, type BrandLogoProps } from './BrandLogos';
import { Heading, Paragraph } from './Typography';
import { Icon } from './Icon';
import styles from './CaseStudies.module.css';

export type ProjectPreviewImage = Pick<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'alt' | 'width' | 'height' | 'loading'
>;

export interface ProjectPreviewProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  href: string;
  brandName: string;
  brandLogo?: BrandLogoProps['logo'];
  brandLogoScale?: number;
  meta?: ReactNode;
  roleLabel?: ReactNode;
  outcome: ReactNode;
  image?: ProjectPreviewImage;
  status?: ReactNode;
  actionLabel?: ReactNode;
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}

/** A brand-first, outcome-led preview for a portfolio project or partnership. */
export function ProjectPreview({
  href,
  brandName,
  brandLogo,
  brandLogoScale,
  meta,
  roleLabel,
  outcome,
  image,
  status,
  actionLabel = 'View case study',
  headingLevel = 2,
  className = '',
  ...props
}: ProjectPreviewProps) {
  return (
    <article
      className={[styles['rvds-project-preview'], className].filter(Boolean).join(' ')}
      {...props}
    >
      <a className={styles['rvds-project-preview__link']} href={href}>
        <span className={styles['rvds-project-preview__content']}>
          <span className={styles['rvds-project-preview__identity']}>
            <span
              className={styles['rvds-project-preview__brand']}
              {...(brandLogoScale && brandLogoScale > 1
                ? {
                    style: { inlineSize: `${3.25 * brandLogoScale}rem` },
                  }
                : {})}
            >
              <BrandLogo name={brandName} logo={brandLogo} logoScale={brandLogoScale} />
            </span>
            <span className={styles['rvds-project-preview__brand-name']}>
              {status && <span className={styles['rvds-project-preview__status']}>{status}</span>}
              {brandName}
            </span>
          </span>
          {meta && <span className={styles['rvds-project-preview__meta']}>{meta}</span>}
          {roleLabel && <span className={styles['rvds-project-preview__role']}>{roleLabel}</span>}
          <Heading
            className={styles['rvds-project-preview__outcome']}
            level={headingLevel}
            size={4}
          >
            {outcome}
          </Heading>
          <span className={styles['rvds-project-preview__action']}>
            {actionLabel} <span aria-hidden="true">→</span>
          </span>
        </span>
        {image && (
          <span
            className={[
              styles['rvds-project-preview__media'],
              styles[
                Number(image.width) < Number(image.height)
                  ? 'rvds-project-preview__media--portrait'
                  : 'rvds-project-preview__media--landscape'
              ],
            ].join(' ')}
          >
            <img className={styles['rvds-project-preview__image']} loading="lazy" {...image} />
          </span>
        )}
      </a>
    </article>
  );
}

export interface MetricItem {
  label: ReactNode;
  value: ReactNode;
}

export interface MetricGridProps extends HTMLAttributes<HTMLDListElement> {
  items: MetricItem[];
}

/** A compact definition list for verified outcomes or other key figures. */
export function MetricGrid({ items, className = '', ...props }: MetricGridProps) {
  return (
    <dl className={[styles['rvds-metric-grid'], className].filter(Boolean).join(' ')} {...props}>
      {items.map((item, index) => (
        <div className={styles['rvds-metric-grid__item']} key={index}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export interface FeatureStep {
  label: ReactNode;
  title: ReactNode;
  description: ReactNode;
  icon: string;
}

export interface FeatureStepsProps extends HTMLAttributes<HTMLOListElement> {
  items: FeatureStep[];
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}

/** An ordered, icon-led summary of a brief, process, or outcome. */
export function FeatureSteps({
  items,
  headingLevel = 3,
  className = '',
  ...props
}: FeatureStepsProps) {
  return (
    <ol className={[styles['rvds-feature-steps'], className].filter(Boolean).join(' ')} {...props}>
      {items.map((item, index) => (
        <li key={index}>
          <span className={styles['rvds-feature-steps__number']} aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <Icon className={styles['rvds-feature-steps__icon']} name={item.icon} />
          <span className={styles['rvds-feature-steps__label']}>{item.label}</span>
          <Heading className={styles['rvds-feature-steps__title']} level={headingLevel} size={4}>
            {item.title}
          </Heading>
          <Paragraph className={styles['rvds-feature-steps__description']}>
            {item.description}
          </Paragraph>
        </li>
      ))}
    </ol>
  );
}

export interface QuoteRailItem {
  quote: ReactNode;
  attribution: ReactNode;
}

export interface QuoteRailProps extends HTMLAttributes<HTMLDivElement> {
  items: QuoteRailItem[];
  label: string;
  autoDrift?: boolean;
}

/** A keyboard-scrollable rail of equal-size audience or testimonial quotes. */
export function QuoteRail({
  items,
  label,
  autoDrift = false,
  className = '',
  ...props
}: QuoteRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const interactionRef = useRef({ active: false, pointerId: -1, x: 0 });
  const resumeTimerRef = useRef<number | undefined>(undefined);

  const pause = useCallback(() => {
    window.clearTimeout(resumeTimerRef.current);
    railRef.current?.setAttribute('data-interacting', '');
  }, []);

  const resumeSoon = useCallback(() => {
    window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      railRef.current?.removeAttribute('data-interacting');
    }, 1200);
  }, []);

  const finishInteraction = useCallback(
    (pointerId: number) => {
      const interaction = interactionRef.current;
      if (!interaction.active || interaction.pointerId !== pointerId) return;
      interactionRef.current = { active: false, pointerId: -1, x: interaction.x };
      railRef.current?.removeAttribute('data-dragging');
      resumeSoon();
    },
    [resumeSoon],
  );

  useEffect(() => {
    if (!autoDrift) return;
    const rail = railRef.current;
    if (!rail) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let previousTime = 0;

    const drift = (time: number) => {
      const elapsed = previousTime === 0 ? 0 : Math.min(time - previousTime, 50);
      previousTime = time;
      if (!rail.hasAttribute('data-interacting')) {
        const pixelsPerMillisecond = reducedMotion.matches ? 0.004 : 0.016;
        rail.scrollLeft += elapsed * pixelsPerMillisecond;
        if (rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 1) rail.scrollLeft = 0;
      }
      frame = window.requestAnimationFrame(drift);
    };
    const recoverPointer = (event: globalThis.PointerEvent) => finishInteraction(event.pointerId);
    const recoverWindowBlur = () => {
      const interaction = interactionRef.current;
      if (interaction.active) finishInteraction(interaction.pointerId);
    };

    window.addEventListener('pointerup', recoverPointer);
    window.addEventListener('pointercancel', recoverPointer);
    window.addEventListener('blur', recoverWindowBlur);
    frame = window.requestAnimationFrame(drift);
    return () => {
      window.clearTimeout(resumeTimerRef.current);
      window.removeEventListener('pointerup', recoverPointer);
      window.removeEventListener('pointercancel', recoverPointer);
      window.removeEventListener('blur', recoverWindowBlur);
      window.cancelAnimationFrame(frame);
    };
  }, [autoDrift, finishInteraction]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    interactionRef.current = { active: true, pointerId: event.pointerId, x: event.clientX };
    event.currentTarget.setPointerCapture?.(event.pointerId);
    event.currentTarget.setAttribute('data-dragging', '');
    pause();
  };
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const interaction = interactionRef.current;
    if (!interaction.active || interaction.pointerId !== event.pointerId) return;
    event.currentTarget.scrollLeft -= event.clientX - interaction.x;
    interaction.x = event.clientX;
  };
  const finishPointer = (event: PointerEvent<HTMLDivElement>) => {
    finishInteraction(event.pointerId);
    try {
      if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
        event.currentTarget.releasePointerCapture?.(event.pointerId);
      }
    } catch {
      // Pointer capture may already be gone after release outside the rail.
    }
  };

  return (
    <div
      className={[styles['rvds-quote-rail'], className].filter(Boolean).join(' ')}
      onBlur={resumeSoon}
      onDragStart={(event) => event.preventDefault()}
      onFocus={pause}
      onKeyDown={(event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        pause();
        resumeSoon();
      }}
      onLostPointerCapture={(event) => finishInteraction(event.pointerId)}
      onPointerCancel={finishPointer}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishPointer}
      onWheel={() => {
        pause();
        resumeSoon();
      }}
      ref={railRef}
      role="region"
      aria-label={label}
      tabIndex={0}
      {...props}
    >
      {items.map((item, index) => (
        <blockquote className={styles['rvds-quote-rail__quote']} key={index}>
          <Paragraph
            className={[
              styles['rvds-quote-rail__copy'],
              typeof item.quote === 'string' && item.quote.length > 80
                ? styles['rvds-quote-rail__copy--long']
                : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {item.quote}
          </Paragraph>
          <footer>{item.attribution}</footer>
        </blockquote>
      ))}
    </div>
  );
}
