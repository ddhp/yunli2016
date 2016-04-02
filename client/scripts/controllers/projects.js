(function() {

  // set .project-detail width
  var clientWidth = document.body.clientWidth;

  var projectDetailDOM = document.querySelector('.project-detail');
  var projectDetailContentDOM = document.querySelector('.project-detail__content');
  // total width - left margin - nav width - project nav width
  var width = clientWidth - 30 - 100 - 230;
  projectDetailDOM.style.width = width + 'px';
  projectDetailContentDOM.style.width = (width - 30) + 'px';

  // set .project-detail .images padding: .desc clientHeight + 30px padding
  function setDescPaddingTop(targetDOM) {
    var t = targetDOM ? targetDOM : document;
    var paddingTop = t.querySelector('.desc').clientHeight + 30;
    t.querySelector('.images').style['padding-top'] = paddingTop + 'px';
  }
  setDescPaddingTop();

  // change showing detail
  var projectNavs = Array.prototype.slice.call(document.querySelectorAll('.nav--projects a'));
  var currentActiveDOM;

  function switchTab() {
    // hide every children
    var projectDetails = Array.prototype.slice.call(projectDetailContentDOM.children);
    projectDetails.map(function(detail) {
      if (!(/hide/.test(detail.className))) {
        detail.className += ' hide';
      }
    });

    var c = '.' + this.getAttribute('data-id');
    var targetDOM = projectDetailContentDOM.querySelector(c);
    var closeIcon = document.querySelector('#project-close-icon');
    currentActiveDOM = targetDOM;
    targetDOM.className = targetDOM.className.replace(/\s?hide/, '');
    // show close icon
    closeIcon.className = closeIcon.className.replace(/\s?hide/, '');
    setDescPaddingTop(targetDOM);
  }

  // add click listener to all projects nav
  projectNavs.map(function(nav) {
    nav.addEventListener('click', switchTab);
  });

  // call switchTab with oiseaux project-nav as "this"
  // switchTab.call(document.querySelector('a[data-id="oiseaux"]'));

  // close icon behavior
  var closeIcon = document.querySelector('#project-close-icon');
  closeIcon.addEventListener('click', function() {
    if (currentActiveDOM.className.indexOf('hide') === -1) {
      currentActiveDOM.className += ' hide';
    }
    if (this.className.indexOf('hide') === -1) {
      this.className += ' hide';
    }
  });

}());
