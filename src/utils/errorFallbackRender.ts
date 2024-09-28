import { type FallbackProps } from 'react-error-boundary';

interface FallbackPropsWithOptions extends FallbackProps {
  text?: string;
}

export function errorFallbackRender({
  error,
  text = String(error),
}: FallbackPropsWithOptions) {
  return text;
}
