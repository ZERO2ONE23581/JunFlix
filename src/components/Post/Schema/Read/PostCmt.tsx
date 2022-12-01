import styled from '@emotion/styled';
import { Box } from '../../../Comment/Create/Box';
import { IPostType } from '../../../../types/post';
import { Text } from '../../../Comment/Create/Text';
import { Comments } from '../../../Comment/Comments';
import { FlexCol } from '../../../../../styles/global';
import { Dispatch, SetStateAction, useState } from 'react';
import { CreateModal } from '../../../Comment/Create/Modal';

export interface IPostCmt {
  _data: {
    theme: boolean;
    post: IPostType;
    setModal: Dispatch<SetStateAction<string>>;
    setCmtModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const PostCmt = ({ _data }: IPostCmt) => {
  const { post, theme, setCmtModal, setModal: setPost } = _data;
  const post_id = post?.id!;
  const host_id = post?.host_id!;
  const closeCreate = () => setCreate(false);
  const [create, setCreate] = useState(false);
  return (
    <Cont>
      <FlexCol className="wrap">
        <Text _data={{ theme, setCmtModal }} />
        <Box _data={{ theme, host_id, setCreate }} />
        <CreateModal
          _data={{ theme, create, post_id, setPost, closeCreate, setCmtModal }}
        />
      </FlexCol>
      <Comments _data={{ theme, post_id, og_id: 0, setCmtModal, setPost }} />
    </Cont>
  );
};
const Cont = styled.article`
  width: 100%;
  height: 100%;
  padding: 1rem 2rem;
  border-top: 1px dotted ${(p) => p.theme.color.font};
  > .wrap {
    gap: 0.8rem;
    margin-bottom: 1rem;
  }
`;
