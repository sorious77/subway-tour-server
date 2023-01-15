import { Post, PostInfo } from "../models/post.model";

interface Page {
  page: number;
}

export class PostService {
  public static async writePost(post: PostInfo) {
    console.log(post);

    const newPost = new Post(post);

    try {
      await newPost.save();
      return true;
    } catch (e) {
      return false;
    }
  }

  public static async getPostById(id: string) {}

  public static async getPostsByPage(page: number) {
    try {
      const count = await Post.count({});
      const posts = await Post.find(
        {},
        {
          _id: 1,
          title: 1,
          station_nm: 1,
          visitedAt: 1,
          content: 1,
          author: 1,
          createdAt: 1,
        }
      )
        .sort({ createdAt: 1 })
        .limit(10);

      return {
        count,
        posts,
      };
    } catch (e) {
      throw new Error("게시글 조회에 실패했습니다.");
    }
  }
}
