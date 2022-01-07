import React, {useEffect, useMemo, useState } from "react";
import './App.scss';
import { getPagesCount } from "./utils/getPagesCount";
import {getPagesArray} from "./utils/getPagesCount";

function App() {

const [posts, setPosts] = useState([]);
const [newPost, setnewPost] = useState({title: '', body: ''});





//decomposition will be later

const [isLoading, setIsLoading] = useState(false) // loading
const [limit, setLimit] = useState(10); //posts on page
const [page, setPage] = useState(1);//statrt from first page
const [pagesCount, setPagesCount] = useState(0);
const [totalCount, setTotalCount] = useState(0);


const URL_API = 'https://jsonplaceholder.typicode.com/posts/';

const  fetchPosts = async (url, limit = 10, page = 1) => {
    setIsLoading(true)
    try{
        const response = await fetch(`${url}?_limit=${limit}&_page=${page}`);
        const result = await response.json();
        setTotalCount(response.headers.get('X-Total-Count'));
        setPosts(result);    
    } catch (e){
        console.log(e)
    }
    setIsLoading(false)  
}

useEffect(() => fetchPosts(URL_API, limit, page),[])
//pagination

useMemo(()=> {
        setPagesCount(getPagesCount(totalCount, limit));        
}, [totalCount]);

let pagesArray = getPagesArray(pagesCount);   


const changePage = (page) => {
    fetchPosts(URL_API, limit, page)
    setPage(page)
}


//working with posts

const deletePost = (id) => {
    setPosts([...posts].filter(el => el.id !== id));
}

const addPost = () => {
    if(newPost.title && newPost.body){
        setPosts([...posts, {...newPost, id: Date.now()}]);
        setnewPost({title: '', body: ''})
    } else return // later add message for user
    
// 
}
return (
      <div className="App-header">
          <div className="addPost">
            
            <input type="text" 
                    name="name" id="1" 
                    value={newPost.body}
                    onChange={e => {setnewPost({...newPost, body: e.target.value})}}/>
                <input type="text" 
                    name="title" id="1" 
                    value={newPost.title}
                    onChange={e => {setnewPost({...newPost,title: e.target.value})}}/>
                <button onClick={addPost}>ADD POST</button>
          </div>
          

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
          {pagesArray.map((p)=> <span 
          key={p} 
          className={page === p ? 'pages': 'pages current'} 
          onClick={() => changePage(p) } 
          >{p}</span>)}
      </div>
    );
}
export default App;