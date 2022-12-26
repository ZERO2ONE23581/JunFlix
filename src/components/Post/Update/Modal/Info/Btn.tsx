import useSWR from 'swr';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Svg } from '../../../../../Tools/Svg';
import { IGetBoard } from '../../../../../types/board';
import { avatarLink } from '../../../../../Tools/Avatar';
import { useUser } from '../../../../../libs/client/useUser';
import { Flex, FlexCol_ } from '../../../../../../styles/global';
import { color, redBrdr } from '../../../../../../styles/variants';
import { useCapLetters } from '../../../../../libs/client/useTools';
import { useGetQuickSaved } from '../../../../../libs/client/usePosts';

interface ISelectBoardBtn {
  _boolean: {
    theme: boolean;
    isDesk: boolean;
    quickSave: boolean;
  };
  _data: {
    new_boardId: number;
    openSelect: () => void;
    board_id: number | null;
  };
}
export const SelectBtn = ({ _data, _boolean }: ISelectBoardBtn) => {
  const { theme, isDesk, quickSave } = _boolean;
  const { board_id, openSelect, new_boardId } = _data;
  const [select, setSelect] = useState(board_id);
  useEffect(() => {
    if (new_boardId) setSelect(new_boardId);
    if (quickSave) setSelect(0);
  }, [board_id, new_boardId, quickSave, setSelect]);

  const { data } = useSWR<IGetBoard>(
    Boolean(select) && ` /api/board/${select}`
  );
  const board = data?.board;
  const { loggedInUser } = useUser();
  const counts = board?._count?.posts;
  const isRed = Boolean(new_boardId || quickSave);
  const { counts: num } = useGetQuickSaved(loggedInUser?.id!);
  const quick_counts = num < 1 ? 0 : quickSave ? num + 1 : num;
  return (
    <Cont isDesk={isDesk}>
      <h3>Board</h3>
      <Wrap
        className="wrap"
        animate="animate"
        whileHover={'hover'}
        onClick={openSelect}
        variants={openBoardVar}
        custom={{ theme, isRed }}
      >
        <img src={avatarLink(board?.cover)} alt="board cover" />
        <Info>
          <div className="txt">
            {board && (
              <Title className="title">{useCapLetters(board?.title)} </Title>
            )}
            {!board && <Title className="title">{'QuickSave'} </Title>}
            <span className="txt-post-counts">
              {board && (
                <>
                  <span>{counts ? counts : 0}</span>
                  <span>{counts! > 1 ? 'posts' : 'post'}</span>
                </>
              )}
              {!board && (
                <>
                  <span>{quick_counts ? quick_counts : 0}</span>
                  <span>{quick_counts! > 1 ? 'posts' : 'post'}</span>
                </>
              )}
            </span>
          </div>
          <Svg type="right-chev" theme={theme} item={{ size: '1rem' }} />
        </Info>
      </Wrap>
    </Cont>
  );
};
const Cont = styled(FlexCol_)`
  align-items: flex-start;
  font-size: ${(p) => (p.isDesk ? '1.2rem' : '2.5rem')};
  h3 {
    font-weight: 500;
    font-size: 1.2rem;
    margin-left: 1rem;
    margin-bottom: 10px;
    color: ${(p) => p.theme.color.logo};
    font-size: ${(p) => (p.isDesk ? '1.2rem' : '3rem')};
  }
  .title {
    font-size: ${(p) => (p.isDesk ? '1.2rem' : '2.2rem')};
  }
  img {
    border-radius: 5px;
    width: ${(p) => (p.isDesk ? '3rem' : '6rem')};
    height: ${(p) => (p.isDesk ? '3rem' : '6rem')};
  }
  > .wrap {
    padding: ${(p) => (p.isDesk ? '0.5rem 1rem' : '1rem 2rem')};
  }
`;
const Title = styled.span`
  display: block;
  font-size: 1.2rem;
`;

const Wrap = styled(Flex)`
  gap: 30px;
  width: 100%;
  display: flex;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
`;
const Info = styled(Flex)`
  justify-content: space-between;
  .txt {
    .txt-post-counts {
      span {
        margin-right: 5px;
      }
    }
  }
`;
const openBoardVar = {
  hover: () => ({
    color: '#ffffff',
    backgroundColor: '#E50914',
  }),
  animate: ({ theme, isSelected }: any) => ({
    transition: { duration: 0.3 },
    border: isSelected
      ? redBrdr
      : !theme
      ? '1px solid '
      : '1px solid transparent',
    color: isSelected ? '#E50914' : color(theme),
  }),
};
