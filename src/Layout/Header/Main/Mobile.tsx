import { Modal } from './Modal';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Svg } from '../../../Tools/Svg';
import { Dispatch, SetStateAction } from 'react';
import { Flex } from '../../../../styles/global';
import { IResponsive } from '../../../types/global';
import { colorVar, hoverScale } from '../../../../styles/variants';

interface IMobile extends IResponsive {
  _data: {
    array: string[];
    onClick: (txt: string) => void;
    isModal: (type: string) => boolean;
  };
  _set: {
    selected: string;
    setSelected: Dispatch<SetStateAction<string>>;
  };
}
export const Mobile = ({ _data, _set, _res }: IMobile) => {
  const router = useRouter();
  const { theme, isMobile, isDesk } = _res;
  const { array, onClick, isModal } = _data;
  const textVar = { ...colorVar, ...hoverScale };
  const setSvg = (type: string) => {
    if (type === 'user') return 'crown';
    if (type === 'board') return 'clapper';
    else return type;
  };
  const onSvg = (type: string) => {
    if (type === 'home') router.push('/');
  };
  return (
    <>
      {isMobile && (
        <Cont>
          {array.map((item) => (
            <Array key={array.indexOf(item)}>
              <Txt
                exit="exit"
                initial="initial"
                animate="animate"
                whileHover="hover"
                custom={theme}
                variants={textVar}
                onClick={() => onClick(item)}
              >
                <Svg
                  theme={theme}
                  type={setSvg(item)}
                  item={{ size: '5rem' }}
                  onClick={() => onSvg(item)}
                />
              </Txt>
              <Modal _data={{ ..._set, theme, isModal: isModal(item) }} />
            </Array>
          ))}
        </Cont>
      )}
    </>
  );
};
const Cont = styled(Flex)`
  bottom: 0;
  gap: 1rem;
  padding: 2rem;
  position: fixed;
  font-size: 2rem;
  background-color: inherit;
  justify-content: space-around;
`;
const Txt = styled(Flex)`
  cursor: pointer;
`;
const Array = styled(Flex)`
  position: relative;
  width: fit-content;
`;
