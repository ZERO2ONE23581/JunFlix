import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const Test: NextPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onValid = (data: any) => {
    if (confirm === '') return setError('testerror', { message: 'error!!' });
    console.log(data);
  };
  const [confirm, setConfirm] = useState('');
  console.log(confirm);
  // console.log(errors.testerror);

  useEffect(() => {
    if (!confirm) {
      setError('testerror', { message: 'error??' });
    }
  }, [setError, confirm]);
  //
  return (
    <>
      {errors.testerror && <h1>{errors.testerror.message}</h1>}
      <button
        onClick={() => {
          setConfirm('hello');
        }}
      >
        confirm
      </button>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register('test')} type="text" placeholder="test" />
        <button type="submit">test btn</button>
      </form>
    </>
  );
};

export default Test;
