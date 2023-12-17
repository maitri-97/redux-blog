import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPostsQuery } from "./postsSlice";
import { useUpdatePostMutation, useDeletePostMutation } from "./postsSlice";
import { useGetUsersQuery } from "../users/usersSlice";
import Loading from "../../components/Loading";
import { IMAGE_BASEURL } from "./PostsExcerpt";

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const {
    post,
    isLoading: isLoadingPosts,
    isSuccess,
  } = useGetPostsQuery("getPosts", {
    selectFromResult: ({ data, isLoading, isSuccess }) => ({
      post: data?.entities[postId],
      isLoading,
      isSuccess,
    }),
  });

  const { data: users, isSuccess: isSuccessUsers } =
    useGetUsersQuery("getUsers");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setTitle(post?.title);
      setContent(post?.body);
      setUserId(post?.userId);
    }
  }, [isSuccess, post?.title, post?.body, post?.userId]);

  if (isLoadingPosts) return <Loading />;

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(Number(e.target.value));

  const canSave = [title, content, userId].every(Boolean) && !isLoading;

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        await updatePost({
          id: post?.id,
          title,
          body: content,
          userId,
        }).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postId}`);
      } catch (err) {
        console.error("Failed to save the post", err);
      }
    }
  };

  let usersOptions;
  if (isSuccessUsers) {
    usersOptions = users?.ids?.map((id) => (
      <option key={id} value={id}>
        {users.entities[id].name}
      </option>
    ));
  }

  const onDeletePostClicked = async () => {
    try {
      await deletePost({ id: post?.id }).unwrap();

      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (err) {
      console.error("Failed to delete the post", err);
    }
  };

  return (
    <div className="container">
      <h2 className="text-capitalize mb-3">Edit Blog</h2>
      <img
        src={`${IMAGE_BASEURL}${postId}`}
        alt=""
        className="w-100 object-fit-cover mb-3 h-250px"
      />
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
        <div className="d-flex justify-content-end">
          <button
            type="button"
            onClick={onSavePostClicked}
            disabled={!canSave}
            className="btn btn-dark me-3"
          >
            Update
          </button>
          <button
            type="button"
            onClick={onDeletePostClicked}
            className="btn btn-light"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPostForm;
