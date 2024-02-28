const createListTrailers = (parent, srcList) => {
  const trailersList = document.createElement('ul');
  trailersList.classList.add('trailers__list');
  parent.append(trailersList);

  const trailersWrappers = [];
  const trailersFrames = [];

  srcList.forEach(src => {
    const trailersItem = document.createElement('li');
    trailersItem.classList.add('trailers__item');
    trailersList.append(trailersItem);

    const trailersWrapper = document.createElement('div');
    trailersWrapper.classList.add('trailers__wrapper');
    trailersItem.append(trailersWrapper);
    trailersWrappers.push(trailersWrapper);

    const trailersVideo = document.createElement('iframe');
    trailersVideo.classList.add('trailers__video');
    trailersWrapper.append(trailersVideo);
    trailersFrames.push(trailersVideo);

    const idVideo = src.match(/\/embed\/([^/\?]+)/)[1];

    trailersVideo.srcdoc = `
      <style>
        *{
          padding: 0;
          margin: 0;
          overflow: hidden;
        }
        
        html, body {
          width: 100%;
          height: 100%;
        }
        
        img, svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        a {
          cursor: default;
        }
        
        #button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 5;
          width: 64px;
          height: 64px;
          border: none;
          background-color: transparent;
          cursor: pointer;
        }
        
        @media (max-width: 900px) {
          #button {
            width: 36px;
            height: 36px;
          }
        }
      </style>
      <a href="https://www.youtube.com/embed/${idVideo}?autoplay=1">
        <img src="https://img.youtube.com/vi/${idVideo}/maxresdefault.jpg"> // ссылка для вырезания первого кадра (для обложки) без доп надписей с ютуб
        <div id="button">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="32" fill="#FF3D00"/>
            <path d="M42.5 31.134C43.1667 31.5189 43.1667 32.4811 42.5 32.866L27.5 41.5263C26.8333 41.9112 26 41.4301 26 40.6603V23.3397C26 22.5699 26.8333 22.0888 27.5 22.4737L42.5 31.134Z" fill="white"/>
          </svg>
        </div>
      </a>
      `;

  });

  return {trailersWrappers, trailersFrames}
}

const controlTrailer = (trailersWrappers, trailersFrames, i = 0, j = 0) => {
  if (i !== j) {
    trailersWrappers[i].style.display = 'none';
    trailersFrames[i].srcdoc = '';
  } else {
    trailersWrappers[i].style.display = 'block';
    trailersFrames[i].srcdoc = trailersFrames[i].dataset.srcdoc;
  }
}

const init = () => {
  const trailersContainer = document.querySelector('.trailers__container');
  const trailersButtons = document.querySelectorAll('.trailers__button');
  
  // for (let i=0; i < trailersButtons.length; i++) {
  //   const element = trailersButtons[i];
  //   console.log('element', element);
  // }
  
  const srcList = [];

  trailersButtons.forEach((btn) => {
    srcList.push(btn.dataset.src)
  });

  const { trailersWrappers, trailersFrames } = createListTrailers(
    trailersContainer, 
    srcList,
    );

  trailersButtons.forEach((btn, j) => {
    trailersFrames[j].dataset.srcdoc = trailersFrames[j].srcdoc;
    btn.addEventListener('click', () => {
      trailersButtons.forEach((tBtn, i) => {
        if (tBtn === btn) {
          tBtn.classList.add('trailers__button_active')
        } else {
          tBtn.classList.remove('trailers__button_active')
        }

        controlTrailer(trailersWrappers, trailersFrames, i, j);
      })
    })
  });

  controlTrailer(trailersWrappers, trailersFrames);
};

init();
