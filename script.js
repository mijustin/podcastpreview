const search = () => {
  const term = document.getElementById("term").value;
  const url = "https://itunes.apple.com/search?entity=podcast&term=" + term;
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
  data.results.forEach(item => {
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
    document.getElementById("output").appendChild(div);
  });
};

// attach event handlers and make function call:
document.getElementById("search").onclick = search;
search();

// upload your own cover art:

function previewFile() {
  var preview = document.querySelector("img");
  var file = document.querySelector("input[type=file]").files[0];
  var reader = new FileReader();

  reader.addEventListener(
    "load",
    function() {
      preview.src = reader.result;
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}
