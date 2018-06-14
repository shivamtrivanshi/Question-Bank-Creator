import {http} from "./http";
import {ui} from "./ui";

//Get ALL Question/Answers on DOM load
document.addEventListener("DOMContentLoaded", getPosts);



function getPosts() {
    http.get("http://localhost:3000/posts")
    .then((resData) => {
        ui.showPosts(resData);
    }).catch((err) => {
        console.log(err);
    })
}
