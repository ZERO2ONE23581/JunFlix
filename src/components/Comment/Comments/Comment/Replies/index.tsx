import { Reply } from './Reply';
import styled from '@emotion/styled';
import { IClickSvg } from '../..';
import { Option } from '../../../Modal/Option';
import { Dispatch, SetStateAction } from 'react';
import { FlexCol } from '../../../../../../styles/global';
import { TheComment, useComments } from '../../../../../libs/client/useComment';

interface IReplies {
  _data: {
    theme: boolean;
    post_id: number;
    host_id: number;
    replied_to: string;
    comment: TheComment;
    clickSvg: ({ type, comment }: IClickSvg) => void;
  };
  _modal: {
    modal: string;
    select: number;
    option: boolean;
  };
  _setState: {
    setPost: Dispatch<SetStateAction<string>>;
    setModal: Dispatch<SetStateAction<string>>;
    setSelect: Dispatch<SetStateAction<number>>;
    setOption: Dispatch<SetStateAction<boolean>>;
  };
}
export const Replies = ({ _data, _setState, _modal }: IReplies) => {
  const { replied_to, theme, comment, post_id, host_id, clickSvg } = _data;
  const __data = { replied_to, theme, post_id, host_id, clickSvg };
  const { replies } = useComments({ post_id, cmt_id: comment.id });
  return (
    <>
      {replies?.map((comment) => (
        <Cont key={comment.id}>
          <Reply _setState={_setState} _data={{ ...__data, comment }} />
          <Replies
            _modal={_modal}
            _setState={_setState}
            _data={{ ...__data, comment }}
          />
          <Option
            _modal={_modal}
            _setState={_setState}
            _data={{ ...__data, comment, og_id: comment.id }}
          />
        </Cont>
      ))}
    </>
  );
};
const Cont = styled(FlexCol)`
  //border: 3px solid crimson;
`;
