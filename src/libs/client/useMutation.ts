import { useState } from 'react';

interface IMutationResult {
  loading: boolean;
  data?: object | any;
  error?: object | any;
}
type IMutationReturn = [(formData: any) => void, IMutationResult];

export const useMutation = (url: string): IMutationReturn => {
  const [result, setResult] = useState<IMutationResult>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  //
  const mutation = (formData: any) => {
    setResult((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((dataFromBack) => dataFromBack.json())
      .catch((jsonError) => {
        console.log(jsonError);
      })
      .then((data) => setResult((prev) => ({ ...prev, data })))
      .catch((error) => setResult((prev) => ({ ...prev, error })))
      .finally(() => setResult((prev) => ({ ...prev, loading: false })));
  };
  return [mutation, { ...result }];
};
