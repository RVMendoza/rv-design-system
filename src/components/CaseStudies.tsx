import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ImgHTMLAttributes,
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
            <span className={styles['rvds-project-preview__brand']}>
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
        </span>
        {image && (
          <span className={styles['rvds-project-preview__media']}>
            <img className={styles['rvds-project-preview__image']} loading="lazy" {...image} />
          </span>
        )}
        <span className={styles['rvds-project-preview__action']}>
          {actionLabel} <span aria-hidden="true">→</span>
        </span>
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
  const [interacting, setInteracting] = useState(false);

  useEffect(() => {
    if (!autoDrift) return;
    const rail = railRef.current;
    if (!rail) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let motionReduced = reducedMotion.matches;
    let frame = 0;
    let previousTime = 0;

    const drift = (time: number) => {
      if (!motionReduced && !interacting && time - previousTime >= 32) {
        rail.scrollLeft += 0.5;
        previousTime = time;
        if (rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 1) rail.scrollLeft = 0;
      }
      frame = window.requestAnimationFrame(drift);
    };
    const handleMotion = (event: MediaQueryListEvent) => {
      motionReduced = event.matches;
    };

    reducedMotion.addEventListener('change', handleMotion);
    frame = window.requestAnimationFrame(drift);
    return () => {
      reducedMotion.removeEventListener('change', handleMotion);
      window.cancelAnimationFrame(frame);
    };
  }, [autoDrift, interacting]);

  return (
    <div
      className={[styles['rvds-quote-rail'], className].filter(Boolean).join(' ')}
      onBlur={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onPointerEnter={() => setInteracting(true)}
      onPointerLeave={() => setInteracting(false)}
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
