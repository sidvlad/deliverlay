document.querySelector('form-search').addEventListener('submit', function (e) {
  e.preventDefault()
  console.log("Search:", e.target.q.value)
})

// Функция для форматирования числа лайков
function formatLikes(likes) {
  if (likes >= 1_000_000) {
      return (likes / 1_000_000).toFixed(1) + "M";
  } else if (likes >= 1000) {
      return (likes / 1000).toFixed(1) + "K";
  } else {
      return likes.toString();
  }
}

// Функция для обновления формата конкретного элемента
function updateLikeElement(element) {
  const likes = parseInt(element.textContent, 10);
  if (!isNaN(likes)) {
      element.textContent = formatLikes(likes);
  }
}

// Инициализация наблюдателя
function observeLikes() {
  const likeElements = document.querySelectorAll('.like-count');

  likeElements.forEach(element => {
      // Обновляем значение при загрузке
      updateLikeElement(element);

      // Создаём MutationObserver для отслеживания изменений
      const observer = new MutationObserver(() => {
          updateLikeElement(element);
      });

      // Наблюдаем за изменениями текста элемента
      observer.observe(element, { childList: true, subtree: true });
  });
}

// Запуск наблюдения после загрузки страницы
document.addEventListener('DOMContentLoaded', observeLikes);