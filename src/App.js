import React, {useEffect, useState } from "react";
import './App.scss';


function App() {

const [posts, setPosts] = useState([]);
const [newPost, setnewPost] = useState({title: '', body: ''});

useEffect(() => fetchPosts(),[])



//decomposition later
const [isLoading, setIsLoading] = useState(false)

const URL_API = 'https://jsonplaceholder.typicode.com/posts?_limit=10&_page=3';

const  fetchPosts = async (url) => {
    setIsLoading(true)
    try{
        const response = await fetch(URL_API);
        const result = await response.json()
        setPosts(result);
    } catch (e){
        console.log(e)
    }
    setIsLoading(false)
  
}

//




const deletePost = (id) => {
    setPosts([...posts].filter(el => el.id !== id));
}

const addPost = () => {
    if(newPost.title && newPost.body){
        setPosts([...posts, {...newPost, id: Date.now()}]);
        setnewPost({title: '', body: ''})
    } else return // later add message for user
    

}

return (
      <div className="App-header">
          <button onClick={addPost}>add post</button>

          
          <input type="text" 
                name="name" id="1" 
                value={newPost.body}
                onChange={e => {setnewPost({...newPost, body: e.target.value})}}/>
            <input type="text" 
                name="title" id="1" 
                value={newPost.title}
                onChange={e => {setnewPost({...newPost,title: e.target.value})}}/>

          {isLoading? 
          <h2 style={{textAlign:'center', color:'blue'}}>loading...</h2>
          :   
          posts.map((item, index) =>        
                   <div className="div" key={index}>
                       <div>post#{index + 1}</div><div>{item.title}</div>
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