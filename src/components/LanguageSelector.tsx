import styled from '@emotion/styled';

import { DeFlagIcon, EnFlagIcon, PlFlagIcon } from '@/assets/icons';
import { AVAILABLE_LANGUAGES } from '@/const';
import { useTranslation } from '@/hooks';
import { type FunctionComponent } from '@/types';

import { GhostButton } from './button';
import { Menu } from './Menu';
import { Typography } from './Typography';

const FLAG_IMAGES = {
  pl: PlFlagIcon,
  en: EnFlagIcon,
  de: DeFlagIcon,
};

export const LanguageSelector: FunctionComponent = () => {
  const { t, i18n } = useTranslation('common');

  const currentLanguage = i18n.language;

  return (
    <Menu
      trigger={
        <GhostButton>
          <Row>
            <FlagImage
              src={FLAG_IMAGES[currentLanguage]}
              alt={currentLanguage}
            />
            <Typography inherit>{t(`language.${i18n.language}`)}</Typography>
          </Row>
        </GhostButton>
      }
      items={AVAILABLE_LANGUAGES.filter(
        (language) => language !== currentLanguage,
      ).map((language) => ({
        startIcon: <FlagImage src={FLAG_IMAGES[language]} alt={language} />,
        label: t(`language.${language}`),
        onClick: () =>
          i18n.changeLanguage(language).catch(() => {
            throw new Error('Failed to change language');
          }),
      }))}
    />
  );
};

const FlagImage = styled.img`
  width: 20px;
  height: 20px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;
