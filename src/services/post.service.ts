import { Post, PostInfo } from "../models/post.model";

interface Page {
  page: number;
}

export class PostService {
  public static async writePost(post: PostInfo) {
    const newPost = new Post(post);

    try {
      const { _doc: result } = await newPost.save();

      return { ...result, success: true };
    } catch (e) {
      return false;
    }
  }

  public static async getPostById(_id: string) {
    try {
      const post = await Post.findOne(
        {
          _id,
        },
        {
          title: 1,
          station_nm: 1,
          visitedAt: 1,
          content: 1,
          author: 1,
          createdAt: 1,
        }
      );

      console.log(post);

      return post;
    } catch (e) {
      throw new Error("게시글 조회에 실패했습니다.");
    }
  }

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

      if (posts.length === 0) {
        return {
          count: 0,
          posts: [],
        };
      }

      const result = posts.map((post, idx) => {
        return { ...post._doc, id: (page - 1) * 10 + idx + 1 };
      });

      return {
        count,
        posts: result,
      };
    } catch (e) {
      throw new Error("게시글 조회에 실패했습니다.");
    }
  }
}
