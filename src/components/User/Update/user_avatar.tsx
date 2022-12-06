import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../../Tools/Button';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { IUpdateUser, IUserForm } from '../../../types/user';
import { useUser } from '../../../libs/client/useUser';
import { AvatarInput } from '../../../Tools/Avatar/Input';
import { useUploadImg } from '../../../libs/client/useTools';
import { ErrMsg } from '../../../Tools/Error/Message';
import { Form } from '../../../../styles/global';

export const UpdateAvatar = ({ _data }: IUpdateUser) => {
  const { User, type, update, theme, loading, setLoading } = _data;
  const {
    watch,
    reset,
    register,
    setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({ mode: 'onSubmit' });

  const avatar = watch('avatar');
  const [preview, setPreview] = useState('');
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [setPreview, avatar]);
  //
  const onValid = async ({ avatar }: IUserForm) => {
    if (!preview) return setError('avatar', { message: 'need_avatar' });
    if (loading) return;
    setLoading(true);
    const avatar_id = await useUploadImg(avatar);
    return update({ avatar: avatar_id });
  };
  //
  return (
    <>
      {type === 'avatar' && (
        <Cont onSubmit={handleSubmit(onValid)}>
          <AvatarInput
            _data={{
              theme,
              reset,
              preview,
              register,
              setPreview,
              avatar: User.avatar!,
            }}
          />
          <ErrMsg error={errors.avatar?.message!} theme={theme} />
          <Btn item={{ theme, name: 'Edit' }} type="submit" />
        </Cont>
      )}
    </>
  );
};
const Cont = styled(Form)`
  //align-items: center;
  //border: 2px solid hotpink;
  width: 100%;
  .avatar_input {
    //margin: 0;
    //border: 2px solid hotpink;
  }
  button {
    width: 60%;
    //margin-top: 1rem;
  }
`;
