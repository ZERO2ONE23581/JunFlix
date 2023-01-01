import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { UseCapLetter, UseLength } from '../../libs/client/useTools';

interface ITrimText {
  max: number;
  text: string;
}
export const TrimText = ({ text, max }: ITrimText) => {
  const [trimmed, setTrimmed] = useState(text);
  const isOver = Boolean(UseLength(text)! > max);
  const isLess = Boolean(UseLength(text)! < max);
  const [isTrim, setIsTrim] = useState(isOver);
  //
  useEffect(() => {
    if (isOver) {
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
      {text && (
        <Cont className="content-text">
          <Text>{UseCapLetter(trimmed)}</Text>
          {isTrim && (
            <Span
              exit="exit"
              initial="initial"
              animate="animate"
              whileHover="hover"
              variants={variants}
              onClick={() => onClick('more')}
            >
              ...
            </Span>
          )}
          {!isTrim && !isLess && (
            <Span
              exit="exit"
              initial="initial"
              animate="animate"
              whileHover="hover"
              variants={variants}
              onClick={() => onClick('less')}
            >
              (fold)
            </Span>
          )}
        </Cont>
      )}
    </>
  );
};
const Cont = styled(motion.span)``;
const Text = styled(motion.span)`
  line-height: 21px;
  width: fit-content;
  word-break: break-all;
`;
const Span = styled(motion.span)`
  opacity: 0.8;
  cursor: pointer;
`;
const variants = {
  exit: { opacity: 0 },
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  hover: { scale: 1.05, color: '#E50914', transition: { duration: 0.3 } },
};
