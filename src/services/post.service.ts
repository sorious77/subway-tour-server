import { Post, PostInfo } from "../models/post.model";
import { Station, StationInfo } from "../models/station.model";

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
        console.log("station", station);

        return Station.updateOne({
          station_nm: station!.station_nm,
          visited: true,
        });
      })
      .then(() => {
        return true;
      })
      .catch((e) => {
        console.log(e);

        return false;
      });
  }
}
