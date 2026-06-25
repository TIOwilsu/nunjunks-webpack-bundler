const supportsWebp = () => new Promise((resolve,) => {
  const image = new Image();

  image.onload = () => resolve(image.width > 0 && image.height > 0,);
  image.onerror = () => resolve(false,);
  image.src = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoCAAIALmk0mk0iIiIiIgBoSywA';
},);

const applyLazyBackground = async () => {
  const lazyBackgrounds = document.querySelectorAll('.js-lazy-bg[data-bg-src]',);

  if (!lazyBackgrounds.length) {
    return;
  }

  const hasWebpSupport = await supportsWebp();
  const loadBackground = (element,) => {
    const fallbackSource = element.dataset.bgSrc;
    const webpSource = element.dataset.bgWebp;
    const selectedSource = hasWebpSupport && webpSource ? webpSource : fallbackSource;

    if (!selectedSource) {
      return;
    }

    const gradient = 'linear-gradient(135deg, rgba(13, 110, 253, 0.65), rgba(111, 66, 193, 0.55))';
    element.style.backgroundImage = `${gradient}, url(${selectedSource})`;
    element.classList.remove('js-lazy-bg',);
  };

  if (!('IntersectionObserver' in window)) {
    lazyBackgrounds.forEach((element,) => loadBackground(element,),);
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver,) => {
    entries.forEach((entry,) => {
      if (!entry.isIntersecting) {
        return;
      }

      loadBackground(entry.target,);
      currentObserver.unobserve(entry.target,);
    },);
  }, {
    rootMargin: '150px 0px',
  },);

  lazyBackgrounds.forEach((element,) => observer.observe(element,),);
};

document.addEventListener('DOMContentLoaded', () => {
  applyLazyBackground();
},);
