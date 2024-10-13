document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.querySelector('.cursor');
  const textCursor = document.querySelector('.text-cursor');
  const emojis = document.querySelectorAll('.emoji');
  const links = document.querySelectorAll('a');
  const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
  const header = document.querySelector('header');

  let isMoving = false;
  let moveTimeout;
  let prevMouseX = 0;
  let prevMouseY = 0;

  const handleMouseMove = (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;

    textCursor.style.left = `${mouseX}px`;
    textCursor.style.top = `${mouseY}px`;

    if (!isMoving) {
      cursor.classList.add('moving');
      isMoving = true;
    }

    clearTimeout(moveTimeout);
    moveTimeout = setTimeout(() => {
      cursor.classList.remove('moving');
      isMoving = false;
    }, 100);

    const xStretch = (mouseX - prevMouseX) * 0.1;
    const yStretch = (mouseY - prevMouseY) * 0.1;
    cursor.style.transform = `translate(${xStretch}px, ${yStretch}px)`;

    prevMouseX = mouseX;
    prevMouseY = mouseY;
  };

  document.addEventListener('mousemove', handleMouseMove);

  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      cursor.classList.add('on-link');
      header.classList.add('blur-effect');
    });
    link.addEventListener('mouseleave', () => {
      cursor.classList.remove('on-link');
      header.classList.remove('blur-effect');
    });
  });

  textElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      textCursor.style.display = 'block';
      textCursor.textContent = 'Text';
    });
    element.addEventListener('mouseleave', () => {
      textCursor.style.display = 'none';
    });
  });

  emojis.forEach(emoji => {
    emoji.addEventListener('click', () => {
      const originalEmoji = emoji.dataset.emoji;
      emoji.textContent = '🎉';
      setTimeout(() => {
        emoji.textContent = originalEmoji;
      }, 1000);
    });
  });

  const handleFloatingMenu = () => {
    if (window.scrollY > 100) {
      header.classList.add('floating');
    } else {
      header.classList.remove('floating');
    }
  };

  window.addEventListener('scroll', handleFloatingMenu);

  const smoothScroll = (target, duration) => {
    const targetElement = document.querySelector(target);
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    const ease = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
  };

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = this.getAttribute('href');
      smoothScroll(target, 200);
    });
  });

  const animateText = (element) => {
    const text = element.textContent;
    element.textContent = '';
    let i = 0;

    const type = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        requestAnimationFrame(type);
      }
    };

    requestAnimationFrame(type);
  };

  const animatedTextElements = document.querySelectorAll('.animated-text');

  const initializeText = () => {
    animatedTextElements.forEach(element => {
      element.style.visibility = 'hidden';
    });
    updateTextSize();
    animatedTextElements.forEach(animateText);
  };

  const updateTextSize = () => {
    animatedTextElements.forEach(element => {
      const containerWidth = element.parentElement.offsetWidth;
      let fontSize = parseFloat(window.getComputedStyle(element).fontSize);
      element.style.whiteSpace = 'nowrap';

      while (element.offsetWidth > containerWidth && fontSize > 10) {
        fontSize -= 0.5;
        element.style.fontSize = `${fontSize}px`;
      }

      element.style.visibility = 'visible';
    });
  };

  const translateBtn = document.getElementById('translateBtn');
  let currentLanguage = 'en';

  const translations = {
    en: {
      'home': 'Home',
      'projects': 'Projects',
      'contact': 'Contact',
      'translate': 'Traduzir',
      'hero-title': 'aqui.ffoo - full stack dev :)',
      'hero-description': 'love tech, literally a junior dev, ceo and founder at aquislt',
      'projects-title': 'some projects',
      'textract-title': 'textract',
      'textract-description': 'a lightweight text extractor made with JS',
      'mtfree-api-title': 'yapsharp',
      'mtfree-api-description': 'amazing tcp chat in c#',
      'morethanfree-title': 'notethis',
      'morethanfree-description': 'a notes app on the terminal wtf :exploding_head:',
      'pybr-title': 'PyBR',
      'pybr-description': 'python compiler for portuguese language',
      'lyntrgpt-title': 'morethanfree',
      'lyntrgpt-description': 'a totally real website that pays you to use AI',
      'highnote-title': 'cablyai-client',
      'highnote-description': 'an npm package that makes using cablyai easier for begginers',
      'contact-title': 'say hello',
      'footer-copyright': '© 2024 aquiffoo',
      'footer-made-with': 'made with ❤️, html, css and js.'
    },
    pt: {
      'home': 'Início',
      'projects': 'Projetos',
      'contact': 'Contato',
      'translate': 'Translate',
      'hero-title': 'aqui.ffoo - desenvolvedor full stack :)',
      'hero-description': 'amo tecnologia, sou um dev júnior (literalmente), ceo e fundador da aquislt',
      'projects-title': 'alguns projetos',
      'textract-title': 'textract',
      'textract-description': 'um extrator de texto leve feito com JS',
      'mtfree-api-title': 'yapsharp',
      'mtfree-api-description': 'um app de chat tcp incrível em c#',
      'morethanfree-title': 'notethis',
      'morethanfree-description': 'um bloco de notas no terminal?! :exploding_head:',
      'pybr-title': 'PyBR',
      'pybr-description': 'compilador python para língua portuguesa',
      'lyntrgpt-title': 'morethanfree',
      'lyntrgpt-description': 'um site totalmente verdadeiro que te paga pra usar IA',
      'highnote-title': 'cablyai-client',
      'highnote-description': 'um pacote npm que faz utilizar a cablyai mais fácil para iniciantes',
      'contact-title': 'diga olá',
      'footer-copyright': '© 2024 aquiffoo',
      'footer-made-with': 'feito com ❤️, html, css e js.'
    }
  };

  const translatePage = () => {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
      const key = element.getAttribute('data-translate');
      element.textContent = translations[currentLanguage][key];
    });
  };

  translateBtn.addEventListener('click', () => {
    currentLanguage = currentLanguage === 'en' ? 'pt' : 'en';
    translatePage();
    updateTextSize();
  });

  window.addEventListener('load', initializeText);
  window.addEventListener('resize', updateTextSize);
});

