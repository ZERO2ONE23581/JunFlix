import { useForm } from 'react-hook-form';
import { Btn } from '../../../Tools/Button';
import { IUserForm } from '../../../types/user';
import { ITheme } from '../../../../styles/theme';
import { ErrMsg, InputWrap } from '../../../Tools/Input';
import useUser from '../../../libs/client/useUser';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Flex } from '../../../../styles/global';
import styled from '@emotion/styled';
import { ErrModal } from '../../../Tools/errorModal';
import { Answer } from '../../../Tools/Modal/Answer';
import { Label, ProfileAvatar } from '../../Avatar/profile';
import { inputErrVar } from '../../../../styles/variants';
import { useRouter } from 'next/router';

interface IPasswordForm extends ITheme {
  loading: boolean;
  update: ({}) => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
export const Edit_UserAvatar = ({
  theme,
  update,
  loading,
  setLoading,
}: IPasswordForm) => {
  const { loggedInUser } = useUser();
  const userId = loggedInUser?.userId;
  const {
    watch,
    register,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({ mode: 'onSubmit' });
  //
  const router = useRouter();
  const avatar = watch('avatar');
  const [preview, setPreview] = useState('');
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [avatar, setPreview]);
  //
  const onValid = async ({ avatar }: IUserForm) => {
    if (loading) return;
    setLoading(true);
    if (!loggedInUser?.id) return router.replace('/user/login');
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
      update({ avatar: id });
    }
  };
  //
  return (
    <Cont onSubmit={handleSubmit(onValid)}>
      <Label htmlFor="avatar">
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
      </Label>
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
  );
};
const Cont = styled.form`
  //  border: 2px solid yellow;
  gap: 15px;
  width: 50%;
  margin: 0 auto;
`;
