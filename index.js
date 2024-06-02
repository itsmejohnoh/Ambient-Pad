const squares = document.querySelectorAll('.square');
const audio = document.getElementById('audio');
const stopButton = document.getElementById('stopButton');
const volumeSlider = document.getElementById('volumeSlider');
let currentNote = '';
let currentSquare = null;

const notes = {
  note1: 'sounds/Cmajor.mp3',
  note2: 'sounds/Dmajor.mp3',
  note3: 'sounds/Emajor.mp3',
  note4: 'sounds/Fmajor.mp3',
  note5: 'sounds/Gmajor.mp3',
  note6: 'sounds/Amajor.mp3',
  note7: 'sounds/A#major.mp3',
  note8: 'sounds/Bmajor.mp3',
  note9: 'sounds/note9.mp3',
  // note10: 'sounds/note10.mp3',
  // note11: 'sounds/note11.mp3',
  // note12: 'sounds/note12.mp3'
};

squares.forEach(square => {
  square.addEventListener('click', () => {
    const note = square.getAttribute('data-note');
    if (note !== currentNote) {
      fadeOut(audio, () => {
        audio.src = notes[note];
        currentNote = note;
        fadeIn(audio);
      });

      if (currentSquare) {
        currentSquare.classList.remove('active');
      }
      square.classList.add('active');
      currentSquare = square;
    }
  });
});

stopButton.addEventListener('click', () => {
  fadeOut(audio, () => {
    audio.src = '';
    currentNote = '';
    if (currentSquare) {
      currentSquare.classList.remove('active');
      currentSquare = null;
    }
  });
});

volumeSlider.addEventListener('input', (event) => {
  audio.volume = event.target.value;
});

function fadeOut(audio, callback) {
  let volume = audio.volume;
  const fadeOutInterval = setInterval(() => {
    if (volume > 0.1) {
      volume -= 0.01;
      audio.volume = volume;
    } else {
      clearInterval(fadeOutInterval);
      audio.pause();
      audio.volume = volumeSlider.value;
      if (callback) callback();
    }
  }, 50);
}

function fadeIn(audio) {
  let volume = 0.1;
  audio.volume = volume;
  audio.play();
  const fadeInInterval = setInterval(() => {
    if (volume < volumeSlider.value) {
      volume += 0.1;
      audio.volume = volume;
    } else {
      clearInterval(fadeInInterval);
    }
  }, 50);
}

