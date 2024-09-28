import styled from '@emotion/styled';

import { AVAILABLE_LANGUAGES } from '@/const';
import { useTranslation } from '@/hooks';
import { type FunctionComponent } from '@/types';

export const LanguageButton: FunctionComponent = () => {
  const { t, i18n } = useTranslation('common');

  const currentLanguage = i18n.language;

  return (
    <Container>
      {AVAILABLE_LANGUAGES.map((language) => (
        <button
          key={language}
          onClick={() => {
            i18n.changeLanguage(language).catch(() => {
              throw new Error('Failed to change language');
            });
          }}
          disabled={currentLanguage === language}
        >
          {t(`language.${language}` as const)}
        </button>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  max-width: 300px;

  button {
    flex: 1;
  }
`;
