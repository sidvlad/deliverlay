const nav = document.querySelector('.site-nav')
nav.classList.add('enhanced')

const submenus = nav.querySelectorAll(
  '.menu__item[data-has-children]'
)
const dropdowns = nav.querySelectorAll(
  '.menu__item[data-has-children] > .menu'
)

const icon = `
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    aria-hidden="true"
    class="menu__btn-icon"
  >
  <path fill="currentColor" d="M5.64645 8.64645c.19526-.19527.51184-.19527.7071 0L12 14.2929l5.6464-5.64645c.1953-.19527.5119-.19527.7072 0 .1952.19526.1952.51184 0 .7071L12 15.7071 5.64645 9.35355c-.19527-.19526-.19527-.51184 0-.7071Z"></path>
  </svg>
`

// Находим подменю, заменяем в нём span на кнопку
submenus.forEach((item) => {
  const dropdown = item.querySelector(':scope > .menu')
  dropdown.setAttribute('hidden', '')

  const button = item.querySelector(':scope > .menu__btn')

  // Добавляем иконку к кнопке, чтобы визуально было
  // понятно открыто меню или нет
  button.innerHTML += icon

  button.addEventListener('click', function (e) {
    toggleDropdown(button, dropdown)
  })

  // Обрабатываем нажатие на Esc
  dropdown.addEventListener('keydown', (e) => {
    e.stopImmediatePropagation()

    if (e.keyCode === 27 && focusIsInside(dropdown)) {
      toggleDropdown(button, dropdown)
      button.focus()
    }
  }, false)
})

function toggleDropdown(button, dropdown) {
  if (button.getAttribute('aria-expanded') === 'true') {
    button.setAttribute('aria-expanded', 'false')
    dropdown.setAttribute('hidden', '')
  } else {
    button.setAttribute('aria-expanded', 'true')
    dropdown.removeAttribute('hidden')
  }
}

function focusIsInside(element) {
  return element.contains(document.activeElement)
}

function collapseDropdownsWhenTabbingOutsideNav(e) {
  if (e.keyCode === 9 && !focusIsInside(nav)) {
    dropdowns.forEach(function (dropdown) {
      dropdown.setAttribute('hidden', '')
      const btn = dropdown.parentNode.querySelector('button')
      btn.setAttribute('aria-expanded', 'false')
    })
  }
}

function collapseDropdownsWhenClickingOutsideNav(e) {
  const target = e.target

  dropdowns.forEach(function (dropdown) {
    if (!dropdown.parentNode.contains(target)) {
      dropdown.setAttribute('hidden', '')
      const btn = dropdown.parentNode.querySelector('button')
      btn.setAttribute('aria-expanded', 'false')
    }
  });
}

// Закрываем навигацию, если протапались за её пределы
document.addEventListener('keyup', collapseDropdownsWhenTabbingOutsideNav)

// Закрываем навигацию, если кликнули вне навигации
window.addEventListener('click', collapseDropdownsWhenClickingOutsideNav)
