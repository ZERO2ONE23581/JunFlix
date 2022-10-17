import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { hoverBgColor } from '../../../../../styles/variants';

interface IList {
  name: string;
  theme: boolean;
  hidden?: boolean;
  onClick: (type: any) => void;
}
export const List = ({ theme, hidden, name, onClick }: IList) => {
  return (
    <Container
      className="list"
      animate="aniamte"
      whileHover="hover"
      custom={theme}
      hidden={hidden}
      onClick={onClick}
      variants={hoverBgColor}
    >
      <span>{name}</span>
    </Container>
  );
};
const Container = styled(motion.li)<{ hidden?: boolean }>`
  display: ${(p) => p.hidden && 'none'};
`;
