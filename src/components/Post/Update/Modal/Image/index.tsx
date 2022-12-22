import { PostImg } from './Img';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { avatarLink } from '../../../../../Tools/Avatar';

interface IPostImage {
  _data: {
    hide: boolean;
    preview: string;
    original: string | null;
  };
}
export const PostImage = ({ _data }: IPostImage) => {
  const { hide, preview, original } = _data;
  const [imgSrc, setImgSrc] = useState('');
  useEffect(() => {
    if (preview) setImgSrc(preview);
    else if (original) setImgSrc(avatarLink(original));
    else setImgSrc('');
  }, [preview, original, setImgSrc]);

  const isImage = Boolean(!hide && (original || preview));
  const isPreview = Boolean(imgSrc === preview && preview);
  const isOriginal = Boolean(imgSrc === avatarLink(original) && original);

  return (
    <AnimatePresence>
      <Cont
        custom={isImage}
        variants={vars}
        exit="exit"
        initial="initial"
        animate="animate"
      >
        <PostImg open={isPreview} type="preview" imgSrc={imgSrc} />
        <PostImg open={isOriginal} type="original" imgSrc={imgSrc} />
      </Cont>
    </AnimatePresence>
  );
};
const Cont = styled(motion.div)`
  width: 15rem;
  height: 15rem;
  position: relative;
`;
const vars = {
  initial: (isImage: boolean) => ({
    scale: 0.1,
    opacity: 0,
    transition: { duration: 0.6 },
    height: isImage ? '15rem' : '0rem',
    marginBottom: isImage ? '1rem' : '2rem',
  }),
  animate: (isImage: boolean) => ({
    scale: 1,
    opacity: isImage ? 1 : 0,
    transition: { duration: 0.6 },
    height: isImage ? '15rem' : '0rem',
    marginBottom: isImage ? '1rem' : '2rem',
  }),
  exit: (isImage: boolean) => ({
    scale: 0.1,
    opacity: 0,
    transition: { duration: 0.6 },
    height: isImage ? '15rem' : '0rem',
    marginBottom: isImage ? '1rem' : '2rem',
  }),
};
