import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../Tools/Button';
import { useEffect, useState } from 'react';
import { BtnWrap, Form } from '../../../../styles/global';
import { ErrMsg } from '../../../Tools/Error/Message';
import { AvatarInput } from '../../../Tools/Avatar/Input';
import { useUploadImg } from '../../../libs/client/useTools';
import { IUpdateUser, IUserForm } from '../../../types/user';

export const UserAvatar = ({ _data }: IUpdateUser) => {
  const { User, type, update, theme, loading, setLoading } = _data;
  const {
    watch,
    reset,
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({ mode: 'onSubmit' });

  const avatar = watch('avatar');
  const [preview, setPreview] = useState('');
  const [delAvatar, setDelAvatar] = useState(false);
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [setPreview, avatar]);
  //
  const onValid = async ({ avatar }: IUserForm) => {
    if (loading) return;
    setLoading(true);
    const avatar_id = await useUploadImg(avatar);
    if (delAvatar) {
      return update({ avatar: null });
    }
    return update({ avatar: avatar_id });
  };
  //
  const userAvatar = !delAvatar ? User?.avatar : null;
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
              avatar: userAvatar,
            }}
          />
          <BtnWrap>
            {!delAvatar && (
              <Btn
                type="button"
                item={{ theme, name: 'Delete' }}
                onClick={() => setDelAvatar(true)}
              />
            )}
            {delAvatar && (
              <Btn
                type="button"
                item={{ theme, name: 'Back' }}
                onClick={() => setDelAvatar(false)}
              />
            )}
            <Btn item={{ theme, name: 'Save' }} type="submit" />
          </BtnWrap>
        </Cont>
      )}
    </>
  );
};
const Cont = styled(Form)`
  width: 100%;
  .btn_wrap {
    button {
      width: fit-content;
    }
  }
`;
