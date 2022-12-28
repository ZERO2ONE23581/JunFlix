import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Flex } from '../../styles/global';

export const Footer = () => {
  const date = new Date();
  const router = useRouter();
  const thisYear = date.getFullYear();
  const isFoundYear = Boolean(thisYear === 2022);
  const YEAR = isFoundYear ? '2022' : `2022 - ${thisYear}`;
  return (
    <Cont>
      <Flex className="copy">
        <span className="dim">&copy;{YEAR}</span>
        <h1 onClick={() => router.push('/')}>
          <span className="isred">JUNFLIX</span>
          <span className="dim">.</span>
        </h1>
        <span className="dim">All Rights Reserved.</span>
      </Flex>
    </Cont>
  );
};

const Cont = styled(motion.footer)`
  display: flex;
  padding: 1rem;
  font-size: 1.2rem;
  justify-content: flex-end;
  > .copy {
    gap: 0.2rem;
    font-style: italic;
    width: fit-content;
  }
  .isred {
    font-weight: 800;
    color: ${(p) => p.theme.color.logo};
  }
  h1 {
    margin: 0 0.2rem;
    cursor: pointer;
    display: inline-block;
  }
  .dim {
    opacity: 0.8;
  }
`;
