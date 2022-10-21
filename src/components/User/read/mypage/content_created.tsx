import { useState } from 'react';
import styled from '@emotion/styled';
import { ClickedContent } from './content_created_selected';
import { useCapLetter } from '../../../../libs/client/useTools';
import { myboxVar, TweenTrans } from '../../../../../styles/variants';
import { Flex, FlexCol, Grid } from '../../../../../styles/global';
import { AnimatePresence } from 'framer-motion';

export const Created = ({ open, theme }: any) => {
  const array = ['board', 'post', 'review'];
  const [clicked, setClicked] = useState('');
  return (
    <AnimatePresence>
      <>
        {open && !clicked && (
          <TypeGrid className="my-created" size={array.length}>
            {array.map((type) => (
              <MyBox
                exit="exit"
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="my-box"
                custom={theme}
                variants={myboxVar}
                key={array.indexOf(type)}
                transition={TweenTrans}
                onClick={() => setClicked(type)}
              >
                <img src="/img/1.jpg" alt="test" />
                <Info>
                  <h2>{`All ${useCapLetter(type)}`}</h2>
                </Info>
              </MyBox>
            ))}
          </TypeGrid>
        )}
        <ClickedContent
          theme={theme}
          clicked={open && clicked}
          clickBack={() => setClicked('')}
        />
      </>
    </AnimatePresence>
  );
};
const TypeGrid = styled(Grid)`
  gap: 2rem;
  width: 60vw;
  padding: 20px;
  min-width: 800px;
  border: 10px solid blueviolet;
`;
const MyBox = styled(FlexCol)`
  gap: 0;
  height: 100%;
  cursor: pointer;
  overflow: hidden;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  img {
    width: 100%;
    height: 100%;
  }
`;
const Info = styled(Flex)`
  padding: 20px;
  h2 {
    font-weight: 400;
    font-size: 1.4rem;
  }
`;
