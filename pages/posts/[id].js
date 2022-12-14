import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';

// 静的なプロパティを取得する非同期関数
export async function getStaticProps({ params }) {
  const postData = getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

// 静的なパスを取得する非同期関数
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </Layout>
  );
}

