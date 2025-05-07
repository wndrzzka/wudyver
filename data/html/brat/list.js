const templates = [{
  html: ({
    text,
    output
  }) => `<!DOCTYPE html>
<html lang='id'>
<head>
<meta charset='UTF-8'>
<meta name='viewport' content='width=device-width, initial-scale=1.0'>
<title>BRAT</title>
<link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Noto+Sans+Display:wght@400&display=swap'>
<style>
body {
  background-color: white;
  color: black;
  font-family: 'Arial Black', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  overflow: hidden;
}

.container {
  width: 1280px;
  max-width: 100%;
  position: relative;
  height: 1280px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

#textOverlay {
  z-index: 2;
  font-size: clamp(100px, 16vw, 240px);
  color: #000000;
  font-weight: 500;
  font-family: 'Noto Sans Display', arial_narrowregular, 'Arial Narrow', Arial, sans-serif;
  text-align: justify;
  text-align-last: justify;
  text-justify: distribute;
  max-width: 1240px;
  width: 100%;
  filter: blur(0.5px);
  letter-spacing: 0.05em;
  padding: 0 20px;
  box-sizing: border-box;
  white-space: normal;
  overflow-wrap: break-word;
}

.emphasized {
  font-weight: bold;
  font-style: italic;
  color: crimson;
  filter: blur(0.5px);
}

html {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
</head>
<body>
<div class='container'>
  <div id='textOverlay'></div>
</div>

<script>
const originalText = '${text}';
const words = originalText.split(' ');
let index = 0;
const textOverlay = document.getElementById('textOverlay');
const output = '${output}';

function emphasizeWord(word) {
  if (Math.random() < 0.4) {
    return '<span class=\'emphasized\'>' + word.toUpperCase() + '</span>';
  } else {
    return word.toUpperCase();
  }
}

function showNextWord() {
  if (index < words.length && output === 'gif') {
    textOverlay.innerHTML += emphasizeWord(words[index]) + ' ';
    index++;
    setTimeout(showNextWord, 300);
  }
}

function adjustFontSize() {
  const container = document.querySelector('.container');
  const text = textOverlay;

  let fontSize = 280;
  text.style.fontSize = fontSize + 'px';

  while ((text.scrollWidth > container.offsetWidth - 40 || text.scrollHeight > container.offsetHeight - 40) && fontSize > 50) {
    fontSize -= 5;
    text.style.fontSize = fontSize + 'px';
  }

  if (fontSize < 100 || text.textContent.split(' ').length > 3) {
    text.style.textAlign = 'justify';
    text.style.textAlignLast = 'justify';
  } else {
    text.style.textAlign = 'center';
    text.style.textAlignLast = 'center';
  }
}

if (output === 'gif') {
  textOverlay.innerHTML = '';
  showNextWord();
}

if (output === 'png') {
  textOverlay.innerHTML = originalText;
  window.addEventListener('load', adjustFontSize);
  window.addEventListener('resize', adjustFontSize);
}
</script>
</body>
</html>`
}, {
  html: ({
    text,
    output
  }) => `<!DOCTYPE html>
<html lang='id'>
<head>
<meta charset='UTF-8'>
<meta name='viewport' content='width=device-width, initial-scale=1.0'>
<title>BRAT</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
<style>
body {
  background-color: white;
  color: black;
  font-family: 'Poppins', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  overflow: hidden;
}

.container {
  width: 1280px;
  max-width: 100%;
  position: relative;
  height: 1280px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

#textOverlay {
  z-index: 2;
  font-size: clamp(100px, 16vw, 240px);
  color: #000000;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
  text-align: justify;
  text-align-last: justify;
  text-justify: distribute;
  max-width: 1240px;
  width: 100%;
  filter: blur(0.5px);
  letter-spacing: 0.05em;
  padding: 0 20px;
  box-sizing: border-box;
  white-space: normal;
  overflow-wrap: break-word;
}

.emphasized {
  font-weight: bold;
  font-style: italic;
  color: crimson;
  filter: blur(0.5px);
}

html {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
</head>
<body>
<div class='container'>
  <div id='textOverlay'></div>
</div>

<script>
const originalText = '${text}';
const words = originalText.split(' ');
let index = 0;
const textOverlay = document.getElementById('textOverlay');
const output = '${output}';

function emphasizeWord(word) {
  if (Math.random() < 0.4) {
    return '<span class=\'emphasized\'>' + word.toUpperCase() + '</span>';
  } else {
    return word.toUpperCase();
  }
}

function showNextWord() {
  if (index < words.length && output === 'gif') {
    textOverlay.innerHTML += emphasizeWord(words[index]) + ' ';
    index++;
    setTimeout(showNextWord, 300);
  }
}

function adjustFontSize() {
  const container = document.querySelector('.container');
  const text = textOverlay;

  let fontSize = 280;
  text.style.fontSize = fontSize + 'px';

  while ((text.scrollWidth > container.offsetWidth - 40 || text.scrollHeight > container.offsetHeight - 40) && fontSize > 50) {
    fontSize -= 5;
    text.style.fontSize = fontSize + 'px';
  }

  if (fontSize < 100 || text.textContent.split(' ').length > 3) {
    text.style.textAlign = 'justify';
    text.style.textAlignLast = 'justify';
  } else {
    text.style.textAlign = 'center';
    text.style.textAlignLast = 'center';
  }
}

if (output === 'gif') {
  textOverlay.innerHTML = '';
  showNextWord();
}

if (output === 'png') {
  textOverlay.innerHTML = originalText;
  window.addEventListener('load', adjustFontSize);
  window.addEventListener('resize', adjustFontSize);
}
</script>
</body>
</html>`
}, {
  html: ({
    text,
    output
  }) => `<!DOCTYPE html>
<html lang='id'>
<head>
<meta charset='UTF-8'>
<meta name='viewport' content='width=device-width, initial-scale=1.0'>
<title>BRAT</title>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
<style>
body {
  background-color: white;
  color: black;
  font-family: 'Roboto', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  overflow: hidden;
}

.container {
  width: 1280px;
  max-width: 100%;
  position: relative;
  height: 1280px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

#textOverlay {
  z-index: 2;
  font-size: clamp(100px, 16vw, 240px);
  color: #000000;
  font-weight: 500;
  font-family: 'Roboto', sans-serif;
  text-align: justify;
  text-align-last: justify;
  text-justify: distribute;
  max-width: 1240px;
  width: 100%;
  filter: blur(0.5px);
  letter-spacing: 0.05em;
  padding: 0 20px;
  box-sizing: border-box;
  white-space: normal;
  overflow-wrap: break-word;
}

.emphasized {
  font-weight: bold;
  font-style: italic;
  color: crimson;
  filter: blur(0.5px);
}

html {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
</head>
<body>
<div class='container'>
  <div id='textOverlay'></div>
</div>

<script>
const originalText = '${text}';
const words = originalText.split(' ');
let index = 0;
const textOverlay = document.getElementById('textOverlay');
const output = '${output}';

function emphasizeWord(word) {
  if (Math.random() < 0.4) {
    return '<span class=\'emphasized\'>' + word.toUpperCase() + '</span>';
  } else {
    return word.toUpperCase();
  }
}

function showNextWord() {
  if (index < words.length && output === 'gif') {
    textOverlay.innerHTML += emphasizeWord(words[index]) + ' ';
    index++;
    setTimeout(showNextWord, 300);
  }
}

function adjustFontSize() {
  const container = document.querySelector('.container');
  const text = textOverlay;

  let fontSize = 280;
  text.style.fontSize = fontSize + 'px';

  while ((text.scrollWidth > container.offsetWidth - 40 || text.scrollHeight > container.offsetHeight - 40) && fontSize > 50) {
    fontSize -= 5;
    text.style.fontSize = fontSize + 'px';
  }

  if (fontSize < 100 || text.textContent.split(' ').length > 3) {
    text.style.textAlign = 'justify';
    text.style.textAlignLast = 'justify';
  } else {
    text.style.textAlign = 'center';
    text.style.textAlignLast = 'center';
  }
}

if (output === 'gif') {
  textOverlay.innerHTML = '';
  showNextWord();
}

if (output === 'png') {
  textOverlay.innerHTML = originalText;
  window.addEventListener('load', adjustFontSize);
  window.addEventListener('resize', adjustFontSize);
}
</script>
</body>
</html>`
}, {
  html: ({
    text,
    output
  }) => `<!DOCTYPE html>
<html lang='id'>
<head>
<meta charset='UTF-8'>
<meta name='viewport' content='width=device-width, initial-scale=1.0'>
<title>BRAT</title>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
<style>
body {
  background-color: white;
  color: black;
  font-family: 'Montserrat', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  overflow: hidden;
}

.container {
  width: 1280px;
  max-width: 100%;
  position: relative;
  height: 1280px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

#textOverlay {
  z-index: 2;
  font-size: clamp(100px, 16vw, 240px);
  color: #000000;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
  text-align: justify;
  text-align-last: justify;
  text-justify: distribute;
  max-width: 1240px;
  width: 100%;
  filter: blur(0.5px);
  letter-spacing: 0.05em;
  padding: 0 20px;
  box-sizing: border-box;
  white-space: normal;
  overflow-wrap: break-word;
}

.emphasized {
  font-weight: bold;
  font-style: italic;
  color: crimson;
  filter: blur(0.5px);
}

html {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
</head>
<body>
<div class='container'>
  <div id='textOverlay'></div>
</div>

<script>
const originalText = '${text}';
const words = originalText.split(' ');
let index = 0;
const textOverlay = document.getElementById('textOverlay');
const output = '${output}';

function emphasizeWord(word) {
  if (Math.random() < 0.4) {
    return '<span class=\'emphasized\'>' + word.toUpperCase() + '</span>';
  } else {
    return word.toUpperCase();
  }
}

function showNextWord() {
  if (index < words.length && output === 'gif') {
    textOverlay.innerHTML += emphasizeWord(words[index]) + ' ';
    index++;
    setTimeout(showNextWord, 300);
  }
}

function adjustFontSize() {
  const container = document.querySelector('.container');
  const text = textOverlay;

  let fontSize = 280;
  text.style.fontSize = fontSize + 'px';

  while ((text.scrollWidth > container.offsetWidth - 40 || text.scrollHeight > container.offsetHeight - 40) && fontSize > 50) {
    fontSize -= 5;
    text.style.fontSize = fontSize + 'px';
  }

  if (fontSize < 100 || text.textContent.split(' ').length > 3) {
    text.style.textAlign = 'justify';
    text.style.textAlignLast = 'justify';
  } else {
    text.style.textAlign = 'center';
    text.style.textAlignLast = 'center';
  }
}

if (output === 'gif') {
  textOverlay.innerHTML = '';
  showNextWord();
}

if (output === 'png') {
  textOverlay.innerHTML = originalText;
  window.addEventListener('load', adjustFontSize);
  window.addEventListener('resize', adjustFontSize);
}
</script>
</body>
</html>`
}, {
  html: ({
    text,
    output
  }) => `<!DOCTYPE html>
<html lang='id'>
<head>
<meta charset='UTF-8'>
<meta name='viewport' content='width=device-width, initial-scale=1.0'>
<title>BRAT</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
<style>
body {
  background-color: white;
  color: black;
  font-family: 'Playfair Display', serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  overflow: hidden;
}

.container {
  width: 1280px;
  max-width: 100%;
  position: relative;
  height: 1280px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

#textOverlay {
  z-index: 2;
  font-size: clamp(100px, 16vw, 240px);
  color: #000000;
  font-weight: 500;
  font-family: 'Playfair Display', serif;
  text-align: justify;
  text-align-last: justify;
  text-justify: distribute;
  max-width: 1240px;
  width: 100%;
  filter: blur(0.5px);
  letter-spacing: 0.05em;
  padding: 0 20px;
  box-sizing: border-box;
  white-space: normal;
  overflow-wrap: break-word;
}

.emphasized {
  font-weight: bold;
  font-style: italic;
  color: crimson;
  filter: blur(0.5px);
}

html {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
</head>
<body>
<div class='container'>
  <div id='textOverlay'></div>
</div>

<script>
const originalText = '${text}';
const words = originalText.split(' ');
let index = 0;
const textOverlay = document.getElementById('textOverlay');
const output = '${output}';

function emphasizeWord(word) {
  if (Math.random() < 0.4) {
    return '<span class=\'emphasized\'>' + word.toUpperCase() + '</span>';
  } else {
    return word.toUpperCase();
  }
}

function showNextWord() {
  if (index < words.length && output === 'gif') {
    textOverlay.innerHTML += emphasizeWord(words[index]) + ' ';
    index++;
    setTimeout(showNextWord, 300);
  }
}

function adjustFontSize() {
  const container = document.querySelector('.container');
  const text = textOverlay;

  let fontSize = 280;
  text.style.fontSize = fontSize + 'px';

  while ((text.scrollWidth > container.offsetWidth - 40 || text.scrollHeight > container.offsetHeight - 40) && fontSize > 50) {
    fontSize -= 5;
    text.style.fontSize = fontSize + 'px';
  }

  if (fontSize < 100 || text.textContent.split(' ').length > 3) {
    text.style.textAlign = 'justify';
    text.style.textAlignLast = 'justify';
  } else {
    text.style.textAlign = 'center';
    text.style.textAlignLast = 'center';
  }
}

if (output === 'gif') {
  textOverlay.innerHTML = '';
  showNextWord();
}

if (output === 'png') {
  textOverlay.innerHTML = originalText;
  window.addEventListener('load', adjustFontSize);
  window.addEventListener('resize', adjustFontSize);
}
</script>
</body>
</html>`
}];
const getTemplate = ({
  template: index = 1,
  text,
  output
}) => {
  const templateIndex = Number(index);
  return templates[templateIndex - 1]?.html({
    text: text,
    output: output
  }) || "Template tidak ditemukan";
};
export default getTemplate;