import styled from '@emotion/styled';
import { ITheme } from '../../../styles/theme';
import { Flex, FlexCol } from '../../../styles/global';
import { color, hoverVars } from '../../../styles/variants';
import { useRouter } from 'next/router';

export const FindUser = ({ theme }: ITheme) => {
  const router = useRouter();
  const array = ['id', 'pw', 'join'];
  const setTxt = (type: string) => {
    if (type) {
      if (type === 'id') return { kor: '아이디 찾기', eng: 'Find ID' };
      if (type === 'pw') return { kor: '비밀번호 찾기', eng: 'Find Password' };
      if (type === 'join') return { kor: '회원가입', eng: 'Register' };
    }
  };
  const onClick = (type: string) => {
    if (type) {
      if (type === 'join') return router.push('/join');
      else return router.push(`/user/find/${type}`);
    }
  };
  return (
    <>
      <Cont>
        {array.map((element) => (
          <>
            <Txt
              custom={theme}
              animate="animate"
              whileHover="hover"
              variants={hoverVars}
              key={array.indexOf(element)}
            >
              <span onClick={() => onClick(element)} className="kor">
                {setTxt(element)?.kor}
              </span>
              <span onClick={() => onClick(element)} className="eng">
                {setTxt(element)?.eng}
              </span>
            </Txt>
            {element !== 'join' && <span className="bar">|</span>}
          </>
        ))}
      </Cont>
    </>
  );
};

const Cont = styled(Flex)`
  gap: 1.2rem;
  min-width: 430px;
  margin-top: 1rem;
  width: fit-content;
  //border: 2px solid crimson;
`;
const Txt = styled(FlexCol)`
  gap: 0.2rem;
  cursor: pointer;
  width: fit-content;
  justify-content: center;
  //border: 2px solid blue;
  .eng {
    font-size: 1.1rem;
  }
  .kor {
    font-size: 1rem;
  }
`;
