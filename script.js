function openModal(modal) {
  modal.style.display = "block"; // Устанавливаем стиль отображения
  setTimeout(() => {
    modal.classList.add("show"); // Добавляем класс для анимации
  }, 10);
}

function closeModal(modal) {
  modal.classList.remove("show"); // Убираем класс для анимации
  setTimeout(() => {
    modal.style.display = "none"; // Скрываем модальное окно
  }, 500);
}

const modals = [
  {
    trigger: "modal_close",
    modal: "modal",
    closeButton: "closeModal",
  },
  {
    trigger: "question_roboto",
    modal: "question_modal_robot",
    closeButton: "questionCloseModal",
  },
  {
    trigger: "question_piano",
    modal: "question_modal_piano",
    closeButton: "pianoCloseModal",
  },
  {
    trigger: "question_picture",
    modal: "question_modal_picture",
    closeButton: "pictureCloseModal",
  },
];

modals.forEach(({ trigger, modal, closeButton }) => {
  const modalElement = document.getElementById(modal);
  const closeModalButton = document.getElementById(closeButton);

  // Открытие модального окна при нажатии на триггер
  document
    .getElementById(trigger)
    .addEventListener("click", () => openModal(modalElement));

  // Закрытие модального окна при нажатии на кнопку закрытия
  closeModalButton.addEventListener("click", () => closeModal(modalElement));

  // Закрытие модального окна при клике вне его
  window.addEventListener("click", (event) => {
    if (event.target === modalElement) {
      closeModal(modalElement);
    }
  });
});

// Остальной код для перетаскивания частей робота
const container = document.querySelector(".container_body.picture");
const pictureParts = document.querySelectorAll(".picture_part");
let picturePartIndex = 0;

container.addEventListener("mouseenter", () => {
  if (pictureParts[picturePartIndex]) {
    pictureParts[picturePartIndex].classList.add("visible");
    picturePartIndex++;
  }
});

const robotParts = document.querySelectorAll(".robot_part");
const container_roboto = document.querySelector(".container_body.roboto");

robotParts.forEach((part) => {
  part.addEventListener("mousedown", startDrag);
});

function startDrag(e) {
  const part = e.target;
  let offsetX = e.clientX - part.getBoundingClientRect().left;
  let offsetY = e.clientY - part.getBoundingClientRect().top;

  function dragMove(e) {
    const containerRect = container_roboto.getBoundingClientRect();
    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;

    if (newX < containerRect.left) newX = containerRect.left;
    if (newX + part.offsetWidth > containerRect.right)
      newX = containerRect.right - part.offsetWidth;
    if (newY < containerRect.top) newY = containerRect.top;
    if (newY + part.offsetHeight > containerRect.bottom)
      newY = containerRect.bottom - part.offsetHeight;

    part.style.left = `${newX - containerRect.left}px`;
    part.style.top = `${newY - containerRect.top}px`;
  }

  function dragEnd() {
    document.removeEventListener("mousemove", dragMove);
    document.removeEventListener("mouseup", dragEnd);
  }

  document.addEventListener("mousemove", dragMove);
  document.addEventListener("mouseup", dragEnd);
}
