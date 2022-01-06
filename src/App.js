import React, { useState } from "react";
import './App.scss';


function App() {

const [posts, setPosts] = useState([]);
const [body, setInput] = useState('');
const [title, setTitle] = useState('');

const  fetchPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10&_page=3');
    const result = await response.json()
        setPosts(result);
}
const deletePost = (id) => {
    setPosts([...posts].filter(el => el.id !== id));
}
const addPost = (e) => {
    const newPost = {
        title, body, id: Date.now()
    }
    setPosts([...posts, newPost]);
}

return (
      <div className="App-header">
          <button onClick={fetchPosts}>Get posts</button>
          <button onClick={() => addPost(posts)}>add post</button>
          <input type="text" 
                name="name" id="1" 
                value={body}
                onChange={e => {setInput(e.target.value)}}/>
            <input type="text" 
                name="title" id="1" 
                value={title}
                onChange={e => {setTitle(e.target.value)}}/>
          {posts.map((item, index) =>        
                   <div className="div" key={index}>
                       <div>post#{index}</div><div>{item.title}</div>
                       <div>{item.body}</div>
                       <span>user ID{item.userId}</span>
                       <span>Id {item.id}</span>
                       <button onClick={() => deletePost(item.id)}>DELETE POST</button>
                    </div>

          )}
      </div>
    );
}
export default App;