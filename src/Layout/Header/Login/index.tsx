import { useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { AvatarModal } from './Avatar/Modal';
import { Avatar } from '../../../Tools/Avatar';
import { Flex } from '../../../../styles/global';
import { ITheme } from '../../../../styles/theme';
import { useUser } from '../../../libs/client/useUser';
import { useCapLetter } from '../../../libs/client/useTools';
import { colorVar, hoverScale } from '../../../../styles/variants';

export const LoginMenu = ({ theme }: ITheme) => {
  const router = useRouter();
  const array = ['join', 'login'];
  const [modal, setModal] = useState(false);
  const handleClick = () => setModal((p) => !p);
  const { isLoggedIn, user_id: host_id } = useUser();
  const textVar = { ...colorVar, ...hoverScale };
  const onClick = (type: string) => router.push(`/${type}`);
  return (
    <>
      {isLoggedIn && (
        <Cont>
          <Avatar
            _data={{ theme, host_id, size: '3rem', isOther: true, handleClick }}
          />
          <AvatarModal _data={{ modal, setModal, theme }} />
        </Cont>
      )}
      {!isLoggedIn && (
        <UnLogged>
          {array.map((item) => (
            <Txt
              custom={theme}
              variants={textVar}
              key={array.indexOf(item)}
              onClick={() => onClick(item)}
              exit="exit"
              initial="initial"
              animate="animate"
              whileHover="hover"
            >
              {useCapLetter(item)}
            </Txt>
          ))}
        </UnLogged>
      )}
    </>
  );
};
const Cont = styled(Flex)`
  margin-left: 1rem;
  position: relative;
  .avatar {
    margin: 0.5rem 0;
  }
`;
const UnLogged = styled(Flex)`
  gap: 4rem;
  height: 4rem;
`;
const Txt = styled(Flex)`
  cursor: pointer;
`;
