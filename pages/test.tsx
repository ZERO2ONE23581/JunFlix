import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import useUser from '../src/libs/client/useUser';
import { AnimatePresence, motion } from 'framer-motion';
import { HeadTitle } from '../src/Tools/head_title';
import { BtnWrap, FlexPage, Page } from '../styles/global';
import { Btn } from '../src/Tools/Button';
import { useForm } from 'react-hook-form';

const Test: NextPage<{ theme: boolean }> = ({ theme }) => {
  const array = [1, 2, 3, 4];
  const [num, setNum] = useState(1);
  //
  const leftClick = () => setNum((p) => p - 1);
  const rightClick = () => setNum((p) => p + 1);
  const {
    reset,
    watch,
    register,
    setValue,
    setError,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({ mode: 'onBlur' });
  const onValid = (inputs: any) => {
    console.log(inputs);
  };
  const onReset = () => {
    reset({ title: 'hi' });
  };

  return (
    <>
      <Cont>
        <Btn onClick={onReset} type="button" item={{ name: 'test', theme }} />
        <form onSubmit={handleSubmit(onValid)}>
          <input type="text" {...register('title')} />
          <input type="text" {...register('desc')} />
          <input type="text" {...register('hash')} />
          <input type="text" {...register('image')} />

          <Btn type="submit" item={{ name: 'Submit', theme }} />
        </form>

        {/* <div className="test1">
          {array.map((e) => (
            <div key={e}>{<Box1>hellowrold {e}</Box1>}</div>
          ))}
        </div> */}
        <div className="test1">
          {array.map((e) => (
            <div key={e}>{e === num && <Box1>hellowrold {e}</Box1>}</div>
          ))}
        </div>

        {/* <motion.div className="test2" key={num}> */}
        <AnimatePresence>
          <motion.div className="test2">
            {/* <Box2 key={num}> */}
            <Box2>
              <span>hello{num}</span>
              {/* {num > 1 && <Box3 className="box1">world{num}</Box3>}
            {num > 2 && <Box3 className="box2">world{num}</Box3>}
            {num > 3 && <Box3 className="box3">world{num}</Box3>}
            {num > 4 && <Box3 className="box4">world{num}</Box3>}
            {num > 5 && <Box3 className="box5">world{num}</Box3>} */}
            </Box2>
          </motion.div>
        </AnimatePresence>

        <BtnWrap className="btn-wrap">
          <Btn
            type="button"
            onClick={leftClick}
            item={{ theme, name: 'LEFT' }}
          />
          <Btn
            type="button"
            onClick={rightClick}
            item={{ theme, name: 'RIGHT' }}
          />
        </BtnWrap>
      </Cont>
    </>
  );
};
export default Test;

const Box1 = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px solid hotpink;
  background-color: cornflowerblue;
`;
const Box2 = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 5px solid cornflowerblue;
  background-color: hotpink;
  .box2 {
    border: 5px solid blue;
    background-color: red;
  }
  .box2 {
    border: 5px solid blue;
    background-color: orange;
  }
  .box3 {
    border: 5px solid blue;
    background-color: blueviolet;
  }
  .box4 {
    border: 5px solid blue;
    background-color: green;
  }
  .box5 {
    border: 5px solid blue;
    background-color: darkblue;
  }
`;
const Box3 = styled(motion.div)`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;

  align-items: center;
  border: 5px solid yellow;
  background-color: blue;
`;
const Cont = styled(FlexPage)`
  .btn-wrap {
    width: 100px;
  }
  max-width: 50vw;
  flex-direction: column;
  gap: 10px;
  padding: 1rem 20%;
  .test1,
  .test2 {
    border: 10px solid darkgray;
    padding: 50px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
