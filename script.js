const search = () => {
  const term = document.getElementById("term").value;
  const url =
    "https://itunes.apple.com/search?entity=podcast&limit=9&term=" + term;
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      displayResults(data);
    });
};

const displayResults = data => {
  // output data to the console:
  console.log(data);
  document.getElementById("output").innerHTML = "";
  data.results.forEach(item => addItem(item));
};

// attach event handlers and make function call:
document.getElementById("search").onclick = search;
search();

// upload your own cover art:

function previewFile() {
  var file = document.querySelector("input[type=file]").files[0];
  var title = document.querySelector("input#title").value;
  var reader = new FileReader();

  reader.addEventListener(
    "load",
    () => {
      addItem({
        albumCover: reader.result,
        artworkUrl100: reader.result,
        trackName: title,
        trackViewUrl: "some URL2"
      });
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}

function addItem(item) {
  // a 'lil hack to get higher quality album covers
  albumCover = item.artworkUrl100;
  albumCover = albumCover.replace("100x100", "300x300");

  // create elements:
  const div = document.createElement("div");
  const img = document.createElement("img");
  const a = document.createElement("a");
  const text = document.createTextNode(item.trackName);

  // bind with data:
  img.setAttribute("src", albumCover);
  a.setAttribute("href", item.trackViewUrl);
  a.setAttribute("target", "_blank");

  // nest and connect elements to document:
  a.appendChild(img);
  div.appendChild(text);
  div.appendChild(a);
  document.getElementById("output").prepend(div);
}
