import { Modal } from './Modal';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Flex } from '../../../../styles/global';
import { useCapLetter } from '../../../libs/client/useTools';
import { colorVar, hoverScale } from '../../../../styles/variants';
import { Svg } from '../../../Tools/Svg';
import { useRouter } from 'next/router';
import { LoginAvatar } from '../Login/Avatar';
import { IResponsive } from '../../../types/global';

interface IMobile extends IResponsive {
  _data: {
    array: string[];
    onClick: (txt: string) => void;
    isModal: (type: string) => boolean;
  };
  _set: {
    selected: string;
    setFixed: Dispatch<SetStateAction<boolean>>;
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
                {/* {useCapLetter(item)} */}
                <Svg
                  theme={theme}
                  type={setSvg(item)}
                  item={{ size: '4rem' }}
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
  gap: 1rem;
  padding: 2rem;
  bottom: 0;
  position: fixed;
  border: 5px solid yellow;
  justify-content: space-around;
  background-color: inherit;
  font-size: 2rem;
`;
const Txt = styled(Flex)`
  cursor: pointer;
  border: 2px solid blue;
`;
const Array = styled(Flex)`
  position: relative;
  width: fit-content;
`;
