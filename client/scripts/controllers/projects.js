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
  projectNavs.map(function(nav) {
    nav.addEventListener('click', function(e) {

      // hide every children
      var projectDetails = Array.prototype.slice.call(projectDetailContentDOM.children);
      projectDetails.map(function(detail) {
        if (!(/hide/.test(detail.className))) {
          detail.className += ' hide';
        }
      });

      var c = '.' + this.getAttribute('data-id');
      var targetDOM = projectDetailContentDOM.querySelector(c);
      targetDOM.className = targetDOM.className.replace(/\s?hide/, '');
      setDescPaddingTop(targetDOM);
    });
  });

}());
