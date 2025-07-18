const form = document.getElementById('recipe-form');
const titleInput = document.getElementById('title');
const ingredientInput = document.getElementById('ingredient');
const methodInput = document.getElementById('method');
const imageInput = document.getElementById('image');
const preview = document.getElementById('ingredient-preview');
const recipeList = document.getElementById('recipe-list');
const submitBtn = document.getElementById('submit-button');

const API_URL = 'http://localhost:3000/recipes';

let currentIngredients = [];
let editId = null;
let currentImage = null;

function updateIngredientPreview() {
  preview.innerHTML = '';
  currentIngredients.forEach((ing, i) => {
    const span = document.createElement('span');
    span.textContent = ing;

    const remove = document.createElement('span');
    remove.textContent = '×';
    remove.className = 'remove';
    remove.onclick = () => {
      currentIngredients.splice(i, 1);
      updateIngredientPreview();
    };

    span.appendChild(remove);
    preview.appendChild(span);
  });
}

function renderRecipes(recipes) {
  recipeList.innerHTML = '';

  recipes.forEach(recipe => {
    const card = document.createElement('div');
    card.className = 'recipe-card';

    const img = document.createElement('img');
    img.src = recipe.image || 'https://via.placeholder.com/300x200?text=No+Image';
    img.alt = recipe.title;

    const content = document.createElement('div');
    content.className = 'content';

    const title = document.createElement('h3');
    title.textContent = recipe.title;

    const ul = document.createElement('ul');
    recipe.ingredients.forEach(ing => {
      const li = document.createElement('li');
      li.textContent = ing;
      ul.appendChild(li);
    });

    const method = document.createElement('p');
    method.innerHTML = `<strong>Method:</strong> ${recipe.method}`;

    const actions = document.createElement('div');
    actions.className = 'recipe-actions';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit Details';
    editBtn.className = 'edit';
    editBtn.onclick = () => {
      titleInput.value = recipe.title;
      methodInput.value = recipe.method;
      currentIngredients = [...recipe.ingredients];
      currentImage = recipe.image;
      updateIngredientPreview();
      editId = recipe.id;
      submitBtn.textContent = 'Update Recipe';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete';
    deleteBtn.onclick = () => {
      if (confirm('Are you sure you want to delete this recipe?')) {
        fetch(`${API_URL}/${recipe.id}`, {
          method: 'DELETE'
        }).then(loadRecipes);
      }
    };

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    content.appendChild(title);
    content.appendChild(ul);
    content.appendChild(method);
    content.appendChild(actions);

    card.appendChild(img);
    card.appendChild(content);
    recipeList.appendChild(card);
  });
}

function loadRecipes() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => renderRecipes(data));
}

ingredientInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter' && this.value.trim() !== '') {
    e.preventDefault();
    currentIngredients.push(this.value.trim());
    this.value = '';
    updateIngredientPreview();
  }
});

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const reader = new FileReader();
  const file = imageInput.files[0];

  function saveToAPI(imageData) {
    const recipeData = {
      title: titleInput.value.trim(),
      ingredients: [...currentIngredients],
      method: methodInput.value.trim(),
      image: imageData
    };

    const url = editId ? `${API_URL}/${editId}` : API_URL;
    const method = editId ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipeData)
    })
      .then(() => {
        form.reset();
        currentIngredients = [];
        currentImage = null;
        editId = null;
        submitBtn.textContent = 'Save Recipe';
        updateIngredientPreview();
        loadRecipes();
      });
  }

  if (file) {
    reader.onload = () => saveToAPI(reader.result);
    reader.readAsDataURL(file);
  } else {
    saveToAPI(currentImage);
  }
});

// Initial load
loadRecipes();
