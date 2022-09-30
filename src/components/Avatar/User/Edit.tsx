import styled from '@emotion/styled';
import { Btn } from '../../Tools/Button';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Label, ProfileAvatar } from '../Profile';
import useMutation from '../../../libs/client/useMutation';
import useUser from '../../../libs/client/useUser';
import { LoadingModal } from '../../Tools/Modal/Loading';
import { IUserForm } from '../../../types/user';
import { IData } from '../../../types/global';
import { UserBox } from '../../User/Update/UserId';
import { Svg } from '../../Tools/Svg';
import { Answer } from '../../Tools/Modal/Answer';

export const EditUserAvatar = () => {
  const { loggedInUser } = useUser();
  const [EditAvatar, { loading, data }] = useMutation<IData>(
    `/api/user/${loggedInUser?.id}/edit/avatar`
  );
  const { watch, register, handleSubmit } = useForm<IUserForm>({
    mode: 'onSubmit',
  });

  const avatar = watch('avatar');
  const [preview, setPreview] = useState('');
  const [avatarLoading, setAvatarLoading] = useState(false);
  const Loading = avatarLoading ? avatarLoading : loading ? loading : false;
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [avatar]);

  const onValid = async ({ avatar }: IUserForm) => {
    if (loading) return;
    setAvatarLoading((p) => !p);
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
      EditAvatar({ avatar: id });
    }
    setAvatarLoading((p) => !p);
  };
  useEffect(() => {
    if (data?.error) alert(data?.error);
    if (data?.ok) alert(`프로필 사진을 업데이트 했습니다.`);
  }, [avatar, data]);
  const [answer, setAnswer] = useState(false);
  return (
    <>
      {!Loading && (
        <form onSubmit={handleSubmit(onValid)}>
          <Cont className="avatar">
            <h1>
              <span>AVATAR</span>
              <span className="small">(아바타)</span>
              <Svg
                size="2rem"
                type="question"
                onClick={() => setAnswer(true)}
              />
            </h1>
            <Label>
              <ProfileAvatar
                size="8rem"
                preview={preview}
                avatar={loggedInUser?.avatar}
              />
              <input
                {...register('avatar', {
                  required: '프로필 사진 파일을 업로드해주세요.',
                })}
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
              />
            </Label>
            <Btn name="Edit" type="submit" />
          </Cont>
        </form>
      )}
      {Loading && <LoadingModal zIndex={100} type="update" />}
      {answer && <Answer type="edit-user-avatar" closeModal={setAnswer} />}
    </>
  );
};
const Cont = styled(UserBox)`
  align-items: center;
  justify-content: center;
  .profile-avatar {
    .profile {
      pointer-events: all;
    }
  }
`;
