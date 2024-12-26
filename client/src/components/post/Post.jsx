import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const PF = "https://th.bing.com/th/id/OIP.kOZ_NRF4sUGXv_NCK6X1fwHaFH?w=288&h=197&c=7&r=0&o=5&dpr=1.3&pid=1.7";
  return (
    <div className="post">
      <img className="postImg" src={post.photo ? `${PF}${post.photo}` : PF} alt="" />
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c, index) => (
            <span className="postCat" key={c._id || index}>{c.name}</span>
          ))} 
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {post.createdAt ? new Date(post.createdAt).toDateString() : "Unknown Date"};  
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}