import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ITrimText {
  max: number;
  text: string;
}
export const TrimText = ({ text, max }: ITrimText) => {
  const [trimmed, setTrimmed] = useState(text);
  const [isTrim, setIsTrim] = useState(Boolean(text?.length > max));
  useEffect(() => {
    if (Boolean(text?.length > max)) {
      setIsTrim(true);
      setTrimmed(text.slice(0, max));
    }
  }, [setIsTrim, text, setTrimmed, max]);
  const onClick = (type: string) => {
    if (type === 'more') {
      setIsTrim(false);
      setTrimmed(text);
    }
    if (type === 'less') {
      setIsTrim(true);
      setTrimmed(text.slice(0, max));
    }
  };
  return (
    <>
      <Text>"{trimmed}"</Text>
      {isTrim && (
        <Span
          whileHover="hover"
          variants={variants}
          onClick={() => onClick('more')}
        >
          ...
        </Span>
      )}
      {!isTrim && (
        <Span
          whileHover="hover"
          variants={variants}
          onClick={() => onClick('less')}
        >
          (fold)
        </Span>
      )}
    </>
  );
};
const Text = styled.span`
  //border: 1px solid yellow;
  width: fit-content;
  font-size: 1.1rem;
  line-height: 21px;
  margin-right: 10px;
  word-break: break-all;
`;
const variants = {
  hover: {
    scale: 1.05,
    color: '#E50914',
    transition: { duration: 0.3 },
  },
};
const Span = styled(motion.span)`
  cursor: pointer;
  font-size: 1rem;
  opacity: 0.8;
`;
