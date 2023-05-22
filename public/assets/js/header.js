document.addEventListener('DOMContentLoaded', function () {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', '../../components/header.html', true)
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const headerElement = document.querySelector('header')
      if (headerElement) {
        headerElement.innerHTML = xhr.responseText
      }
    }
  }
  xhr.send()
})
