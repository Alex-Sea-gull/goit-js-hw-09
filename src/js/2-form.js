'use strict';

const chekForm = document.querySelector(".form-feedback");
const FEEDBACK_KEY = "user";

// * Создаем переменную для хранения електронной почты и сообщения
let formData = {
  email: "",
  message: ""
};


//* Сохраняем данные из обьекта formData в localStorage под указанным ключом FEEDBACK_KEY
function saveFormDataToLocalStorage() {
  localStorage.setItem(FEEDBACK_KEY, JSON.stringify(formData));
}

//* загрузка данных из localStorage в объект formData и последующее обновление полей формы на основе этих данных
function loadFormDataFromLocalStorage() {
  const savedData = localStorage.getItem(FEEDBACK_KEY);
  if (savedData) {
    formData = JSON.parse(savedData);
    updateFormFields();
  }
}

//* обновляем значение полей формы на основе данных из объекта formData
function updateFormFields() {
  chekForm.elements.email.value = formData.email;
  chekForm.elements.message.value = formData.message;
}

// * добавляем слушатель событий на форму
chekForm.addEventListener('input', (event) => {
  const { name, value } = event.target;
  if (name in formData) {
    formData[name] = value.trim();
    saveFormDataToLocalStorage();
  }
});

// * добавляем слушатель событий на отправку формы
chekForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (formData.email.trim() === '' || formData.message.trim() === '') {
    alert('Please fill in all fields');
    return;
  }

  console.log(formData);
// *Удаляем данные после отправки формы
  localStorage.removeItem(FEEDBACK_KEY);
  formData = { email: "", message: "" };
  updateFormFields();
});

loadFormDataFromLocalStorage();
  