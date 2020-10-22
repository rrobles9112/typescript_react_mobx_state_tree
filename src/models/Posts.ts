import { types, flow, getSnapshot } from "mobx-state-tree";
import axios from "axios";
import { rootStore } from "./Root";
import { action } from "mobx";
export const Post = types.model({
  title: types.string,
  content: types.string,
  image: types.string,
});

export const Posts = types
  .model({
    posts: types.optional(types.array(Post), []),
  })
  .actions((self) => {
    const getPosts = flow(function* fetchPosts() {
      try {
        const { realToken } = getSnapshot<typeof rootStore>(rootStore).auth;
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
    });
    const addPosts = flow(function* savePosts(formData: FormData) {
      try {
        const { realToken } = getSnapshot<typeof rootStore>(rootStore).auth;
        /*const response = yield fetch("https://api.joonik.com/posts", {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${realToken}`,
          },
          body: formData,
        });*/

        const response = yield axios.post(
          "https://api.joonik.com/posts",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
              Authorization: `Bearer ${realToken}`,
            },
          }
        );
        if (response.data) {
          console.log(response);
          getPosts();
        }
      } catch (e) {
        console.error("Failed to fetch", e);
      }
    });
    return {
      getPosts,
      addPosts,
    };
  });
