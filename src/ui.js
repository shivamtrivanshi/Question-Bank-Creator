class UI {

    constructor() {
        this.posts = document.querySelector("#posts");
        this.questionInput = document.querySelector("#question");
        this.answerInput = document.querySelector("#answer");
    }

    showPosts(posts) {
        let output = "";
        posts.forEach((post) => {
            output += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h4 class="card-title">${post.question}</h4>
                        <p>${post.answer}</p>
                        <a href="#" class="edit card-link" data-id="${post.id}">
                        <i class="fa fa-pencil"></i>
                        </a>
                        <a href="#" class="delete card-link" data-id="${post.id}">
                            <i class="fa fa-remove"></i>
                        </a>
                    </div>
                </div>
            `;
        });
        this.posts.innerHTML = output;
    }

    showAlert(message, className) {
        //Clear CurrentAlert
        this.clearAlert();
        //Create div
        const div = document.createElement("div");
        //Add Classes
        div.className = className;
        //Add Message
        div.appendChild(document.createTextNode(message));
        //Grab parents
        const container = document.querySelector(".postContainer");
        const cardForm = document.querySelector(".card-form");
        //Insert Before
        container.insertBefore(div, cardForm);
        //Set Timeout
        setTimeout(() => {
            document.querySelector(".alert").remove();
        }, 3000);
    }

    clearAlert() {
        const currentAlert = document.querySelector(".alert")
        if(currentAlert) {
            currentAlert.remove();
        }
    }

    clearFields() {
        this.questionInput.value = "";
        this.answerInput.value = "";
    }
}


export const ui = new UI();