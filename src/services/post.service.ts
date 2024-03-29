import { PostInfo } from "../models/post.model";
import { Post } from "../models";
import { UserService } from "./user.service";

export class PostService {
  public static async writePost(post: PostInfo) {
    try {
      const user = await UserService.findUserByEmail(post.author!);

      if (!user) throw new Error("");

      const newPost = new Post({ ...post, user: user._id });

      const { _doc: result } = await newPost.save();

      return { ...result, success: true };
    } catch (e) {
      console.log(e);

      return false;
    }
  }

  public static async getPostById(id: number) {
    try {
      const post = await Post.findOne(
        {
          id,
        },
        {
          _id: 0,
          id: 1,
          title: 1,
          station_nm: 1,
          visitedAt: 1,
          content: 1,
          createdAt: 1,
        }
      ).populate({
        path: "user",
        select: "nickname -_id",
      });

      return post;
    } catch (e) {
      throw new Error("게시글 조회에 실패했습니다.");
    }
  }

  public static async deletePostById(id: number) {
    try {
      const result = await Post.deleteOne({
        id,
      });

      return result;
    } catch (e) {
      throw new Error("게시글 삭제에 실패했습니다.");
    }
  }

  public static async updatePostById(id: number, post: PostInfo) {
    try {
      await Post.updateOne(
        {
          id,
        },
        {
          title: post.title,
          station_nm: post.station_nm,
          visitedAt: post.visitedAt,
          content: post.content,
        }
      );

      return { ...post, id };
    } catch (e) {
      throw new Error("게시글 수정에 실패했습니다.");
    }
  }

  public static async getPostsByPage(page: number) {
    if (page <= 0) throw new Error("게시글 조회에 실패했습니다.");

    try {
      const count = await Post.count({});
      const posts = await Post.find(
        {},
        {
          _id: 0,
          id: 1,
          title: 1,
          station_nm: 1,
          visitedAt: 1,
          content: 1,
          createdAt: 1,
        }
      )
        .sort({ id: -1 })
        .limit(10)
        .skip((page - 1) * 10)
        .populate({
          path: "user",
          select: "nickname -_id",
        });

      if (posts.length === 0) {
        return {
          count: 0,
          posts: [],
        };
      }

      const result = posts.map((post, idx) => {
        return { ...post._doc };
      });

      return {
        totalPage: Math.ceil(count / 10),
        posts: result,
      };
    } catch (e) {
      throw new Error("게시글 조회에 실패했습니다.");
    }
  }

  public static async getPostByPageAndEmail({
    page,
    email,
  }: {
    page: number;
    email: string;
  }) {
    if (page <= 0) throw new Error("게시글 조회에 실패했습니다.");

    const user = await UserService.findUserIdByEmail(email);

    try {
      const count = await Post.count({});
      const posts = await Post.find(
        {
          user: user._id,
        },
        {
          _id: 0,
          id: 1,
          title: 1,
          station_nm: 1,
          visitedAt: 1,
          content: 1,
          createdAt: 1,
        }
      )
        .sort({ id: -1 })
        .limit(10)
        .skip((page - 1) * 10)
        .populate({
          path: "user",
          select: "nickname -_id",
        });
      if (posts.length === 0) {
        return {
          count: 0,
          posts: [],
        };
      }

      const result = posts.map((post, idx) => {
        return { ...post._doc };
      });

      return {
        totalPage: Math.ceil(count / 10),
        posts: result,
      };
    } catch (e) {
      throw new Error("게시글 조회에 실패했습니다.");
    }
  }
}
