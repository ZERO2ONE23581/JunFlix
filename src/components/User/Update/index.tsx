import { Title } from './Title';
import { UpdateInfo } from './Info';
import { UpdateEmail } from './Email';
import { DeleteUser } from '../Delete';
import { useRouter } from 'next/router';
import { UpdateAvatar } from './Avatar';
import { UpdatePassword } from './Password';
import { useEffect, useState } from 'react';
import { IRes } from '../../../types/global';
import { Box } from '../../../../styles/global';
import { ITheme } from '../../../../styles/theme';
import { MsgModal } from '../../../Tools/msg_modal';
import { useUser } from '../../../libs/client/useUser';
import useMutation from '../../../libs/client/useMutation';
import { LoadingModal } from '../../../Tools/Modal/loading_modal';
import styled from '@emotion/styled';

interface IUpdateUser extends ITheme {
  type: string;
}
export const UpdateBox = ({ type, theme }: IUpdateUser) => {
  const router = useRouter();
  const { loggedInUser: User } = useUser();
  const { user_id } = router.query;
  const [api, setApi] = useState('');
  const [msg, setMsg] = useState('');
  const [Loading, setLoading] = useState(false);
  const [update, { loading, data }] = useMutation<IRes>(api && api);
  const _data = { User, loading, setLoading, type, update, theme };

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
          if (data.error) setMsg(data.error);
          if (data.msg) setMsg(data.msg);
        }
        if (data.ok) {
          setMsg('update_user');
          if (type === 'delete') return router.replace(`/home`);
          setTimeout(() => {
            router.reload();
          }, 1000);
        }
      }, 1000);
    }
  }, [data, type, router, setMsg, setLoading]);
  const [delAcct, setDelAcct] = useState(false);
  const __delUser = { ..._data, delAcct, setDelAcct };
  return (
    <>
      {!Loading && (
        <Cont className={type}>
          <Title _data={{ theme, type, delAcct, setDelAcct }} />
          <UpdateEmail _data={_data} />
          <UpdatePassword _data={_data} />
          <UpdateInfo _data={_data} />
          <UpdateAvatar _data={_data} />
          <DeleteUser _data={__delUser} />
        </Cont>
      )}
      <MsgModal _data={{ msg, theme, layoutId: 'user_setting' }} />
      {Loading && <LoadingModal theme={theme} />}
    </>
  );
};
const Cont = styled(Box)``;
