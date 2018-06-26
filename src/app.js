import {http} from "./http";
import {ui} from "./ui";

//Get ALL Question/Answers on DOM load
document.addEventListener("DOMContentLoaded", getPosts);

//Listen For Add Post
document.querySelector(".post-submit").addEventListener("click", addPost);

//Listen For Delete Post
document.querySelector("#posts").addEventListener("click", deletePost);

//Listen For Edit Post
document.querySelector("#posts").addEventListener("click", editPost);

//Listen For Back to Add State
document.querySelector(".card-form").addEventListener("click", cancelEdit);

//Grab Search text
document.querySelector("#search-text").addEventListener("keyup", searchQuestion);





function getPosts() {
    http.get("http://localhost:3000/posts")
    .then((resData) => {
        ui.showPosts(resData);
    })
    .catch((err) => {
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

    //Validate form
    if(question === "" || answer === "") {
        ui.showAlert("Please Fill Out All Fields", "alert alert-danger");
    }else {

        if(id === "") {
            //Create Post 
            http.post("http://localhost:3000/posts", data)
            .then((data) => {
                ui.showAlert("Answer Added", "alert alert-success");
                ui.clearFields();
                getPosts();
            }).catch((err) => {
                console.log(err);
            });
        }else {
            //Update Post
            http.put(`http://localhost:3000/posts/${id}`, data)
            .then((data) => {
                ui.showAlert("Answer Updated", "alert alert-success");
                ui.clearFields();
                ui.changeFormState("add");
                getPosts();
            }).catch((err) => {
                console.log(err);
            });
        }
    }
}



function deletePost(e) {
    if(e.target.parentElement.classList.contains("delete")) {
        const id = e.target.parentElement.dataset.id;

        if(confirm("Are You Sure?")) {
            http.delete(`http://localhost:3000/posts/${id}`)
            .then((resData) => {
                ui.showAlert("Successfully Deleted", "alert alert-success");
                getPosts();
            }).catch((err) => {
                console.log(err);
            });
        }   
    }
    e.preventDefault();
}


function editPost(e) {
    if(e.target.parentElement.classList.contains("edit")) {
        const id = e.target.parentElement.dataset.id;
        const question = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const answer = e.target.parentElement.previousElementSibling.textContent;

        const data = {
            id: id,
            question: question,
            answer: answer
        }

        ui.fillForm(data);
    }
    e.preventDefault()
}





function cancelEdit(e) {
    if(e.target.classList.contains("post-cancel")) {
        ui.changeFormState("add");
    }
    e.preventDefault();
}


function searchQuestion(e) {
    const searchText = e.target.value.toLowerCase();
    const posts = document.querySelectorAll(".display-post");
    posts.forEach((question) => {
        const questionText = question.querySelector(".search-title").textContent;
        if(questionText.toLowerCase().indexOf(searchText) != -1) {
            question.style.display = "block";
        }else {
            question.style.display = "none";
        }
    });

}