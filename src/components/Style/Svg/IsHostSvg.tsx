import styled from '@emotion/styled';
import { SVGPATH } from '.';
import useUser from '../../../libs/client/useUser';

interface IIsMyIconProps {
  USERID: number;
  property: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
    size?: number;
  };
}
export const IsHostSvg = ({ USERID, property }: IIsMyIconProps) => {
  const VIEWBOX = '0 0 512 512';
  const XMLNS = 'http://www.w3.org/2000/svg';
  const { isLoggedIn, loggedInUser } = useUser();
  const isHost = Boolean(isLoggedIn && loggedInUser?.id === USERID);
  return (
    <>
      {isHost && (
        <Cont prop={property}>
          <svg xmlns={XMLNS} viewBox={VIEWBOX}>
            <path d={SVGPATH('host', true)} />
          </svg>
        </Cont>
      )}
    </>
  );
};
const Cont = styled.article<{
  prop: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
    size?: number;
  };
}>`
  position: absolute;
  top: ${(p) => p.prop?.top && `${p.prop?.top}px`};
  left: ${(p) => p.prop?.left && `${p.prop?.left}px`};
  right: ${(p) => p.prop?.right && `${p.prop?.right}px`};
  bottom: ${(p) => p.prop?.bottom && `${p.prop?.bottom}px`};
  svg {
    fill: #2ecc71;
    width: ${(p) => p.prop?.size && `${p.prop?.size}px`};
    height: ${(p) => p.prop?.size && `${p.prop?.size}px`};
  }
`;
