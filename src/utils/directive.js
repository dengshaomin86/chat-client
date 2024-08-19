const directive = {
  install(Vue) {
    Vue.directive("limit", {
      inserted(el, binding) {
        const modifier = Object.keys(binding.modifiers)[0] || "r";
        const reg = {
          match: {
            r: /[0-9.-]/,
            "+": /[0-9.]/,
            "n+": /[0-9]/
          },
          replace: {
            r: /[^0-9.-]/g,
            "+": /[^0-9.]/g,
            "n+": /[^0-9]/g
          }
        };

        el.onkeypress = (e) => {
          const code = e.charCode;
          if (code !== 0) {
            if (!String.fromCharCode(code).match(reg.match[modifier])) {
              return false;
            }
          }
        };

        el.addEventListener("textInput", (e) => {
          e.target.value = e.target.value.replace(reg.replace[modifier], "");
        });

        el.onkeyup = (e) => {
          e.target.value = e.target.value.replace(reg.replace[modifier], "");
        };
      }
    });
    Vue.directive("click-outside", {
      bind(el, binding, vnode) {
        function documentHandler(e) {
          if (el.contains(e.target)) {
            return false;
          }
          if (binding.expression) {
            binding.value(e);
          }
        }

        el._vueClickOutside_ = documentHandler;
        document.addEventListener("click", documentHandler);
      },
      unbind(el, binding) {
        document.removeEventListener("click", el._vueClickOutside_);
        delete el._vueClickOutside_;
      }
    });
  }
};

export default directive;
