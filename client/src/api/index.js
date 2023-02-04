//add proxy in package.json
import axios from 'axios';
const API = axios.create({ baseURL: `http://localhost:5000` });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {      
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).credential}`;
  }
  return req;
});


export const fetchPosts = (space) => API.get(`/posts/${space}`);
export const createPosts = (space,newPost) => API.post(`/posts/${space}`, newPost);
export const likePost = (postId, optionId) => API.patch(`/posts/${postId}/likePost/${optionId}`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (postId, space) => API.delete(`/posts/${postId}/${space}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const signUpGoogle = (formData) => API.post('/user/signupgoogle', formData);  

export const create = () => API.get('/room/create');