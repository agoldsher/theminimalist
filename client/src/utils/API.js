import axios from "axios";

export default {
  // Gets all books
  getPopPosts: function(city) {
    return axios.get("/api/posts/popularity/"+city);
  },
  getUserCity: function (userID){
    return axios.get("api/posts/city/"+userID)
  },
  saveNewCity:function(userID,city){
    console.log(`/api/posts/city/${userID}/${city}`)
    return axios.put(`/api/posts/city/${userID}/${city}`);
  },
  getCategoryPosts: function(category, city) {
    console.log("/api/posts/category/"+category+"/"+city)
    return axios.get("/api/posts/category/"+category+"/"+city);
  },
  // Gets the book with the given id
  getPost: function(id) {
    console.log(id)
    // axios.put("/api/posts/view/"+id)
    return axios.get("/api/posts/" + id);
  },

  search: function(search, city){
    return axios.get("/api/posts/search/"+search+"/"+city);
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
  },
  deletePost: function(id){
    axios.delete("/api/posts/"+id)
  }
};
