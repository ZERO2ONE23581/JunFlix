import Head from 'next/head';

interface IHeadTitle {
  title: string;
}
export const HeadTitle = ({ title }: IHeadTitle) => {
  return (
    <>
      <Head>
        <title>{title} | JUNFLIX</title>
        <meta property="og:title" content={title} key="title" />
      </Head>
    </>
  );
};
