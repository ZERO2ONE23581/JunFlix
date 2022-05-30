import Head from 'next/head';

interface ITitleProps {
  title: string;
}

export const Title = ({ title }: ITitleProps) => {
  return (
    <>
      <Head>
        <title>{title} | JUNFLIX</title>
        <meta property="og:title" content={title} key="title" />
      </Head>
    </>
  );
};
