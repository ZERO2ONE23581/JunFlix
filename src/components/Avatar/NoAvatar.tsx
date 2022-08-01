import styled from '@emotion/styled';
import { Svg } from '../Tools/Svg';

interface INoAvatar {
  genre?: string;
  avatar: string;
}
export const NoAvatar = ({ genre, avatar }: INoAvatar) => {
  return (
    <>
      <Cont isAvatar={Boolean(avatar)}>
        <Svg size="2rem" type={genre!} />
      </Cont>
    </>
  );
};
const Cont = styled.div<{ isAvatar: boolean }>`
  display: ${(p) => p.isAvatar && 'none'};
  svg {
    top: 50%;
    left: 50%;
    opacity: 0.9;
    position: absolute;
    fill: ${(p) => p.theme.color.bg};
    transform: translate(-50%, -50%);
  }
`;
