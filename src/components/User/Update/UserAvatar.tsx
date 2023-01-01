import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Btn } from '../../../Tools/Button';
import { Flex_ } from '../../../../styles/global';
import { AvatarInput } from '../../../Tools/Avatar/Input';
import { IUpdateUser, IUserForm } from '../../../types/user';
import { useResponsive, UseUploadImg } from '../../../libs/client/useTools';

export const UserAvatar = ({ _data }: IUpdateUser) => {
  const { User, type, update, theme, loading, setLoading } = _data;
  const { watch, reset, register, handleSubmit, clearErrors } =
    useForm<IUserForm>({
      mode: 'onSubmit',
    });
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
    const avatar_id = await UseUploadImg(avatar);
    if (delAvatar) {
      return update({ avatar: null });
    }
    return update({ avatar: avatar_id });
  };
  //
  const { isDesk } = useResponsive();
  const userAvatar = !delAvatar ? User?.avatar : null;
  return (
    <>
      {type === 'avatar' && (
        <Cont isDesk={isDesk} onSubmit={handleSubmit(onValid)}>
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
          <Btns isDesk={isDesk}>
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
          </Btns>
        </Cont>
      )}
    </>
  );
};
const Cont = styled.form<{ isDesk: boolean }>`
  width: 100%;
  width: 100%;
  display: flex;
  overflow-y: auto;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  ::-webkit-scrollbar {
    display: none;
  }
  .avatar_input {
    margin-top: 2rem;
    width: ${(p) => (p.isDesk ? '10rem' : '16rem')};
    height: ${(p) => (p.isDesk ? '10rem' : '16rem')};
  }
  .no_preview {
    width: ${(p) => (p.isDesk ? '7rem' : '15rem')};
    height: ${(p) => (p.isDesk ? '7rem' : '15rem')};
  }
`;
const Btns = styled(Flex_)`
  gap: 1rem;
  margin-top: 2rem;
`;
