try {
  (function () {
    var config = {
      buttons: [
        ['Thesaurus', 'http://www.freethesaurus.com/'],
        ['Image', 'http://global.bing.com/images/search?q='],
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
        self.resolveDict()
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
        buttons.map(function (button) {
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
        self.showElements(
          document.getElementsByClassName('ts_system')
        )
      },

      /**
       * forbid dict's default clicking event 
       */
      resolveDict() {
        // overwrite the text click event of tsmdict
        if (window.mdx_click) {
          window.mdx_click = function () { }
        }
        // remove href of "a" tag 
        Array.prototype.map.call(
          document.getElementsByTagName('a'),
          function (a) {
            a.removeAttribute('href')
          }
        )
        // remove timer
        if (window.TouchTimerID) {
          clearTimeout(window.TouchTimerID)
        }
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

            // 1. Let O be the result of calling ToObject passing the |this| 
            //    value as the argument.
            var O = Object(this);

            // 2. Let lenValue be the result of calling the Get internal 
            //    method of O with the argument "length".
            // 3. Let len be ToUint32(lenValue).
            var len = O.length >>> 0;

            // 4. If IsCallable(callback) is false, throw a TypeError exception.
            // See: http://es5.github.com/#x9.11
            if (typeof callback !== 'function') {
              throw new TypeError(callback + ' is not a function');
            }

            // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
            if (arguments.length > 1) {
              T = arguments[1];
            }

            // 6. Let A be a new array created as if by the expression new Array(len) 
            //    where Array is the standard built-in constructor with that name and 
            //    len is the value of len.
            A = new Array(len);

            // 7. Let k be 0
            k = 0;

            // 8. Repeat, while k < len
            while (k < len) {

              var kValue, mappedValue;

              // a. Let Pk be ToString(k).
              //   This is implicit for LHS operands of the in operator
              // b. Let kPresent be the result of calling the HasProperty internal 
              //    method of O with argument Pk.
              //   This step can be combined with c
              // c. If kPresent is true, then
              if (k in O) {

                // i. Let kValue be the result of calling the Get internal 
                //    method of O with argument Pk.
                kValue = O[k];

                // ii. Let mappedValue be the result of calling the Call internal 
                //     method of callback with T as the this value and argument 
                //     list containing kValue, k, and O.
                mappedValue = callback.call(T, kValue, k, O);

                // iii. Call the DefineOwnProperty internal method of A with arguments
                // Pk, Property Descriptor
                // { Value: mappedValue,
                //   Writable: true,
                //   Enumerable: true,
                //   Configurable: true },
                // and false.

                // In browsers that support Object.defineProperty, use the following:
                // Object.defineProperty(A, k, {
                //   value: mappedValue,
                //   writable: true,
                //   enumerable: true,
                //   configurable: true
                // });

                // For best browser support, use the following:
                A[k] = mappedValue;
              }
              // d. Increase k by 1.
              k++;
            }

            // 9. return A
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