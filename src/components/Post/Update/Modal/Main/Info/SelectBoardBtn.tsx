import useSWR from 'swr';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Svg } from '../../../../../../Tools/Svg';
import { IGetBoard } from '../../../../../../types/board';
import { avatarLink } from '../../../../../../Tools/Avatar';
import { useUser } from '../../../../../../libs/client/useUser';
import { Flex, FlexCol } from '../../../../../../../styles/global';
import { color, redBrdr } from '../../../../../../../styles/variants';
import { useCapLetters } from '../../../../../../libs/client/useTools';
import { useGetQuickSaved } from '../../../../../../libs/client/usePosts';

interface ISelectBoardBtn {
  _data: {
    theme: boolean;
    board_id: number;
    quickSave: boolean;
    new_boardId: number;
    openSelect: () => void;
  };
}
export const SelectBoardBtn = ({ _data }: ISelectBoardBtn) => {
  const theme = _data?.theme!;
  const board_id = _data?.board_id!;

  const new_id = _data?.new_boardId!;
  const quickSave = _data?.quickSave!;
  const openSelect = _data?.openSelect!;
  //
  const [select, setSelect] = useState(board_id);
  useEffect(() => {
    if (new_id) setSelect(new_id);
    if (quickSave) setSelect(0);
  }, [board_id, new_id, quickSave, setSelect]);
  //
  const { data } = useSWR<IGetBoard>(
    Boolean(select) && ` /api/board/${select}`
  );
  const board = data?.board;
  const { loggedInUser } = useUser();
  const counts = board?._count?.posts;
  const isRed = Boolean(new_id || quickSave);
  const { counts: num } = useGetQuickSaved(loggedInUser?.id!);
  const quick_counts = num < 1 ? 0 : quickSave ? num + 1 : num;
  return (
    <>
      <Cont>
        <h3>Board</h3>
        <Wrap
          onClick={openSelect}
          variants={openBoardVar}
          custom={{ theme, isRed }}
          animate="animate"
          whileHover={'hover'}
        >
          <img src={avatarLink(board?.cover)} alt="board cover" />
          <Info>
            <div className="txt">
              {board && <Title>{useCapLetters(board?.title)} </Title>}
              {!board && <Title>{'QuickSave'} </Title>}
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
    </>
  );
};
const Title = styled.span`
  display: block;
  font-size: 1.2rem;
`;
const Cont = styled(FlexCol)`
  align-items: flex-start;
  h3 {
    font-weight: 500;
    font-size: 1.2rem;
    margin-left: 1rem;
    margin-bottom: 10px;
    color: ${(p) => p.theme.color.logo};
  }
`;
const Wrap = styled(Flex)`
  gap: 30px;
  width: 100%;
  display: flex;
  cursor: pointer;
  padding: 13px 20px;
  border-radius: 5px;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 5px;
  }
`;
const Info = styled(Flex)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
  }
  .txt {
    .txt-post-counts {
      font-size: 1rem;
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
