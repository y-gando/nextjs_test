import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';

// 静的なパスを取得する非同期関数をエクスポート
export async function getStaticProps({ params }) {
  // このように "await "キーワードを追加します。
  const postData = await getPostData(params.id);

  // プロパティと投稿データを返す
  return {
    props: {
      postData,
    },
  };
}

// // 静的なパスを取得する非同期関数
// export async function getStaticPaths() {
//   const paths = getAllPostIds();
//   return {
//     paths,
//     fallback: false,
//   };
// }

export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}
