import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

interface ISvgProps {
  type: string;
}
export const Svg = ({ type }: ISvgProps) => {
  const XMLNS = 'http://www.w3.org/2000/svg';
  const [path, setPath] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [viewbox, setViewbox] = useState('');
  //
  useEffect(() => {
    if (type === 'no-image') {
      setSize('40px');
      setColor('#F9F8F8');
      setViewbox('0 0 576 512');
      setPath(
        'M480 416v16c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V176c0-26.51 21.49-48 48-48h16v48H54a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6v-10h48zm42-336H150a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6V86a6 6 0 0 0-6-6zm6-48c26.51 0 48 21.49 48 48v256c0 26.51-21.49 48-48 48H144c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h384zM264 144c0 22.091-17.909 40-40 40s-40-17.909-40-40 17.909-40 40-40 40 17.909 40 40zm-72 96l39.515-39.515c4.686-4.686 12.284-4.686 16.971 0L288 240l103.515-103.515c4.686-4.686 12.284-4.686 16.971 0L480 208v80H192v-48z'
      );
    }
  }, [type, setPath, setSize, setColor, setViewbox]);
  return (
    <Cont size={size} color={color}>
      <svg xmlns={XMLNS} viewBox={viewbox}>
        <path d={path} />
      </svg>
    </Cont>
  );
};

const Cont = styled.div<{ size: string; color: string }>`
  svg {
    width: ${(p) => p.size && p.size};
    height: ${(p) => p.size && p.size};
    fill: ${(p) => p.color && p.color};
  }
`;
