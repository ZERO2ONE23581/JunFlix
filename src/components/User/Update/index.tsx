import { useRouter } from 'next/router';
import { IRes } from '../../../types/global';
import { Box } from '../../../../styles/global';
import { BoxTitle } from '../../../Tools/box_title';
import { ITheme } from '../../../../styles/theme';
import { useEffect, useState } from 'react';
import { UserId_Form } from './userId';
import { Password_Form } from './password';
import { UserInfo_Form } from './userInfo';
import { UserAvatar_Form } from './avatar';
import { MessageModal } from '../../../Tools/msg_modal';
import { LoadingModal } from '../../../Tools/Modal/loading';
import useMutation from '../../../libs/client/useMutation';
import { DeleteUser_Form } from '../delete';

interface IUpdateUser extends ITheme {
  type: string;
}
export const UpdateBox = ({ type, theme }: IUpdateUser) => {
  const router = useRouter();
  const { user_id } = router.query;
  const [api, setApi] = useState('');
  const [message, setMessage] = useState('');
  const [Loading, setLoading] = useState(false);
  const [post, { loading, data }] = useMutation<IRes>(api && api);

  useEffect(() => {
    if (type && user_id) {
      if (type === 'delete') setApi(`/api/user/${user_id}/delete`);
      else setApi(`/api/user/${user_id}/update/${type}`);
    }
  }, [setApi, type, user_id]);

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
        if (!data.ok) {
          if (data.error) setMessage(data.error);
          if (data.message) setMessage(data.message);
        }
        if (data.ok) {
          setMessage('업데이트 완료 (Update completed)');
          if (type === 'delete') return router.replace(`/home`);
          setTimeout(() => {
            router.reload();
          }, 1000);
        }
      }, 1000);
    }
  }, [data, type, router, setMessage, setLoading]);
  //
  const dataWrap = { loading, setLoading, type, post, theme };
  return (
    <>
      {!Loading && (
        <>
          <Box className={type}>
            <BoxTitle type={`update-user-${type}`} theme={theme} />
            <UserId_Form dataWrap={{ ...dataWrap }} />
            <Password_Form dataWrap={{ ...dataWrap }} />
            <UserInfo_Form dataWrap={{ ...dataWrap }} />
            <UserAvatar_Form dataWrap={{ ...dataWrap }} />
            <DeleteUser_Form dataWrap={{ ...dataWrap }} />
          </Box>
          <MessageModal
            theme={theme}
            message={message}
            setMessage={setMessage}
          />
        </>
      )}
      {Loading && <LoadingModal theme={theme} />}
    </>
  );
};
