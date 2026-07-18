import { useId, type InputHTMLAttributes, type ReactNode } from 'react';
import styles from './FormField.module.css';

export interface FormFieldProps { label: string; hint?: ReactNode; error?: ReactNode; required?: boolean; children: (ids: { id: string; describedBy?: string; invalid: boolean }) => ReactNode; }
export function FormField({ label, hint, error, required, children }: FormFieldProps) {
  const id = useId(); const hintId = hint ? `${id}-hint` : undefined; const errorId = error ? `${id}-error` : undefined;
  return <div className={styles['rvds-form-field']}><label className={styles['rvds-form-field__label']} htmlFor={id}>{label}{required ? ' (required)' : ''}</label>{hint && <span className={styles['rvds-form-field__hint']} id={hintId}>{hint}</span>}{children({ id, describedBy: [hintId, errorId].filter(Boolean).join(' ') || undefined, invalid: Boolean(error) })}{error && <span className={styles['rvds-form-field__error']} id={errorId}>{error}</span>}</div>;
}
export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> { label: string; hint?: ReactNode; error?: ReactNode; }
export function TextInput({ label, hint, error, required, ...props }: TextInputProps) { return <FormField label={label} hint={hint} error={error} required={required}>{({ id, describedBy, invalid }) => <input className={styles['rvds-text-input']} id={id} aria-describedby={describedBy} aria-invalid={invalid || undefined} required={required} {...props} />}</FormField>; }
