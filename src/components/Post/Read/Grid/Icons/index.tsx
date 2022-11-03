import { Icon } from './Icon';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Svg } from '../../../../../Tools/Svg';
import { Flex } from '../../../../../../styles/global';
import { Dispatch, SetStateAction, useState } from 'react';

interface IPostsIcon {
  _data: {
    theme: boolean;
    setMax: Dispatch<SetStateAction<number>>;
    setCreate: Dispatch<SetStateAction<boolean>>;
  };
}
export const Icons = ({ _data }: IPostsIcon) => {
  const router = useRouter();
  const { board_id } = router.query;
  const isHide = Boolean(board_id);
  const [org, setOrg] = useState(false);
  const [link, setLink] = useState(false);
  const [grid, setGrid] = useState(false);
  const [answer, setAnswer] = useState(false);
  const { theme, setMax, setCreate } = _data;
  const _answer = {
    theme,
    modal: answer,
    svg: 'question',
    setModal: setAnswer,
  };
  const _org = { theme, modal: org, svg: 'posts', setModal: setOrg };
  const _link = { theme, modal: link, svg: 'compass', setModal: setLink };
  const _grid = { theme, modal: grid, svg: 'grid', setModal: setGrid, setMax };
  const icons = [_answer, _link, _org, _grid];
  return (
    <Cont className="icons">
      <Svg
        type="plus"
        theme={theme}
        item={{ isHide }}
        onClick={() => setCreate(true)}
      />
      {icons.map((element) => (
        <Icon key={icons.indexOf(element)} _data={{ ...element }} />
      ))}
    </Cont>
  );
};
const Cont = styled(Flex)`
  gap: 2rem;
  position: absolute;
  width: fit-content;
  height: fit-content;
`;
