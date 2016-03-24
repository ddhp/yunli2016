var throttle = function(type, name, obj) {
  obj = obj || window;
  var running = false;
  var func = function() {
    if (running) { return; }
    running = true;
    requestAnimationFrame(function() {
      obj.dispatchEvent(new CustomEvent(name));
      running = false;
    });
  };
  obj.addEventListener(type, func);
};

/* init - you can init any event */
throttle("scroll", "optimizedScroll");
// init resize as well
throttle("resize", "optimizedResize");

var navOriBackgroundColor;

window.onloadOrig = window.onload;
window.onload = function onload(e) {

  /**
   * set navbar scroll style when scrolling
   *
   */
  var kktvNav = document.querySelector('.kktv-nav');

  setTimeout(function () {
    if (kktvNav) {
      navOriBackgroundColor = kktvNav.style['background-color'];
    }
  }, 100);

  /**
   * decide active nav item
   *
   */
  var pathname = window.location.pathname;
  setTimeout(function () {
    if (kktvNav) {
      var navItems = Array.prototype.slice.call(kktvNav.querySelectorAll('.nav-item'));
      navItems.forEach(function (navItem) {
        var a = navItem.querySelector('.nav-link');
        if (pathname.indexOf(a.getAttribute('href')) > -1) {
          navItem.className += ' active';
        }
      });
    }
  });

  /**
   * hover on genre behavior
   *
   */
  function onGenreButtonMouseover(e) {
    var nav = document.querySelector('#nav');
    nav.className += ' on-genre-hover';
  }

  function onGenreButtonMouseout() {
    var nav = document.querySelector('#nav');
    nav.className = nav.className.replace(' on-genre-hover', '');
  }

  setTimeout(function () {
    if (kktvNav) {
      var genreButton = document.querySelector('#nav-genre-button');
      genreButton.addEventListener('mouseover', onGenreButtonMouseover);
      genreButton.addEventListener('mouseout', onGenreButtonMouseout);
    }
  });

  // set navbar style when scroll
  window.addEventListener('optimizedScroll', function(e) {
    if (kktvNav) {
      if (e.target.scrollY > 40) {
        kktvNav.style['background-color'] = 'rgba(0,0,0,.3)';
      } else {
        kktvNav.style['background-color'] = navOriBackgroundColor;
      }
    }
  });

  /**
   * login status dropdown
   *
   */
  var loginStatusDropdownToggle = document.querySelector('.login-status.dropdown .dropdown-toggle');
  if (loginStatusDropdownToggle) {
    loginStatusDropdownToggle.addEventListener('click', function (e) {
      var dropdown = loginStatusDropdownToggle.parentElement;
      var classNames = dropdown.className;
      if (/open/.test(classNames)) {
        classNames = classNames.replace('open', '');
      } else {
        classNames += ' open';
      }
      dropdown.className = classNames;
    });
  }
  
  window.onloadOrig(e);
};
