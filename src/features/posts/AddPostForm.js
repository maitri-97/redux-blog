import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewPostMutation } from "./postsSlice";
import { useGetUsersQuery } from "../users/usersSlice";

const AddPostForm = () => {
  const [addNewPost, { isLoading }] = useAddNewPostMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const { data: users, isSuccess } = useGetUsersQuery("getUsers");

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const canSave = [title, content, userId].every(Boolean) && !isLoading;

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        await addNewPost({ title, body: content, userId }).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate("/");
      } catch (err) {
        console.error("Failed to save the post", err);
      }
    }
  };

  let usersOptions;
  if (isSuccess) {
    usersOptions = users?.ids?.map((id) => (
      <option key={id} value={id}>
        {users.entities[id].name}
      </option>
    ));
  }

  return (
    <div className="container">
      <h2 className="text-capitalize mb-3">Add a New Blog</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="blogTitle" className="form-label fw-semibold mb-1">
            Blog Title:
          </label>
          <input
            type="text"
            id="blogTitle"
            name="blogTitle"
            value={title}
            onChange={onTitleChanged}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="postAuthor" className="form-label fw-semibold mb-1">
            Author:
          </label>
          <select
            id="postAuthor"
            value={userId}
            onChange={onAuthorChanged}
            className="form-control"
          >
            <option value=""></option>
            {usersOptions}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="postContent" className="form-label fw-semibold mb-1">
            Content:
          </label>
          <textarea
            id="postContent"
            name="postContent"
            value={content}
            onChange={onContentChanged}
            className="form-control"
            rows={5}
          />
        </div>
        <button type="button" onClick={onSavePostClicked} disabled={!canSave} className="btn btn-dark">
          Save Post
        </button>
      </form>
    </div>
  );
};
export default AddPostForm;
