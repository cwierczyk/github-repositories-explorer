export const checkRequiredVariables = (variables: string[]) => {
  const someMissingVariable = variables.some(
    (variable) => !`${variable}`.length,
  );

  if (!someMissingVariable) return;

  throw new Error('Some required variables are missing');
};
