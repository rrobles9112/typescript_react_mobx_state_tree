import React from "react";
import Header from "../components/Header";

type PostsProps = {};

const PostsView: React.FC<PostsProps> = () => {
  return (
    <>
      <Header />
      <div className="lg:container lg:mx-auto p-5">
        <div className="max-h-full w-full bg-white p-10">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
            assumenda cumque delectus dicta dolorum error, excepturi minus
            molestias nemo non optio placeat provident reprehenderit sed tempore
            temporibus vel veritatis voluptas.
          </p>
        </div>
      </div>
    </>
  );
};

export default PostsView;
