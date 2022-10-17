import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Flex, Page } from '../../styles/global';
import { ITheme } from '../../styles/theme';
import { variants } from '../../styles/variants';

export const Footer = ({ theme }: ITheme) => {
  const date = new Date();
  const currentYear = date.getFullYear();
  return (
    <Cont className="footer">
      <Flex className="flex">
        <h1>Junflix.com</h1>
        <CopyRight>
          <span>&copy;</span>
          <span>{currentYear !== 2022 && '2022 -'}</span>
          <span>{currentYear}</span>
          <span>Junflix.</span>
          <span>All Rights Reserved.</span>
        </CopyRight>
      </Flex>
    </Cont>
  );
};

const Cont = styled(motion.footer)`
  margin-top: 100px;
  padding: 20px;
  font-size: 1.3rem;
  background-color: #636e72;
  .flex {
    justify-content: flex-end;
  }
`;
const CopyRight = styled.article`
  font-style: italic;
  span {
    margin-right: 3px;
  }
`;
