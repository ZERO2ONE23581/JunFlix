import styled from '@emotion/styled';
import { Svg } from '../../../../Tools/Svg';
import { Btn } from '../../../../Tools/Button';
import { Flex, Layer_ } from '../../../../../styles/global';
import { useResponsive } from '../../../../libs/client/useTools';

interface ILayer {
  _data: {
    theme: boolean;
    isCreate: boolean;
    clickQuick: () => void;
  };
}
export const Layer = ({ _data }: ILayer) => {
  const theme = _data?.theme!;
  const isCreate = _data?.isCreate!;
  const onClick = _data?.clickQuick!;
  const { isDesk } = useResponsive();
  return (
    <Cont className="layer" isDesk={isDesk}>
      <Flex>
        {!isCreate && <Svg theme={theme} type="left-chev" onClick={onClick} />}
      </Flex>
      <Flex>
        <h1>Select Board</h1>
      </Flex>
      <Flex>
        {isCreate && (
          <Btn type="button" onClick={onClick} item={{ theme, name: 'Skip' }} />
        )}
      </Flex>
    </Cont>
  );
};
const Cont = styled(Layer_)`
  > div {
    h1 {
      ${(p) => (p.isDesk ? '1rem' : '2rem')}
    }
  }
`;
