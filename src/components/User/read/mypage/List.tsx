import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { hoverBgColor } from '../../../../../styles/variants';
import { Svg } from '../../../../Tools/Svg';

interface IList {
  _data: {
    svg?: string;
    theme: boolean;
    hidden?: boolean;
    onClick: (type: any) => void;
    name: { kor: string; eng: string };
  };
}
export const List = ({ _data }: IList) => {
  const svg = _data?.svg!;
  const name = _data?.name!;
  const theme = _data?.theme!;
  const hidden = _data?.hidden!;
  const onClick = _data?.onClick!;
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
      <span className="name">
        <span>{name?.eng}</span>
        <span>{name?.kor}</span>
      </span>
      {svg && (
        <span>
          <Svg type={svg!} theme={theme} item={{ size: '1.5rem' }} />
        </span>
      )}
    </Container>
  );
};
const Container = styled(motion.li)<{ hidden?: boolean }>`
  display: ${(p) => p.hidden && 'none'};
  .name {
    span {
      margin-right: 0.5rem;
      :nth-of-type(2) {
        font-size: 0.9rem;
      }
    }
  }
`;
