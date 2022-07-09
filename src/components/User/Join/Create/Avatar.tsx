import {
  ICreateProfileAvatarProps,
  IProfileAvatarForm,
} from '../../../../types/avatar';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Btn } from '../../../Style/Button';
import { ErrorMsg } from '../../../Style/ErrMsg';
import { MutationRes } from '../../../../types/mutation';
import useMutation from '../../../../libs/client/useMutation';
import { Form, Info, JoinCont } from '../../../../../styles/global';
import { AvatarLabel, ProfileAvatar } from '../../../Avatar/ProfileAvatar';

export const CreateProfileAvatar = ({
  createdID,
}: ICreateProfileAvatarProps) => {
  const router = useRouter();
  const [createAvatar, { loading, data }] = useMutation<MutationRes>(
    '/api/user/create/avatar'
  );
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileAvatarForm>({
    mode: 'onSubmit',
  });
  const avatar = watch('avatar');
  const [avatarLoading, setAvatarLoading] = useState(false);
  const onValid = async ({ avatar }: IProfileAvatarForm) => {
    if (loading) return;
    setAvatarLoading((p) => !p);
    if (!createdID) return router.replace('/login');
    if (avatar && avatar.length > 0 && createdID) {
      const { uploadURL } = await (await fetch(`/api/file`)).json();
      const form = new FormData();
      form.append('file', avatar[0], createdID.toString());
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: 'POST',
          body: form,
        })
      ).json();
      createAvatar({ avatar: id, createdID });
    }
  };
  const [preview, setPreview] = useState('');
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
    if (data?.ok) {
      setAvatarLoading((p) => !p);
      alert(
        `회원가입을 성공적으로 완료하였습니다. 로그인 페이지로 이동합니다.`
      );
      router.replace('/user/login');
    }
  }, [avatar, watch, data, router, setAvatarLoading]);
  return (
    <JoinCont>
      <h1>Profile Avatar</h1>
      <h2>Step 3. 프로필 사진 설정 (선택사항)</h2>
      <Form onSubmit={handleSubmit(onValid)}>
        <AvatarLabel htmlFor="avatar">
          <ProfileAvatar preview={preview} size={130} />
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
        <Info>
          <span>* 샤진을 추가하려면 아이콘을 클릭하세요.</span>
          <span>* 프로필 사진은 추후에 수정 가능합니다.</span>
        </Info>
        {errors.avatar && <ErrorMsg error={errors.avatar.message} />}
        {data?.error && <ErrorMsg error={data.error} />}
        <div className="flex">
          <Btn type="submit" name="사진 저장" loading={avatarLoading} />
          <Btn
            type="button"
            name="나중에 설정"
            onClick={() => router.replace('/user/login')}
          />
        </div>
      </Form>
    </JoinCont>
  );
};
