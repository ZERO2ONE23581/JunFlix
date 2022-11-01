import { Info } from './Info';
import styled from '@emotion/styled';
import { Setting } from './Setting';
import { PostImage } from './Setting/PostImage';
import { Dispatch, SetStateAction } from 'react';
import { IUseformPost } from '../../../../../types/post';
import { Flex, FlexCol } from '../../../../../../styles/global';

interface IMain extends IUseformPost {
  _data: {
    hide: boolean;
    theme: boolean;
    preview: string;
    quickSave: boolean;
    new_boardId: number;
    original: string | null;
    board_id: number | null;
    resetPreview: () => void;
    setHide: Dispatch<SetStateAction<boolean>>;
    setModal: Dispatch<SetStateAction<string>>;
    setIsDelete: Dispatch<SetStateAction<boolean>>;
    setSelectModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const Main = ({ _data, _useform }: IMain) => {
  const hide = _data?.hide!;
  const theme = _data?.theme!;
  const preview = _data?.preview!;
  const original = _data?.original!;
  return (
    <Cont className="main">
      <Flex className="image-setting">
        <PostImage hide={hide} preview={preview} original={original} />
        <Setting
          _data={{
            hide,
            theme,
            preview,
            original,
            setHide: _data?.setHide!,
            setModal: _data?.setModal!,
            resetPreview: _data?.resetPreview!,
          }}
        />
      </Flex>
      <Info
        _useform={_useform}
        _data={{
          theme,
          board_id: _data?.board_id!,
          quickSave: _data?.quickSave!,
          new_boardId: _data?.new_boardId!,
          setIsDelete: _data?.setIsDelete!,
          setSelectModal: _data?.setSelectModal!,
        }}
      />
    </Cont>
  );
};
const Cont = styled(FlexCol)`
  padding: 0 3rem 3rem;
  .image-setting {
    position: relative;
    justify-content: flex-start;
    .setting {
      top: 0;
      right: 0;
      width: fit-content;
      position: absolute;
    }
  }
`;
