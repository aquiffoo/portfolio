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
      'hero-description': 'a 10th grader full stack developer from Brazil',
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
      'footer-made-with': 'made with ❤️, html, css and js.',
      'skills-title': 'my skills',
      'skill-html': 'HTML',
      'skill-explain-html': 'HTML is a markup language used to create web pages. It defines the structure and content of a web page, including headings, paragraphs, images, links, and other elements.',
      'skill-css': 'CSS',
      'skill-explain-css': 'CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in a markup language like HTML. It allows for the separation of content and presentation, enabling cleaner and more maintainable code.',
      'skill-js': 'JavaScript',
      'skill-explain-js': 'JavaScript is a programming language that enables interactive web pages and is one of the three core technologies of the World Wide Web. It is a high-level, often imperative programming language that is especially suited for adding interactivity to web pages.',
      'skill-py': 'Python',
      'skill-explain-py': 'Python is a high-level, interpreted programming language that is widely used for web development. It is known for its simplicity and readability, making it a popular choice for beginners and experienced developers alike.',
      'skill-cs': 'C#',
      'skill-explain-cs': 'C# is a programming language developed by Microsoft. It is primarily used for developing Windows applications, but it can also be used for web development. C# is known for its strong typing and support for object-oriented programming.'
    },
    pt: {
      'home': 'Início',
      'projects': 'Projetos',
      'contact': 'Contato',
      'translate': 'Translate',
      'hero-title': 'aqui.ffoo - desenvolvedor full stack :)',
      'hero-description': 'uma dev fullstack do 1º ano do ensino médio',
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
      'footer-made-with': 'feito com ❤️, html, css e js.',
      'skills-title': 'minhas habilidades',
      'skill-html': 'HTML',
      'skill-explain-html': 'HTML é uma linguagem de marcação usada para criar páginas web. Define a estrutura e o conteúdo de uma página, incluindo cabeçalhos, parágrafos, imagens, links e outros elementos.',
      'skill-css': 'CSS',
      'skill-explain-css': 'CSS (Cascading Style Sheets) é uma linguagem de estilos usada para descrever a apresentação de um documento escrito em HTML. Permite separar conteúdo e apresentação, possibilitando código mais limpo e sustentável.',
      'skill-js': 'JavaScript',
      'skill-explain-js': 'JavaScript é uma linguagem de programação que possibilita páginas web interativas e é uma das três tecnologias principais da Web. É uma linguagem de alto nível, muitas vezes imperativa, especialmente adequada para adicionar interatividade às páginas.',
      'skill-py': 'Python',
      'skill-explain-py': 'Python é uma linguagem de programação de alto nível e interpretada amplamente usada no desenvolvimento web. É conhecida pela sua simplicidade e legibilidade, sendo uma escolha popular tanto para iniciantes quanto para desenvolvedores experientes.',
      'skill-cs': 'C#',
      'skill-explain-cs': 'C# é uma linguagem de programação desenvolvida pela Microsoft. É usada principalmente para desenvolver aplicações Windows, mas também pode ser usada no desenvolvimento web. C# é conhecida pela sua tipagem forte e suporte à programação orientada a objetos.'
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

