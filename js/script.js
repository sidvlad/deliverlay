document.querySelector('form-search').addEventListener('submit', function (e) {
  e.preventDefault()
  console.log("Search:", e.target.q.value)
})