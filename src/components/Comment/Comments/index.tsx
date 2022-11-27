import { Option } from '../Modal/Option';
import { Comment } from './Comment';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { ITheme } from '../../../../styles/theme';
import { FlexCol } from '../../../../styles/global';
import { useUser } from '../../../libs/client/useUser';
import { Dispatch, SetStateAction, useState } from 'react';
import { TheComment, useComments } from '../../../libs/client/useComment';

interface IComments extends ITheme {
  setPost: Dispatch<SetStateAction<string>>;
  _data: {
    post_id: number;
    host_id: number;
  };
}
export interface IClickSvg {
  type: string;
  comment: TheComment;
}

export const Comments = ({ theme, _data, setPost }: IComments) => {
  const router = useRouter();
  const { isLoggedIn, user_id } = useUser();
  const [modal, setModal] = useState('');
  const [select, setSelect] = useState(0);
  const [option, setOption] = useState(false);
  const { post_id, host_id } = _data;
  const { originals: array, NoCmts } = useComments({ post_id });
  const clickSvg = ({ type, comment }: IClickSvg) => {
    if (!isLoggedIn) return router.push(`/login`);
    const isMyComment = Boolean(comment.host_id === user_id);
    //
    setSelect(comment.id);
    if (type === 'ellipsis' || type === 'edit' || type === 'delete') {
      if (!isMyComment) return alert('no my comment');
    }
    if (type === 'ellipsis') return setOption(true);
    else {
      setOption(false);
      if (type === 'reply') return setModal('reply');
      if (type === 'edit') return setModal('update');
      if (type === 'delete') return setModal('delete');
    }
  };
  const __modal = { modal, select, option };
  const __data = { theme, post_id, host_id, clickSvg };
  const __setState = { setPost, setModal, setSelect, setOption };
  return (
    <>
      {!NoCmts && (
        <Cont>
          <h1>Total Comments: ({array?.length})</h1>
          {array?.map((comment) => (
            <Array key={comment.id}>
              <Comment
                _modal={__modal}
                _setState={__setState}
                _data={{ ...__data, comment }}
              />
              <Option
                _modal={__modal}
                _setState={__setState}
                _data={{ ...__data, comment, og_id: comment.id }}
              />
            </Array>
          ))}
        </Cont>
      )}
      {NoCmts && (
        <>
          <h1>No Comments...</h1>
        </>
      )}
    </>
  );
};
const Cont = styled(FlexCol)`
  gap: 1rem;
  margin: 0.5rem 0;
  align-items: flex-start;
  h1 {
    font-size: 1.3rem;
    font-style: italic;
  }
`;
const Array = styled(FlexCol)``;
