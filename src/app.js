import {http} from "./http";
import {ui} from "./ui";

//Get ALL Question/Answers on DOM load
document.addEventListener("DOMContentLoaded", getPosts);

//Listen For Add Post
document.querySelector(".post-submit").addEventListener("click", addPost);



function getPosts() {
    http.get("http://localhost:3000/posts")
    .then((resData) => {
        ui.showPosts(resData);
    }).catch((err) => {
        console.log(err);
    })
}


function addPost() {

    const question = document.querySelector("#question").value;
    const answer = document.querySelector("#answer").value;
    const id = document.querySelector("#id").value;

    const data = {
        question: question,
        answer: answer
    }


    http.post("http://localhost:3000/posts", data)
    .then((data) => {
        ui.showAlert("Answer Added", "alert alert-success");
        ui.clearFields();
        getPosts();
    }).catch((err) => {
        console.log(err);
    })
}
