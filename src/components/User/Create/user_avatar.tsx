import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Btn } from '../../../Tools/Button';
import { ICreateUser, IUserForm } from '../../../types/user';
import { ImageLabel, BtnWrap, Form } from '../../../../styles/global';
import { Avatar } from '../../../Tools/Avatar/indexxx';

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
  const error = errors.avatar?.msg;
  return (
    <>
      {isType && (
        <Cont onSubmit={handleSubmit(onValid)}>
          <ImageLabel htmlFor="avatar">
            <Avatar _data={{ theme, size: '10rem', preview, host_id: null }} />
            <input
              {...register('avatar', {
                required: '프로필 사진 파일을 업로드해주세요.',
              })}
              id="avatar"
              name="avatar"
              type="file"
              accept="image/*"
            />
          </ImageLabel>
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
              item={{ theme, name: 'skip' }}
              type="button"
              onClick={() => router.replace('/login')}
            />
            <Btn item={{ theme, name: 'Save' }} type="submit" />
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
