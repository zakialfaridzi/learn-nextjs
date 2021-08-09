import htmr from "htmr";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Layout from "../components/Layout";
import Head from "next/head";
import Date from "../components/date";
import utilStyles from "../styles/utils.module.css";

export default function Post({ data }) {
  return (
    <Layout>
      <Head>
        <title>{data.title}</title>
      </Head>
      <h1 className={utilStyles.headingXl}>{data.title}</h1>
      <br />
      <div className={utilStyles.lightText}>
        <Date dateString={data.date} />
      </div>
      <br />
      <div>{htmr(data.contentHTML)}</div>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const paths = await getAllPostIds();

  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  // Add the "await" keyword like this:
  const data = await getPostData(params.id);

  return {
    props: {
      data,
    },
  };
}
