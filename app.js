const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submit = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");
let editElement;
let editToggel = false;
let editId = "";

form.addEventListener("submit",mainDisplay);
clearBtn.addEventListener("click", clearItem);

function mainDisplay(e) {
	e.preventDefault();
	
	let value = grocery.value;
	let id = new Date().getTime();

	if(value && !editToggel){
		createItem(value, id);
		validation("create new item","valid");
		cleanDefault();
		isShow();
	}else if(value && editToggel){
		console.log(55)
	}else {
		validation("empty value","invalid");
	}
}

function createItem(value, id) {
	const article = document.createElement("article");
	const attr = document.createAttribute("data-id");
	attr.value = id;
	article.setAttributeNode(attr);
	article.classList.add("item");
	article.innerHTML = `<p class="item__title">itme</p>
		                  <div class="item__btns">
		                    <button type="button" class="item__btn item__btn--edit">
		                        <i class="fas fa-edit"></i>  
		                    </button>
		                    <button type="button" class="item__btn item__btn--trash">
		                        <i class="fas fa-trash"></i>  
		                    </button>
                  		   </div>`;
    list.appendChild(article);

    const editBtn = article.querySelector(".item__btn--edit");
    const deletBtn = article.querySelector(".item__btn--trash");

    // editBtn.addEventListener("click", editElement);
    deletBtn.addEventListener("click", deletElement);
}

function validation(text,value) {
	alert.innerHTML = text;
	alert.classList.add(`alert-${value}`);

	setTimeout(()=> {
		alert.innerHTML = "";
		alert.classList.remove(`alert-${value}`);
	}, 1000);
}

function clearItem () {
	let items = document.querySelectorAll(".item");

	if(items.length > 0) {
		items.forEach(item => {
			list.removeChild(item);
		})

		container.classList.remove("show");
		validation("clear items", "invalid");
	}
}

function isShow () {
	const items = document.querySelectorAll(".item");
		if(items.length > 0){
    		container.classList.add("show");
    	}else {
    		container.classList.remove("show");
    	}
}
function cleanDefault() {
	grocery.value = "";
	editToggel = false;
	editId = "";
	submit.textContent = "submit";
}

function deletElement(e) {
	
	let parent = e.currentTarget.parentElement.parentElement;
	list.removeChild(parent);
	const items = document.querySelectorAll(".item");
	if(items.length === 0){
		container.classList.remove("show");
	}

	validation("removed item", "invalid");
}