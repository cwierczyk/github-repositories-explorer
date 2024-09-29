import { useState } from 'react';
import styled from '@emotion/styled';

import { PrimaryButton, TextInput } from '@/components';
import { useTranslation } from '@/hooks';
import { type FunctionComponent } from '@/types';

interface Props {
  onSubmitSearch: (query: string) => void;
  isLoading: boolean;
}

export const SearchField: FunctionComponent<Props> = ({
  onSubmitSearch,
  isLoading,
}) => {
  const [inputValue, setInputValue] = useState('');
  const { t } = useTranslation('common');

  const isSubmitDisabled = inputValue.length < 1 || isLoading;

  return (
    <Container>
      <TextInput
        placeholder={t('placeholder.username')}
        value={inputValue}
        onChange={(_, value) => setInputValue(value)}
        onKeyDown={(event) => {
          if (isSubmitDisabled) return;

          if (event.key === 'Enter') onSubmitSearch(inputValue);
        }}
      />
      <PrimaryButton
        onClick={() => onSubmitSearch(inputValue)}
        disabled={isSubmitDisabled}
      >
        {t('button.search')}
      </PrimaryButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;
