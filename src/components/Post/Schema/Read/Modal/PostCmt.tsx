import styled from '@emotion/styled';
import { Box } from '../../../../Comment/Create/Box';
import { IPostType } from '../../../../../types/post';
import { Text } from '../../../../Comment/Create/Text';
import { Comments } from '../../../../Comment/Comments';
import { Dispatch, SetStateAction, useState } from 'react';
import { CreateModal } from '../../../../Comment/Create/Modal';

export interface IPostCmt {
  _data: {
    theme: boolean;
    isDesk: boolean;
    post: IPostType;
    setModal: Dispatch<SetStateAction<string>>;
    setCmtModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const PostCmt = ({ _data }: IPostCmt) => {
  const { post, theme, setCmtModal, setModal, isDesk } = _data;
  const post_id = post?.id!;
  const host_id = post?.host_id!;
  const closeCreate = () => setCreate(false);
  const [create, setCreate] = useState(false);
  return (
    <>
      <Cont>
        <Text _data={{ theme, setCmtModal, isDesk }} />
        <Box _data={{ theme, host_id, setCreate, isDesk }} />
        <Comments _data={{ theme, post_id, og_id: 0, setCmtModal, setModal }} />
      </Cont>
      <CreateModal
        _data={{
          theme,
          create,
          post_id,
          closeCreate,
          setCmtModal,
          setPost: setModal,
        }}
      />
    </>
  );
};
const Cont = styled.article`
  width: 100%;
  height: 100%;
  padding: 1rem 2rem;
  border-top: 1px dotted ${(p) => p.theme.color.font};
`;
