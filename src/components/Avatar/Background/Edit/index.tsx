import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../../../styles/btn';
import useUser from '../../../../libs/client/useUser';
import { MutationRes } from '../../../../types/mutation';
import useMutation from '../../../../libs/client/useMutation';

interface IEditAvatarForm {
  avatar?: FileList;
}
export const EditBgAvatar = ({ setPreview, isEditAvatar }: any) => {
  const { loggedInUser } = useUser();
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const [editBoardBg, { data, loading }] = useMutation<MutationRes>(
    `/api/user/${user_id}/board/${board_id}/edit/avatar`
  );
  const { watch, register, handleSubmit } = useForm<IEditAvatarForm>({
    mode: 'onSubmit',
  });
  const avatar = watch('avatar');
  const onValid = async ({ avatar }: IEditAvatarForm) => {
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
      editBoardBg({ avatar: id });
    }
  };
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
    if (data?.ok) return router.reload();
  }, [data, router, avatar]);
  //
  return (
    <>
      {isEditAvatar && (
        <Cont>
          <form onSubmit={handleSubmit(onValid)}>
            <input {...register('avatar')} type="file" name="avatar" />
            <Button>{loading ? 'Loading...' : 'SAVE'}</Button>
          </form>
        </Cont>
      )}
    </>
  );
};
const Cont = styled.article`
  background-color: aliceblue;
  width: 300px;
  height: 100px;
  position: absolute;
  top: 20%;
  left: 30%;
  form {
    input {
      /* display: none; */
    }
  }
`;
const Button = styled(Btn)`
  width: 80px;
  height: 40px;
`;
