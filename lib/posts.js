import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

// 日付順に並び替えた当置くデータを取得する関数
export function getSortedPostsData() {
  // posts以下のファイル名取得
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // ファイル名から".md "を削除してidを取得する。
    const id = fileName.replace(/\.md$/, '');

    // マークダウンファイルを文字列として読み込む
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // gray-matterを使って投稿のメタデータセクションをパースします。
    const matterResult = matter(fileContents);

    // データとidを結合する
    return {
      id,
      ...matterResult.data,
    };
  });
  // 投稿を日付順に並べる
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

// IDに基づいた投稿データを返す関数
export function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // gray-matterを使って投稿のメタデータセクションをパース（プログラムで扱えるようなデータ構造の集合体に変換すること）する
  const matterResult = matter(fileContents);

  // データをidを結合する
  return {
    id,
    ...matterResult.data,
  };
}