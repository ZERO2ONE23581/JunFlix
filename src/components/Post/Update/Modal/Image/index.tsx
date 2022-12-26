import { PostImg } from './Img';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { avatarLink } from '../../../../../Tools/Avatar';
import { useResponsive } from '../../../../../libs/client/useTools';

interface IPostImage {
  _data: {
    hide: boolean;
    preview: string;
    original: string | null;
  };
}
export const PostImage = ({ _data }: IPostImage) => {
  const [imgSrc, setImgSrc] = useState('');
  const { hide, preview, original } = _data;
  const { isDesk, isMobile } = useResponsive();
  useEffect(() => {
    if (preview) setImgSrc(preview);
    else if (original) setImgSrc(avatarLink(original));
    else setImgSrc('');
  }, [preview, original, setImgSrc]);

  const isImage = Boolean(!hide && (original || preview));
  const isPreview = Boolean(imgSrc === preview && preview);
  const isOriginal = Boolean(imgSrc === avatarLink(original) && original);
  const height = () => {
    if (isDesk) {
      if (isImage) return '15rem';
      else return '0rem';
    } else if (isMobile) {
      if (isImage) return '25rem';
      else return '0rem';
    }
  };
  const marginBottom = () => {
    if (isDesk) {
      if (isImage) return '1rem';
      else return '2rem';
    } else if (isMobile) {
      if (isImage) return '3rem';
      else return '5rem';
    }
  };

  return (
    <AnimatePresence>
      <Cont
        variants={vars}
        exit="exit"
        initial="initial"
        animate="animate"
        custom={{ isImage, height: height(), marginBottom: marginBottom() }}
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
  animate: ({ isImage, height, marginBottom }: any) => ({
    height,
    scale: 1,
    marginBottom,
    width: height,
    opacity: isImage ? 1 : 0,
    transition: { duration: 0.6 },
  }),
  exit: () => ({ scale: 0.1, opacity: 0, transition: { duration: 0.6 } }),
  initial: () => ({ scale: 0.1, opacity: 0, transition: { duration: 0.6 } }),
};
