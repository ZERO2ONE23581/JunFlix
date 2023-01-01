import styled from '@emotion/styled';
import { Svg } from '../../Tools/Svg';
import { useRouter } from 'next/router';
import { Flex } from '../../../styles/global';
import { IResponsive } from '../../types/global';
import { useUser } from '../../libs/client/useUser';
import { useLogout } from '../../libs/client/useLogin';
import { hoverBgColor } from '../../../styles/variants';
import useMutation from '../../libs/client/useMutation';

export const Lists = ({ _res }: IResponsive) => {
  const router = useRouter();
  const { user_id, userId } = useUser();
  const { theme, isMobile, isDesk } = _res;
  const size = isMobile ? '4rem' : '2rem';
  const array = ['mypage', 'setting', 'logout'];
  const [logout, { data }] = useMutation(`/api/exit`);
  useLogout({ data });

  const onClick = (type: string) => {
    if (type === 'logout') return logout({});
    if (type === 'mypage')
      return router.push(`/user/${user_id}/${userId}/page`);
    if (type === 'setting')
      return router.push(`/user/${user_id}/${userId}/setting`);
  };
  const setTxt = (txt: string) => {
    if (txt) {
      if (txt === 'mypage') return { eng: 'MY PAGE', kor: '나의 페이지' };
      if (txt === 'setting') return { eng: 'SETTING', kor: '설정' };
      if (txt === 'logout') return { eng: 'LOG OUT', kor: '로그아웃' };
    }
  };

  return (
    <Cont mobile={isMobile} desk={isDesk}>
      {array.map((item) => (
        <List
          whileHover={'hover'}
          variants={hoverBgColor}
          key={array.indexOf(item)}
          onClick={() => onClick(item)}
        >
          <>
            {item === 'mypage' && (
              <Svg theme={theme} type="home" item={{ size }} />
            )}
            {item === 'setting' && (
              <Svg theme={theme} type="setting" item={{ size }} />
            )}
            {item === 'logout' && (
              <Svg theme={theme} type="logout" item={{ size }} />
            )}
          </>
          <Txt>
            <span>{setTxt(item)?.eng}</span>
            <span className="kor">{setTxt(item)?.kor}</span>
          </Txt>
        </List>
      ))}
    </Cont>
  );
};
const Cont = styled.div<{ mobile: boolean; desk: boolean }>`
  padding: 5px 0;
  width: ${(p) => p.desk && '300px'};
  width: ${(p) => p.mobile && '500px'};
  font-size: ${(p) => p.desk && '1.3rem'};
  font-size: ${(p) => p.mobile && '2.5rem'};
  .kor {
    font-size: ${(p) => p.desk && '1.2rem'};
    font-size: ${(p) => p.mobile && '2.4rem'};
  }
  svg {
    pointer-events: none;
  }
`;
const List = styled(Flex)`
  cursor: pointer;
  padding: 3px 20px;
  margin-bottom: 5px;
  justify-content: space-between;
`;

const Txt = styled(Flex)`
  gap: 0.5rem;
  width: fit-content;
`;
