document.addEventListener('DOMContentLoaded', function() {
  populate_cards();
});

async function populate_cards() {
  const url =
    'https://docs.google.com/spreadsheets/d/1uVk_57Ek_A49sLZ5OKdI6QASKloWNzykni3kcYNzpxA/export?gid=0&format=tsv';
  const videoTemplate = document.getElementById('video-template');
  fetch(url)
    .then(response => response.text())
    .then(data => {
      var x = data.split('\n');
      for (var i = 1; i < x.length; i++) {
        y = x[i].split('\t');
        x[i] = y;
        date = y[0];
        speaker = y[1];
        title = y[2];
        description = y[3];
        yurl = '';
        yid = y[4];
        alt = y[5];
        if (yid === '') {
          yurl = alt;
        } else {
          yurl = 'https://www.youtube.com/watch?v=' + yid;
        }
        slides = y[6];
        const videoInstance = document.importNode(videoTemplate.content, true);
        videoInstance.querySelector('.title').innerHTML = title;
        videoInstance.querySelector('.speaker').innerHTML = speaker;
        videoInstance.querySelector('.description').innerHTML = description;
        videoInstance.querySelector('.date').innerHTML = date;
        if (yurl === '') {
          videoInstance.querySelector('.title-link').setAttribute('href', 'FUTURE');
        } else {
          videoInstance.querySelector('.title-link').setAttribute('href', yurl);
          videoInstance.querySelector('.video-image-link').setAttribute('href', yurl);
        }
        if (yid === '') {
          // Keep default image.
        } else {
          yimg = 'https://i.ytimg.com/vi/' + yid + '/hqdefault.jpg';
          videoInstance.querySelector('.imagesrc').setAttribute('src', yimg);
        }
        if (slides === '') {
          videoInstance.querySelectorAll('.slides-link').forEach(e => e.parentNode.removeChild(e));
        } else {
          videoInstance.querySelector('.slides-link').setAttribute('href', slides);
        }
        // Append the instance to the DOM
        document.getElementById('videos').appendChild(videoInstance);
      }
    });
}
