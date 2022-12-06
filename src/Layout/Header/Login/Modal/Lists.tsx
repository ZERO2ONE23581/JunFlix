import { useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Svg } from '../../../../Tools/Svg';
import { ITheme } from '../../../../../styles/theme';
import { useUser } from '../../../../libs/client/useUser';
import useMutation from '../../../../libs/client/useMutation';
import { hoverBgColor, SpringTrans } from '../../../../../styles/variants';

export const Lists = ({ theme }: ITheme) => {
  const router = useRouter();
  const { user_id, userId } = useUser();
  const [logout, { data }] = useMutation(`/api/exit`);
  const onClick = (type: string) => {
    if (type === 'logout') return logout({});
    if (type === 'mypage')
      return router.push(`/user/${user_id}/${userId}/page`);
    if (type === 'setting')
      return router.push(`/user/${user_id}/${userId}/setting`);
  };
  useEffect(() => {
    if (data && data.ok) router.reload();
  }, [data, router]);
  return (
    <Cont>
      <List
        whileHover={'hover'}
        variants={hoverBgColor}
        transition={SpringTrans}
        onClick={() => onClick('mypage')}
      >
        <Svg theme={theme} type="home" />
        <span>
          <span className="eng">My Page</span>
          <span className="kor">마이페이지</span>
        </span>
      </List>

      <List
        whileHover={'hover'}
        variants={hoverBgColor}
        onClick={() => onClick('setting')}
      >
        <Svg theme={theme} type="setting" />
        <span>
          <span className="eng">Setting</span>
          <span className="kor">계정설정</span>
        </span>
      </List>

      <List
        whileHover={'hover'}
        variants={hoverBgColor}
        onClick={() => onClick('logout')}
      >
        <Svg theme={theme} type="logout" />
        <span>
          <span className="eng">Log Out</span>
          <span className="kor">로그아웃</span>
        </span>
      </List>
    </Cont>
  );
};
const Cont = styled.ul`
  width: 180px;
  padding: 5px 0;
`;
const List = styled(motion.li)`
  font-size: 1rem;
  cursor: pointer;
  padding: 3px 20px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > span {
    span {
      :nth-of-type(1) {
        //border: 2px solid yellow;
        margin-bottom: 3px;
      }
      display: block;
      text-align: center;
    }
  }
  svg {
    pointer-events: none;
  }
`;
