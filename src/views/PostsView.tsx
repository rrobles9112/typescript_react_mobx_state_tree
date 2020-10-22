import React, { useEffect } from "react";
import Header from "../components/Header";
import { observer } from "mobx-react-lite";
import { useMst } from "../models/Root";
import ModalPost from "../components/Modal";
import { Card } from "antd";

type PostsProps = {};

const PostsView: React.FC<PostsProps> = () => {
  const { posts } = useMst();
  const loadPosts = useEffect(() => {
    posts.getPosts();
  }, []);

  return (
    <>
      <Header />
      <ModalPost />
      <div className="lg:container lg:mx-auto p-5">
        <div className="max-h-full w-full bg-white p-10">
          <div className="flex-row">
            {posts.posts.map((item) => {
              return (
                <div className="max-w-sm rounded overflow-hidden shadow-lg flex">
                  <div className="w-1/3">
                    <img
                      className="w-full"
                      src={item.image}
                      alt="Sunset in the mountains"
                    />
                  </div>

                  <div className="px-6 py-4 w-2/3">
                    <div className="font-bold text-xl mb-2">{item.title}</div>
                    <p className="text-gray-700 text-base">{item.content}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostsView;
