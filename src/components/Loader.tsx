import { Typography } from '@/components/Typography';
import { useTranslation } from '@/hooks';
import { type FunctionComponent } from '@/types';

export const Loader: FunctionComponent = () => {
  const { t } = useTranslation('common');

  return <Typography>{t('loading')}</Typography>;
};
