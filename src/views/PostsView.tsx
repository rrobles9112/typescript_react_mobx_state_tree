import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { observer } from "mobx-react-lite";
import { useMst } from "../models/Root";
import ModalPost from "../components/Modal";
import { Card, Button } from "antd";

type PostsProps = {};

const PostsView: React.FC<PostsProps> = () => {
  const { posts } = useMst();
  const loadPosts = useEffect(() => {
    posts.getPosts();
  }, []);

  const [visible, setvisible] = useState(false);

  const handleOk = (e) => {
    console.log(e);
    setvisible(false);
  };

  const handleCancel = (e) => {
    console.log(e);
    setvisible(false);
  };

  return (
    <>
      <Header />
      <ModalPost
        show={visible}
        onHandleOk={handleOk}
        onHandleClose={handleCancel}
      />
      <div className="lg:container lg:mx-auto p-5">
        <Button type="primary" onClick={(e) => setvisible(true)}>
          Add Post
        </Button>
        <div className="max-h-full w-full bg-white p-10">
          <div className="flex-row">
            {posts.posts.map((item, index) => {
              return (
                <div
                  className="max-w-full rounded overflow-hidden shadow-lg flex mb-15"
                  key={index}
                >
                  <div className="w-1/3">
                    <img
                      style={{ maxWidth: "50%", maxHeight: "100px" }}
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
