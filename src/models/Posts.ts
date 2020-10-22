import {
  types,
  Instance,
  SnapshotIn,
  getParent,
  destroy,
  flow,
  getSnapshot,
} from "mobx-state-tree";
import { Auth } from "./Auth";
import { rootStore } from "./Root";
export const Post = types.model({
  title: types.string,
  content: types.string,
  image: types.string,
});

export const Posts = types
  .model({
    posts: types.optional(types.array(Post), []),
  })
  .actions((self) => ({
    getPosts: flow(function* fetchPosts() {
      try {
        const {realToken } = getSnapshot<typeof rootStore>(rootStore).auth;
        const response = yield fetch("https://api.joonik.com/posts", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${realToken}`,
          },
        });
        const result = yield response.json();
        self.posts = result;
        console.log(result);
      } catch (e) {
        console.error("Failed to fetch", e);
      }
    }),
  }));
