import { useEffect, useState } from 'react';

function ContentModeration() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from backend
    setPosts([
      { id: 1, author: "John Doe", content: "Selling fresh apples!", flagged: true },
      { id: 2, author: "Jane Smith", content: "Organic farming tips", flagged: false },
    ]);
  }, []);

  const removePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Content Moderation</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id} className="border p-2 mb-2 rounded">
            <strong>{post.author}:</strong> {post.content}
            {post.flagged && (
              <button 
                onClick={() => removePost(post.id)} 
                className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContentModeration;
