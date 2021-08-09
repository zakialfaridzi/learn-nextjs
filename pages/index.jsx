import Head from "next/head";
import Layout, { siteTitle } from "./components/Layout";
import utilStyles from "./styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";

export const getStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  const data = await fetch("https://api.github.com/users/zakialfaridzi").then(
    (res) => res.json()
  );
  return {
    props: {
      data,
      allPostsData,
    },
  };
};

export default function Home({ data, allPostsData }) {
  const bio = Object.entries(data).map(
    ([key, value]) => key === "bio" && <p key={key}>{value}</p>
  );
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        Hi i'm <strong>zaki</strong>, a web developer mostly doing front end
        stuff. {bio}
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>{date}</small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
