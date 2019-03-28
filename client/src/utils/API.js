import axios from "axios";

export default {
    savePost: function(data) {
        return axios.post("/api/posts", data)
    }
};