import { useState } from 'react';
import styled from '@emotion/styled';
import { IconModal } from './Login/Modal';
import { Avatar } from '../../Tools/Avatar';
import { Flex } from '../../../styles/global';
import { ITheme } from '../../../styles/theme';
import { useUser } from '../../libs/client/useUser';

export const IsLogged = ({ theme }: ITheme) => {
  const [modal, setModal] = useState(false);
  const handleClick = () => setModal((p) => !p);
  const { isLoggedIn, user_id: host_id } = useUser();
  return (
    <>
      {isLoggedIn && (
        <Cont>
          <Avatar
            _data={{ theme, host_id, size: '3rem', isOther: true, handleClick }}
          />
          <IconModal modal={modal} setModal={setModal} theme={theme} />
        </Cont>
      )}
    </>
  );
};
const Cont = styled(Flex)`
  margin-left: 2rem;
  position: relative;
  .avatar {
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
  }
`;
