import axios from "axios";

export default {
  // Gets all books
  getPopPosts: function(city) {
    return axios.get("/api/posts/popularity/"+city);
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
  getZipCode: function (data) {
    const clientKey = "js-Gv6oLCU2bq6FL7gNIGPgkkHBpbgo3mYFESmQ3IokbdqBN136IMhyQB2hyr1wfres";
    return axios.get(`https://www.zipcodeapi.com/rest/${clientKey}/info.json/${data}/radians`);
  },
 
    savePost: function(data) {
        return axios.post("/api/posts", data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
    }
};
