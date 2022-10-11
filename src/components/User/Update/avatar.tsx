import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../../Tools/Button';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { ErrMsg } from '../../../Tools/Input';
import useUser from '../../../libs/client/useUser';
import { ProfileAvatar } from '../../../Tools/Avatar/profile';
import { AvatarLabel } from '../../../../styles/global';
import { inputErrVar } from '../../../../styles/variants';
import { IEditUser, IUserForm } from '../../../types/user';

export const UserAvatar_Form = ({ dataWrap }: IEditUser) => {
  const type = dataWrap.type;
  const post = dataWrap.post;
  const theme = dataWrap.theme;
  const loading = dataWrap.loading;
  const setLoading = dataWrap.setLoading;
  const { loggedInUser } = useUser();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({ mode: 'onSubmit' });
  //
  const router = useRouter();
  const [preview, setPreview] = useState('');
  useEffect(() => {
    const avatar = watch('avatar');
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [setPreview]);
  //
  const onValid = async ({ avatar }: IUserForm) => {
    if (loading) return;
    setLoading(true);
    if (!loggedInUser?.id) return router.replace('/login');
    if (avatar && avatar.length > 0 && loggedInUser?.id) {
      const { uploadURL } = await (await fetch(`/api/file`)).json();
      const form = new FormData();
      form.append('file', avatar[0], loggedInUser?.id.toString());
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: 'POST',
          body: form,
        })
      ).json();
      post({ avatar: id });
    }
  };
  //
  return (
    <>
      {type === 'avatar' && (
        <Cont onSubmit={handleSubmit(onValid)}>
          <AvatarLabel htmlFor="avatar">
            <ProfileAvatar
              size="10rem"
              theme={theme}
              type={{ preview: preview, avatar: loggedInUser?.avatar }}
            />
            <input
              {...register('avatar', {
                required: '프로필 사진 파일을 업로드해주세요.',
              })}
              id="avatar"
              name="avatar"
              type="file"
              accept="image/*"
            />
          </AvatarLabel>
          {errors.avatar?.message && (
            <ErrMsg
              exit="exit"
              initial="initial"
              animate="animate"
              custom={theme}
              variants={inputErrVar}
              className="err-msg"
            >
              {errors.avatar?.message}
            </ErrMsg>
          )}
          <Btn type="submit" name="Update" theme={theme} />
        </Cont>
      )}
    </>
  );
};
const Cont = styled.form`
  gap: 15px;
  width: 50%;
  margin: 0 auto;
`;
