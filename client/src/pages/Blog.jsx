import React, { useState, useEffect } from "react";
import Posts from "../shared/components/blog/posts/Posts";
import AddPost from "../shared/components/blog/forms/add-post/AddPost";
import Button from "../shared/ui/button/Button";
import Modal from "../shared/ui/modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import { loadPost, addNewPost } from "../shared/store/blog/postSlice";

export default function Blog() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");

  const posts = useSelector((state) => state.post.posts);
  const dispatch = useDispatch();

  const formSubmit = (event) => {
    event.preventDefault();
    const post = {
      title: inputValue,
      description: textareaValue,
    };
    dispatch(addNewPost(post));
    setOpen(false);
  };

  useEffect(() => {
    dispatch(loadPost());
  }, [dispatch]);

  return (
    <main className="w-full flex flex-col max-w-2xl m-auto">
      <div className="p-6 flex items-center justify-between">
        <h1 className="font-bold text-5xl">Блог</h1>
        <Button text="Добавить" onClick={() => setOpen(true)} />
      </div>
      {open && (
        <Modal title="Добавить пост" setOpen={setOpen}>
          <AddPost
            submit={formSubmit}
            inputState={inputValue}
            inputChange={(event) => setInputValue(event.target.value)}
            textAreaState={textareaValue}
            textAreaChange={(event) => setTextareaValue(event.target.value)}
            firstButtonText="Добавить"
            secondButtonText="Отмена"
            secondButtonAction={() => setOpen(false)}
            firstButtonType="submit"
          />
        </Modal>
      )}
      <Posts posts={posts} />
    </main>
  );
}