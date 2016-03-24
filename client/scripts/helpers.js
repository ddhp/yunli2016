// useful helpers
module.exports = {
  /**
   * ajax helper
   * call onSuccess or onFail depends on situation
   * @param method String
   * @param path String
   * @param onSuccess Function
   * @param onFail Function
   *
   */
  ajax: function (method, path, onSuccess, onFail) {
    onSuccess = onSuccess ? onSuccess : function () {};
    onFail = onFail ? onFail : function onFail() {};

    var xhr = new XMLHttpRequest();
    xhr.onload = function (res) {
      console.log(this, res);
      if (this.status !== 200) {
        // error handling
        onFail.call(this);
      } else {
        onSuccess.call(this);
      }
    };
    xhr.open(method, path);
    xhr.send();
  }
};
