class UI {

    constructor() {
        this.posts = document.querySelector("#posts");
        this.questionInput = document.querySelector("#question");
        this.answerInput = document.querySelector("#answer");
        this.idInput = document.querySelector("#id");
        this.submitBtn = document.querySelector(".post-submit");
    }

    showPosts(posts) {
        let output = "";
        posts.forEach((post) => {
            output += `
                <div class="card display-post mb-3">
                    <div class="card-body">
                        <h4 class="card-title search-title capitalize">${post.question}</h4>
                        <pre class="capitalize">${post.answer}</pre>
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

    fillForm(data) {
        this.questionInput.value = data.question;
        this.answerInput.value = data.answer;
        this.idInput.value = data.id;

        this.changeFormState("edit");
    }

    changeFormState(type) {
        if(type === "edit") {
            this.submitBtn.textContent = "Update Post";
            this.submitBtn.className = "post-submit btn btn-warning btn-block";

            //create cancel button
            const button = document.createElement("button");

            //add classes
            button.className = "post-cancel btn btn-light btn-block mt-2";

            //add text
            button.appendChild(document.createTextNode("Cancel Edit"));
            
            

            //Get parent
            const container = document.querySelector(".card-form");
            const endForm = document.querySelector(".end-form");

            //Append Before
            container.insertBefore(button, endForm);
        }else {
            this.submitBtn.textContent = "Save";
            this.submitBtn.className = "btn btn-primary btn-block post-submit";

            //Remove Cancel btn
            if(document.querySelector(".post-cancel")) {
                document.querySelector(".post-cancel").remove();
            }

            this.clearIdInput();

            this.clearFields();
        }
    }

    clearIdInput() {
        this.idInput.value = "";
    }

}


export const ui = new UI();