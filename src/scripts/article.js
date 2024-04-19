document.addEventListener('DOMContentLoaded', () => {
  const articleContentElement = document.querySelector('article');
  const urlParams = new URLSearchParams(window.location.search);
  const articleName = urlParams.get('id');


  if (articleName) {
    fetch(`articles/${articleName}.txt`)
      .then(response => response.text())
      .then(data => {
        const formattedContent = formatArticleContent(data);
        articleContentElement.innerHTML = formattedContent;
      })
      .catch(error => {
        console.error('Error fetching article:', error);
        articleContentElement.innerHTML = `<p>Error loading article content.</p>`;
      });
  }
  else{
    articleContentElement.innerHTML = `<section class="center"><h1>No or invalid article selected</h1>
    <p>Provide a valid article ID to display an article.</p></section>`;
  }
});

function formatArticleContent(text) {
  const titleElement = document.querySelector('title');
  const lines = text.split('\n');
  let formattedText = '';

  for (const line of lines) {
    if (line.startsWith('#title:')) {
      formattedText += `<h1>${line.slice(7).trim()}</h1>`; 
      titleElement.textContent = `${line.slice(7).trim()}` + ' / Basic Tech Guy';
    } else if (line.startsWith('#subtitle:')) {
      formattedText += `<h2>${line.slice(11).trim()}</h2>`;
    } else if (line.startsWith('#img:')) {
      // Extract image details (filename, width, height)
      const parts = line.slice(5).trim().split(',');
      const filename = parts[0].trim();
      const width = parts.length > 1 ? parseInt(parts[1].trim()) : undefined;
      const height = parts.length > 2 ? parseInt(parts[2].trim()) : undefined;

      let imageStyle = '';
      if (width && height) {
        imageStyle = `width: ${width}px; height: ${height}px;`;
      }

      formattedText += `<img class="inlineImg" src="src/images/${filename}" alt="" style="${imageStyle}"></img>`;
    }  else if (line.startsWith('#html:')) {
      formattedText += `${line.slice(6).trim()}`;
    } else if (line.startsWith('#link:')) {
      // Extract the link and text after comma
      const parts = line.slice(7).trim().split(',');
      const link = parts[0].trim();
      const text = parts.length > 1 ? parts.slice(1).join(',').trim() : '';
      formattedText += `<a href="${link}">${text}</a>`;
    } else {
      formattedText += `<p>${line}</p>`;
    }
  }

  return formattedText;
}