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
    let obj = {zipcode: data}
    return axios.post("/api/zipcode/", obj);
  },
 
  savePost: function(data) {
    return axios.post("/api/posts", data, {
      headers: {
        'Content-Type': 'multipart/form-data'
       }
    })
  },
  deletePost: function(id){
    return axios.delete("/api/posts/"+id)
  }
};
