import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { UserAvatar } from '../../../Tools/Avatar';
import { useEffect, useState } from 'react';
import { Btn } from '../../../Tools/Button';
import { ErrMsg } from '../../../Tools/Input';
import { inputErrVar } from '../../../../styles/variants';
import { ICreateUser, IUserForm } from '../../../types/user';
import { AvatarLabel, BtnWrap, Form } from '../../../../styles/global';

export const CreateUserAvatar = ({ wrap, isType }: ICreateUser) => {
  const router = useRouter();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({
    mode: 'onSubmit',
  });
  const [preview, setPreview] = useState('');
  useEffect(() => {
    const avatar = watch('avatar');
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [watch('avatar'), setPreview]);

  const onValid = async ({ avatar }: IUserForm) => {
    wrap.setLoading(true);
    if (wrap.loading) return;
    const user_id = wrap.id?.user_id;
    if (avatar && avatar.length > 0 && user_id) {
      const { uploadURL } = await (await fetch(`/api/file`)).json();
      const form = new FormData();
      form.append('file', avatar[0], user_id.toString());
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: 'POST',
          body: form,
        })
      ).json();
      wrap.post({ avatar: id, user_id });
    }
  };
  //
  const theme = wrap.theme;
  const error = errors.avatar?.message;
  return (
    <>
      {isType && (
        <Cont onSubmit={handleSubmit(onValid)}>
          <AvatarLabel htmlFor="avatar">
            <UserAvatar theme={theme} info={{ size: '10rem', preview }} />
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
          {error && (
            <ErrMsg
              exit="exit"
              initial="initial"
              animate="animate"
              custom={theme}
              className="err-msg"
              variants={inputErrVar}
            >
              {error}
            </ErrMsg>
          )}
          <BtnWrap className="btn-wrap">
            <Btn
              name="Skip"
              type="button"
              theme={theme}
              onClick={() => router.replace('/login')}
            />
            <Btn type="submit" name="Save" theme={theme} />
          </BtnWrap>
        </Cont>
      )}
    </>
  );
};
const Cont = styled(Form)`
  gap: 30px;
  .btn-wrap {
    width: 80%;
  }
`;
