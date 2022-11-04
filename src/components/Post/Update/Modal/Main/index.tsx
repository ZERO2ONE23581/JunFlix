import { Info } from './Info';
import styled from '@emotion/styled';
import { Setting } from './Setting';
import { PostImage } from './Setting/PostImage';
import { Dispatch, SetStateAction } from 'react';
import { IPostUseform } from '../../../../../types/post';
import { Flex, FlexCol } from '../../../../../../styles/global';

interface IMain extends IPostUseform {
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
  const {
    hide,
    theme,
    preview,
    original,
    setHide,
    setModal,
    resetPreview,
    board_id,
    quickSave,
    new_boardId,
    setIsDelete,
    setSelectModal,
  } = _data;
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
            setHide,
            setModal,
            resetPreview,
          }}
        />
      </Flex>
      <Info
        _useform={_useform}
        _data={{
          theme,
          board_id,
          quickSave,
          new_boardId,
          setIsDelete,
          setSelectModal,
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
