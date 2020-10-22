import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { observer } from "mobx-react-lite";
import { useMst } from "../models/Root";
import { useHistory } from "react-router-dom";
import { Modal, notification } from "antd";
import { useForm } from "react-hook-form";

type ModalProps = {
  show?: boolean;
  onHandleOk?: any;
  onHandleClose?: any;
};

const ModalPost: React.FC<ModalProps> = observer((props) => {
  const { posts } = useMst();
  let history = useHistory();
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data.image);
    let formData = new FormData();

    for (const name in data) {
      if (name !== "image") {
        formData.append(name, data[name]);
      } else {
        formData.append("image", data.image[0], "image2.png");
      }
    }
    posts
      .addPosts(formData)
      .then((data) => {
        props.onHandleOk();
      })
      .catch((error) => {
        notification.error(error);
      });
  };
  console.log(errors);

  return (
    <>
      <Modal
        title="Add Post Modal"
        visible={props.show}
        footer={null}
        onCancel={props.onHandleClose}
        onOk={props.onHandleOk}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label
                    htmlFor="street_address"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    id="street_address"
                    name="title"
                    ref={register({ required: true })}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                  {errors.title && errors.title.type === "required" && (
                    <span>This is required</span>
                  )}
                </div>
                <div className="col-span-6">
                  <label
                    htmlFor="street_address"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Content
                  </label>
                  <textarea
                    id="street_address"
                    name="content"
                    ref={register({ required: true })}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                  {errors.content && errors.content.type === "required" && (
                    <span>This is required</span>
                  )}
                </div>
                <div className="col-span-6">
                  <label
                    htmlFor="street_address"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    ref={register({ required: true })}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                  {errors.image && errors.image.type === "required" && (
                    <span>This is required</span>
                  )}
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type={`submit`}
                className="py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
});

export default ModalPost;
