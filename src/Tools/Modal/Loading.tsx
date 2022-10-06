import { Svg } from '../Svg';
import styled from '@emotion/styled';
import { ITheme } from '../../../styles/theme';
import { AnimatePresence, motion } from 'framer-motion';
import { Modal, Overlay } from '../../../styles/global';

interface ILoadingModal extends ITheme {
  isLoading: boolean;
}
export const LoadingModal = ({ theme, isLoading }: ILoadingModal) => {
  const loadingVar = {
    initial: (theme: boolean) => ({
      opacity: 0,
      color: theme ? '#000000' : '#ffffff',
      borderColor: theme ? '#000000' : '#ffffff',
      backgroundColor: theme ? '#ffffff' : '#000000',
    }),
    animate: (theme: boolean) => ({
      opacity: 1,
      transition: {
        duration: 0.6,
      },
      color: theme ? '#000000' : '#ffffff',
      borderColor: theme ? '#000000' : '#ffffff',
      backgroundColor: theme ? '#ffffff' : '#000000',
    }),
    exit: (theme: boolean) => ({
      opacity: 0,
    }),
  };
  //
  const svgVar = {
    initial: (theme: boolean) => ({
      fill: theme ? '#000000' : '#ffffff',
    }),
    animate: (theme: boolean) => ({
      rotate: '360deg',
      transition: {
        duration: 1.5,
        repeat: Infinity,
      },
      fill: theme ? '#000000' : '#ffffff',
    }),
    exit: (theme: boolean) => ({}),
  };

  //
  return (
    <AnimatePresence>
      {isLoading && (
        <>
          <Cont
            exit="exit"
            initial="initial"
            animate="animate"
            className="loading"
            custom={theme}
            variants={loadingVar}
          >
            <motion.span
              animate="animate"
              variants={{
                animate: {
                  opacity: 1,
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                  },
                },
              }}
            >
              Loading...
            </motion.span>
            <motion.svg viewBox="0 0 512 512">
              <motion.path
                exit="exit"
                initial="initial"
                animate="animate"
                custom={theme}
                variants={svgVar}
                d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"
              />
            </motion.svg>
          </Cont>
          <Overlay exit={{ opacity: 0 }} animate={{ opacity: 1 }} />
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(Modal)`
  width: 25vw;
  height: 40vh;
  min-width: 400px;
  min-height: 300px;
  gap: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  span {
    opacity: 0;
    font-size: 2em;
  }
  svg {
    width: 3em;
    height: 3em;
  }
`;
