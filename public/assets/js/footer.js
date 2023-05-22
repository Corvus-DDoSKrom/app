document.addEventListener('DOMContentLoaded', function () {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', '../components/footer.html', true)
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const footerElement = document.getElementById('footer')
      if (footerElement) {
        footerElement.innerHTML = xhr.responseText
      }
    }
  }
  xhr.send()
})
