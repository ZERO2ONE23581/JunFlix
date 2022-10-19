import useSWR from 'swr';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Svg } from '../../../Tools/Svg';
import { IGetBoards } from '../../../types/board';
import { OverlayBg } from '../../../Tools/overlay';
import { PostModalStyle } from '../../../../styles/post';
import { color, variants } from '../../../../styles/variants';
import { Flex, FlexCol } from '../../../../styles/global';
import { useCapLetters } from '../../../libs/client/useTools';
import { useGetAllPosts } from '../../../libs/client/usePosts';
import { Dispatch } from 'react';
import { SetStateAction } from 'react';

interface ISelectBoard {
  modal: boolean;
  theme: boolean;
  host_id: number;
  closeModal: () => void;
  setChosen_board_id: Dispatch<SetStateAction<number>>;
  setSelectQuick: Dispatch<SetStateAction<boolean>>;
  setSelectModal: Dispatch<SetStateAction<boolean>>;
}
export const SelectBoardModal = ({
  modal,
  theme,
  host_id,
  closeModal,
  setChosen_board_id,
  setSelectModal,
  setSelectQuick,
}: ISelectBoard) => {
  const { data } = useSWR<IGetBoards>(`/api/board/all`);
  const myBoards = data?.boards?.filter((e) => e.host_id === host_id);
  const open = Boolean(myBoards?.length! > 0 && modal);

  const onSelect = (id: number, type: string) => {
    if (type === 'quick' && !id) setSelectQuick(true);
    else {
      setChosen_board_id(id);
      setSelectQuick(false);
    }
    setSelectModal(false);
  };
  //
  const counts = useGetAllPosts(host_id);

  return (
    <>
      {open && (
        <>
          <Modal
            exit="exit"
            animate="animate"
            initial="initial"
            custom={theme}
            variants={variants}
          >
            <Layer
              custom={theme}
              className="layer"
              animate="animate"
              variants={variants}
            >
              <div>
                <Svg theme={theme} type="left-chev" onClick={closeModal} />
              </div>
              <div>
                <h1>Select Board</h1>
              </div>
              <div />
            </Layer>
            <FlexCol className="map">
              <motion.ul
                custom={!theme}
                variants={listVar}
                animate="animate"
                whileHover="hover"
                onClick={() => onSelect(0, 'quick')}
              >
                <Cover>
                  <img src="/img/home-bg-dn.jpg" alt="board cover" />
                </Cover>
                <Title className="title">
                  <h2>Quick Save</h2>
                  <span className="post-num">
                    <span>{counts ? counts : 0}</span>
                    <span>{counts! > 1 ? 'posts' : 'post'}</span>
                  </span>
                </Title>
              </motion.ul>
              {myBoards?.map((board) => (
                <ListWrap
                  key={board.id}
                  custom={theme}
                  variants={listVar}
                  animate="animate"
                  whileHover="hover"
                  onClick={() => onSelect(board.id, 'select')}
                >
                  <Cover className="cover">
                    <img src="/img/home-bg-dn.jpg" alt="board cover" />
                  </Cover>
                  <Title className="title">
                    <h2>{useCapLetters(board.title)}</h2>
                    <span className="post-num">
                      <span>{board?._count?.posts}</span>
                      <span>Posts</span>
                    </span>
                  </Title>
                </ListWrap>
              ))}
            </FlexCol>
          </Modal>
          <OverlayBg zIndex={112} closeModal={closeModal} />
        </>
      )}
    </>
  );
};
const Modal = styled(PostModalStyle)`
  gap: 0;
  padding: 0;
  top: 10rem;
  z-index: 113;
  max-width: 30vw;
  font-size: 1.2rem;
  width: fit-content;
  height: fit-content;
  border-radius: 20px;
  ul {
    width: 100%;
    gap: 15px;
    width: 100%;
    display: flex;
    padding: 15px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    box-shadow: ${(p) => p.theme.boxShadow.nav};
  }
`;

const Layer = styled(Flex)`
  width: 100%;
  display: flex;
  font-size: 1.5rem;
  padding: 10px 20px;
  border-bottom: 2px solid ${(p) => p.theme.color.font};
  > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    :nth-of-type(1) {
      justify-content: flex-start;
    }
  }
`;

const ListWrap = styled(motion.ul)``;
const Cover = styled.li`
  padding: 0;
  width: fit-content;
  img {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 10px;
  }
`;
const Title = styled.li`
  gap: 20px;
  width: 100%;
  h2 {
    font-weight: 500;
    font-size: 1.5rem;
  }
  .post-num {
    display: block;
    margin-top: 5px;
    span {
      margin-right: 5px;
      font-style: italic;
    }
  }
`;
const listVar = {
  hover: () => ({
    color: '#ffffff',
    backgroundColor: '#E50914',
    transition: { duration: 0.6 },
  }),
  animate: (theme: boolean) => ({
    color: color(theme),
    backgroundColor: color(!theme),
    transition: { duration: 0.6 },
  }),
};
