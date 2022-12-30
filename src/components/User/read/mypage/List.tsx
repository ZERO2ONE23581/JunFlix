import styled from '@emotion/styled';
import { Svg } from '../../../../Tools/Svg';
import { Flex } from '../../../../../styles/global';
import { hoverBgColor } from '../../../../../styles/variants';
import { useResponsive } from '../../../../libs/client/useTools';

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
  const { isDesk } = useResponsive();
  const size = isDesk ? '1.5rem' : '3rem';
  const { svg, name, theme, hidden, onClick } = _data;
  return (
    <Cont
      custom={theme}
      hidden={hidden}
      className="list"
      animate="aniamte"
      onClick={onClick}
      whileHover="hover"
      variants={hoverBgColor}
    >
      <Flex className="txt">
        <span>{name?.eng}</span>
        <span className="kor">{name?.kor}</span>
      </Flex>
      <Svg type={svg!} theme={theme} item={{ size }} />
    </Cont>
  );
};
const Cont = styled(Flex)`
  width: 100%;
  justify-content: center;
  > .txt {
    gap: 1rem;
    padding-left: 1rem;
    justify-content: flex-start;
  }
`;
