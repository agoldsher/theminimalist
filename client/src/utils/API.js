import axios from "axios";

export default {
  // Gets all books
  getPopPosts: function() {
    return axios.get("/api/posts/popularity");
  },
  getCategoryPosts: function(category) {
    return axios.get("/api/posts/category/"+category);
  },
  // Gets the book with the given id
  getPost: function(id) {
    axios.put("/api/posts/view/"+id)
    return axios.get("/api/posts/" + id);
  },

  search: function(search){
    return axios.get("/api/posts/search/"+search);
  },
 
    savePost: function(data) {
        return axios.post("/api/posts", data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
    }
};
