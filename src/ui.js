class UI {

    constructor() {
        this.posts = document.querySelector("#posts");
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
}


export const ui = new UI();