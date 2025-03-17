function openModal(modal) {
  modal.style.display = "block";
  setTimeout(() => {
    modal.classList.add("show");
  }, 10);
}

function closeModal(modal) {
  console.log("modal.classList", modal.classList);
  modal.classList.remove("show");
  setTimeout(() => {
    modal.style.display = "none";
    if (modal.classList[0] === "modal") {
      modal.remove();
    }
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

// Добавляем обработчики событий для mouse и touch
robotParts.forEach((part) => {
  part.addEventListener("mousedown", startDrag);
  part.addEventListener("touchstart", startDrag); // Для сенсорных устройств
});

function startDrag(e) {
  const part = e.target;
  let offsetX, offsetY;

  // Проверяем, какое событие было вызвано
  if (e.type === "touchstart") {
    const touch = e.touches[0];
    offsetX = touch.clientX - part.getBoundingClientRect().left;
    offsetY = touch.clientY - part.getBoundingClientRect().top;

    // Предотвращаем дальнейшую обработку события
    e.preventDefault();
  } else {
    offsetX = e.clientX - part.getBoundingClientRect().left;
    offsetY = e.clientY - part.getBoundingClientRect().top;
  }

  function dragMove(e) {
    const containerRect = container_roboto.getBoundingClientRect();
    let newX, newY;

    // Определяем координаты в зависимости от типа события
    if (e.type === "touchmove") {
      const touch = e.touches[0];
      newX = touch.clientX - offsetX;
      newY = touch.clientY - offsetY;
    } else {
      newX = e.clientX - offsetX;
      newY = e.clientY - offsetY;
    }

    // Ограничиваем перемещение внутри контейнера
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
    document.removeEventListener("touchmove", dragMove);
    document.removeEventListener("touchend", dragEnd);
  }

  document.addEventListener("mousemove", dragMove);
  document.addEventListener("mouseup", dragEnd);
  document.addEventListener("touchmove", dragMove);
  document.addEventListener("touchend", dragEnd);
}
