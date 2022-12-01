import { useState } from 'react';

interface IResult<T> {
  loading: boolean;
  data?: T;
  error?: object;
}
type IMutationReturn<T> = [(formData: any) => void, IResult<T>];

export default function useMutation<T = any>(url: string): IMutationReturn<T> {
  const [result, setResult] = useState<IResult<T>>({
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
        alert(jsonError);
      })
      .then((data) => setResult((prev) => ({ ...prev, data })))
      .catch((error) => setResult((prev) => ({ ...prev, error })))
      .finally(() => setResult((prev) => ({ ...prev, loading: false })));
  };
  return [mutation, { ...result }];
}
