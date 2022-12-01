import { Hide } from './Hide';
import { Reply } from './Reply';
import { IClickSvg } from '../..';
import styled from '@emotion/styled';
import { Option } from '../../../Modal/Setting';
import { FlexCol } from '../../../../../../styles/global';
import { Dispatch, SetStateAction, useState } from 'react';
import { TheComment, useComments } from '../../../../../libs/client/useComment';

interface IReplies {
  _data: {
    theme: boolean;
    isReFold: boolean;
    original: TheComment;
    clickSvg: ({ type, comment }: IClickSvg) => void;
  };
  _usestate: {
    modal: string;
    select: number;
    option: boolean;
    setPost: Dispatch<SetStateAction<string>>;
    setModal: Dispatch<SetStateAction<string>>;
    setSelect: Dispatch<SetStateAction<number>>;
    setOption: Dispatch<SetStateAction<boolean>>;
  };
}
export const Replies = ({ _data, _usestate }: IReplies) => {
  const { theme, isReFold, original, clickSvg } = _data;
  const { post_id, id: og_id } = original;
  const { modal, select, option, setPost, setModal, setSelect, setOption } =
    _usestate;
  const { replies } = useComments({ post_id, comment_id: og_id });
  const length = replies?.length!;
  const [hide, setHide] = useState(false);
  const sliced = replies?.slice(1, length);
  return (
    <>
      {!isReFold && <Hide _data={{ hide, theme, length, setHide }} />}
      {replies?.map((reply) => (
        <Cont key={reply.id}>
          <Reply
            _data={{
              theme,
              post_id,
              host_id,
              replied_to,
              comment,
              clickSvg,
              comment: reply,
            }}
            _setState={{ setPost, setModal, setSelect }}
          />
          <Option
            _modal={_modal}
            _setState={{ setPost, setModal, setSelect, setOption }}
            _data={{ theme, clickSvg, comment: reply }}
          />
        </Cont>
      ))}
    </>
  );
};

const Cont = styled(FlexCol)`
  //border: 3px solid crimson;
`;
