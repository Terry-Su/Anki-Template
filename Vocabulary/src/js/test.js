try {
  (function () {
    var config = {
      buttons: [
        ['Thesaurus', 'http://www.freethesaurus.com/'],
        ['Image', 'http://global.bing.com/images/search?q='],
        ['Juku', 'http://www.jukuu.com/search.php?q='],
        ['Youdao', 'http://www.youdao.com/w/eng/']
      ]
    }
    var btnBox = document.getElementById('ts_buttonBox')
    var iframe = document.getElementById('ts_iframe')
    var word = document.getElementById('ts_word').innerHTML
    var self
    // set example
    // word = 'test'

    var Composition = {
      /**
       * initialize
       */
      init: function () {
        self.setPolyfill()
        self.bindSpecialButtonEvent(
          self.createSpecailButton('Index')
        )
        self.bindButtonsEvents(
          self.createButtons(config.buttons)
        )
      },

      /**
     * 
     * @param {String} name 
     * @param {String} searchUrl like: "http://global.bing.com/images/search?q="
     * @param {Object} btnBox dom container
     */
      createButton: function (name, searchUrl, btnBox) {
        var btn = document.createElement('button')
        btn.innerHTML = name
        btn.setAttribute('searchUrl', searchUrl)
        btn.className = 'ts_switch_btn'
        btnBox.appendChild(btn)
        return btn
      },

      /**
       * create buttons by settings
       * @param {Array} setting 
       */
      createButtons: function (settings) {
        return settings.map(function (setting) {
          var name = setting[0]
          var searchUrl = setting[1]
          return self.createButton(name, searchUrl, btnBox)
        })
      },

      /**
       * bind buttons' events
       * @param {Array} buttons
       */
      bindButtonsEvents: function (buttons) {
        buttons.map(button => {
          button.addEventListener("click", function () {
            self.switchToTargetUrl(button)
          })
        })
      },

      /**
       * create button going back to index 
       * @param {String} name 
       */
      createSpecailButton: function (name) {
        var btn = document.createElement('button')
        btn.innerHTML = name
        btn.className = 'ts_switch_btn'
        btnBox.appendChild(btn)
        return btn
      },

      /**
       * bind the event to the button going back to index 
       * @param {Object} button 
       */
      bindSpecialButtonEvent: function (button) {
        button.addEventListener("click", function () {
          self.goBackToIndex()
        })
      },


      /**
       * switch to target url
       * @param {Object} button 
       */
      switchToTargetUrl: function (button) {
        self.hideElements(
          document.getElementsByClassName('ts_system')
        )
        self.showElement(iframe)
        self.updateIframe(
          button.getAttribute('searchurl')
        )
      },

      /**
       * go back to index
       */
      goBackToIndex: function () {
        self.hideElement(iframe)
        self.self.showElements(
          document.getElementsByClassName('ts_system')
        )
      },

      /**
       * update iframe
       * @param {String} src
       */
      updateIframe: function (src) {
        iframe.src = src + word
      },


      // ====== Tools =======
      /**
       * show dom elements
       */
      showElements: function (doms) {
        Array.prototype.map.call(doms, function (dom) {
          self.showElement(dom)
        })
      },

      /**
       * hide dom elements
       */
      hideElements: function (doms) {
        Array.prototype.map.call(doms, function (dom) {
          self.hideElement(dom)
        })
      },

      /**
       * show dom element
       * @param {Object} dom 
       */
      showElement: function (dom) {
        dom.style.display = 'block'
      },

      /**
       * hide dom element
       * @param {Object} dom 
       */
      hideElement: function (dom) {
        dom.style.display = 'none'
      },

      /**
       * set polyfill 
       */
      setPolyfill: function () {
        // Production steps of ECMA-262, Edition 5, 15.4.4.19
        // Reference: http://es5.github.io/#x15.4.4.19
        if (!Array.prototype.map) {
          Array.prototype.map = function (callback/*, thisArg*/) {

            var T, A, k;

            if (this == null) {
              throw new TypeError('this is null or not defined');
            }
            var O = Object(this);
            var len = O.length >>> 0;
            if (typeof callback !== 'function') {
              throw new TypeError(callback + ' is not a function');
            }
            if (arguments.length > 1) {
              T = arguments[1];
            }
            A = new Array(len);
            k = 0;
            while (k < len) {
              var kValue, mappedValue;
              if (k in O) {
                kValue = O[k];
                mappedValue = callback.call(T, kValue, k, O);
                A[k] = mappedValue;
              }
              k++;
            }
            return A;
          };
        }
      }
    }
    self = Composition
    Composition.init()
  })()
} catch (e) {
  document.body.innerHTML = e.toString()
}