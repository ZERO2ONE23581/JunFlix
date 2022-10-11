import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Svg } from '../../../../Tools/Svg';
import { ITheme } from '../../../../../styles/theme';
import useUser from '../../../../libs/client/useUser';
import { ListHover, SpringTrans } from '../../../../../styles/variants';

export const ListWrap = ({ theme }: ITheme) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const onClick = (type: string) => {
    if (type === 'logout') return router.push(`/api/user/logout`);
    if (type === 'dash')
      return router.push(
        `/user/${loggedInUser?.id}/${loggedInUser?.username}/dash`
      );
    if (type === 'setting')
      return router.push(`/user/${loggedInUser?.id}/update`);
  };
  return (
    <Cont>
      <List
        whileHover={ListHover}
        transition={SpringTrans}
        onClick={() => onClick('dash')}
      >
        <Svg theme={theme} type="home" size="2rem" />
        <span>
          <span className="eng">My Page</span>
          <span className="kor">마이페이지</span>
        </span>
      </List>

      <List whileHover={ListHover} onClick={() => onClick('setting')}>
        <Svg theme={theme} type="setting" size="2rem" />
        <span>
          <span className="eng">Setting</span>
          <span className="kor">계정설정</span>
        </span>
      </List>

      <List whileHover={ListHover} onClick={() => onClick('logout')}>
        <Svg theme={theme} type="logout" size="2rem" />
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
  //border: 2px solid blue;
  cursor: pointer;
  font-size: 1.1rem;
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
