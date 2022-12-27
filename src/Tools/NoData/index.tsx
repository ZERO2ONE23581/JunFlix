import { Btn } from '../Button';
import styled from '@emotion/styled';
import { FlexCol } from '../../../styles/global';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { noneBorderVar } from '../../../styles/variants';
import { useResponsive } from '../../libs/client/useTools';

interface IUserContent {
  _data: {
    type: string;
    isMy: boolean;
    theme: boolean;
    onClick?: () => void;
  };
}
export const NoData = ({ _data }: IUserContent) => {
  const [btn, setBtn] = useState('');
  const { theme, type, isMy, onClick } = _data;
  const [txt, setTxt] = useState({ kor: '', eng: '' });
  const [sub, setSub] = useState({ kor: '', eng: '' });
  useEffect(() => {
    if (type === 'saved') {
      setTxt({ eng: 'No saved boards.', kor: '저장된 보드가 없습니다.' });
      if (isMy) {
        setBtn('All Boards');
        setSub({
          eng: 'Click the button to see Boards.',
          kor: '아래 버튼을 눌러 보드를 둘러봅니다.',
        });
      }
    }
    if (type === 'likes') {
      setTxt({
        eng: 'No liked posts.',
        kor: '좋아요를 누른 포스트가 없습니다.',
      });
      if (isMy) {
        setBtn('All Posts');
        setSub({
          eng: 'Click the button to see Posts.',
          kor: '아래 버튼을 눌러 포스트를 둘러봅니다.',
        });
      }
    }
    if (type === 'post' || type === 'board_post') {
      setTxt({
        eng: 'No posts created.',
        kor: '생성된 포스트가 없습니다.',
      });
      if (isMy) {
        setBtn('Create Post');
        setSub({
          eng: 'Click the button to create Post.',
          kor: '아래 버튼을 눌러 포스트를 생성합니다.',
        });
      }
    }
    if (type === 'board') {
      setTxt({
        eng: 'No boards created.',
        kor: '생성된 보드가 없습니다',
      });
      setBtn('Create Board');
      setSub({
        eng: 'Click the button to create Board.',
        kor: '아래 버튼을 눌러 보드를 생성합니다.',
      });
    }
  }, [type, setTxt, setSub, isMy, setBtn]);
  const { isDesk } = useResponsive();
  return (
    <AnimatePresence>
      <Container isDesk={isDesk}>
        <Cont
          custom={theme}
          variants={noneBorderVar}
          exit="exit"
          initial="initial"
          animate="animate"
          className="cont"
        >
          <span className="main">
            <span>{txt.eng}</span>
            <span className="kor">{txt.kor}</span>
          </span>
          {isMy && (
            <>
              <span className="sub">
                <span>{sub.eng}</span>
                <span className="kor">{sub.kor}</span>
              </span>
              <Btn
                type="button"
                onClick={onClick}
                item={{ theme, name: btn.toUpperCase() }}
              />
            </>
          )}
        </Cont>
      </Container>
    </AnimatePresence>
  );
};
const Container = styled.article<{ isDesk: boolean }>`
  .cont {
    font-size: ${(p) => (p.isDesk ? '1.5rem' : '3rem')};
    .kor {
      font-size: 1.3rem;
      font-size: ${(p) => (p.isDesk ? '1.3rem' : '2.7rem')};
    }
    button {
      font-size: ${(p) => (p.isDesk ? '1.3rem' : '2.5rem')};
    }
  }
`;
const Cont = styled(FlexCol)`
  gap: 0.5rem;
  min-width: 660px;
  margin: 1rem auto;
  padding: 1rem 2rem;
  justify-content: center;
  > .main,
  > .sub {
    span {
      display: block;
      text-align: center;
      //line-height: 1.8rem;
    }
  }
  button {
    font-weight: 600;
    margin-top: 1rem;
    width: fit-content;
    padding: 0.7rem 1rem;
  }
`;
