import styled from '@emotion/styled';

interface IFollowSvgProps {
  onClick?: () => void;
  size: number;
  isFollowing: boolean;
  position: { right?: number; left?: number; top?: number; bottom?: number };
}

export const FollowSvg = ({
  size,
  position,
  onClick,
  isFollowing,
}: IFollowSvgProps) => {
  const XMLNS = 'http://www.w3.org/2000/svg';
  const VIEWBOX = isFollowing ? '0 0 512 512' : '0 0 448 512';
  const PATH = isFollowing
    ? 'M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z'
    : 'M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z';
  return (
    <Cont size={size} position={position}>
      <button onClick={onClick}>
        <svg xmlns={XMLNS} viewBox={VIEWBOX}>
          <path d={PATH} />
        </svg>
      </button>
    </Cont>
  );
};
const Cont = styled.div<{
  size: number;
  position: { right?: number; left?: number; top?: number; bottom?: number };
}>`
  right: 10px;
  bottom: 120px;
  top: ${(p) => p.position.top && `${p.position.top}px`};
  left: ${(p) => p.position.left && `${p.position.left}px`};
  right: ${(p) => p.position.right && `${p.position.right}px`};
  bottom: ${(p) => p.position.bottom && `${p.position.bottom}px`};
  position: absolute;
  button {
    border: none;
    background: none;
    svg {
      width: ${(p) => p.size && `${p.size}px`};
      height: ${(p) => p.size && `${p.size}px`};
      fill: ${(p) => p.theme.color.font};
    }
  }
`;
