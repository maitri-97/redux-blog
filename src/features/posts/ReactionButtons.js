import { useAddReactionMutation } from './postsSlice'

const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}

const ReactionButtons = ({ post }) => {
    const [addReaction] = useAddReactionMutation()

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type="button"
                className="bg-white border-0 p-0 me-2 mb-0 fs-14px"
                onClick={(e) => {
                    e.stopPropagation();
                    const newValue = post?.reactions[name] + 1;
                    addReaction({ postId: post?.id, reactions: { ...post?.reactions, [name]: newValue } })
                }}
            >
            {emoji}{post?.reactions[name]}
            </button>
        )
    })

    return <div>{reactionButtons}</div>
}
export default ReactionButtons