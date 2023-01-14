import { Post, PostInfo } from "../models/post.model";
import { Station, StationInfo } from "../models/station.model";

interface Page {
  page: number;
}

export class PostService {
  public static async writePost(post: PostInfo) {
    // 1. 글 작성
    // 2. 지하철역 상태 업데이트

    const newPost = new Post(post);

    newPost
      .save()
      .then(() => {
        return Station.findOne({
          station_nm: post.station_nm,
        });
      })
      .then((station) => {
        return Station.updateOne({
          station_nm: station!.station_nm,
          visited: true,
        });
      })
      .then(() => {
        return true;
      })
      .catch((e) => {
        return false;
      });
  }

  public static async getPostsByPage({ page }: Page) {
    const posts = [];

    for (let i = 1; i <= 10; i++) {
      posts.push({
        title: `Title ${(page - 1) * 10 + i}`,
        content: `content ${(page - 1) * 10 + i}`,
        id: `${(page - 1) * 10 + i}`,
      });
    }

    return posts;
  }
}
