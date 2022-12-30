import { useState } from 'react';
import styled from '@emotion/styled';
import { AvatarModal } from './Modal';
import { Avatar } from '../../../../Tools/Avatar';
import { Flex } from '../../../../../styles/global';
import { IResponsive } from '../../../../types/global';
import { useUser } from '../../../../libs/client/useUser';

export const LoginAvatar = ({ _res }: IResponsive) => {
  const { theme, isDesk } = _res;
  const size = isDesk ? '4rem' : '7rem';
  const [modal, setModal] = useState(false);
  const handleClick = () => setModal((p) => !p);
  const { user_id: host_id, isLoggedIn } = useUser();
  return (
    <>
      {isLoggedIn && (
        <Cont>
          <Avatar
            _data={{
              theme,
              host_id,
              size,
              handleClick,
              isOther: true,
            }}
          />
          <AvatarModal _res={_res} _data={{ modal, setModal }} />
        </Cont>
      )}
    </>
  );
};
const Cont = styled(Flex)`
  position: relative;
`;
