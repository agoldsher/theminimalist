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
  
  // // Deletes the book with the given id
  // deleteBook: function(id) {
  //   return axios.delete("/api/books/" + id);
  // },
  // // Saves a book to the database
  // saveBook: function(bookData) {
  //   return axios.post("/api/books", bookData);
  // }
    savePost: function(data) {
        return axios.post("/api/posts", data)
    }
};
