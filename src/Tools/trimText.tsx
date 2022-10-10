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
      {text && (
        <Cont>
          <Text>"{trimmed}"</Text>
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
          {!isTrim && (
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
const Cont = styled.span`
  //border: 1px solid yellow;
  padding: 0 1rem;
`;
const Text = styled.span`
  width: fit-content;
  font-size: 1.1rem;
  line-height: 21px;
  margin-right: 10px;
  word-break: break-all;
`;
const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  hover: {
    scale: 1.05,
    color: '#E50914',
    transition: { duration: 0.3 },
  },
};
const Span = styled(motion.span)`
  opacity: 0.8;
  font-size: 1rem;
  cursor: pointer;
`;
