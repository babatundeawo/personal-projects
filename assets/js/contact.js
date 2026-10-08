/**
 * contact.js — contact form validation and email hand-off, plus copy-email.
 * The form never sends data itself: on success it opens the visitor's
 * email app with the message pre-filled (mailto:).
 */
(function () {
  "use strict";

  var EMAIL = "babatundeawoyemi91@gmail.com";
  var form = document.getElementById("contact-form");
  var success = document.getElementById("form-success");
  var copyBtn = document.getElementById("copy-email");

  /* ---------- Copy email ---------- */
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var done = function () {
        copyBtn.textContent = "Copied";
        if (window.BA) window.BA.toast("Email address copied");
        window.setTimeout(function () {
          copyBtn.textContent = "Copy";
        }, 1800);
      };
      var fail = function () {
        if (window.BA) window.BA.toast("Couldn't copy. Select the address and copy it manually.", "error");
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(EMAIL).then(done, fail);
      } else {
        fail();
      }
    });
  }

  if (!form) return;

  var fields = {
    name: form.elements.name,
    email: form.elements.email,
    subject: form.elements.subject,
    message: form.elements.message,
  };

  var rules = {
    name: function (v) {
      if (!v) return "Please tell me your name.";
      if (v.length > 80) return "That name is a little long. Keep it under 80 characters.";
      return "";
    },
    email: function (v) {
      if (!v) return "Please add your email so I can reply.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "That doesn't look like a valid email address.";
      return "";
    },
    subject: function (v) {
      return v.length > 120 ? "Keep the subject under 120 characters." : "";
    },
    message: function (v) {
      if (!v) return "Please write a message.";
      if (v.length < 10) return "Add a little more detail (at least 10 characters).";
      if (v.length > 2000) return "Please keep the message under 2000 characters.";
      return "";
    },
  };

  function setError(key, text) {
    var field = fields[key];
    var wrap = field.closest(".field");
    var out = document.getElementById("err-" + key);
    wrap.classList.toggle("has-error", Boolean(text));
    out.textContent = text;
    if (text) field.setAttribute("aria-invalid", "true");
    else field.removeAttribute("aria-invalid");
  }

  function validate(key) {
    var text = rules[key](fields[key].value.trim());
    setError(key, text);
    return !text;
  }

  Object.keys(fields).forEach(function (key) {
    fields[key].addEventListener("blur", function () {
      if (fields[key].value || fields[key].closest(".field").classList.contains("has-error")) validate(key);
    });
    fields[key].addEventListener("input", function () {
      if (fields[key].closest(".field").classList.contains("has-error")) validate(key);
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var firstInvalid = null;
    Object.keys(fields).forEach(function (key) {
      if (!validate(key) && !firstInvalid) firstInvalid = fields[key];
    });
    if (firstInvalid) {
      firstInvalid.focus();
      if (window.BA) window.BA.toast("Please fix the highlighted fields.", "error");
      return;
    }

    var name = fields.name.value.trim();
    var from = fields.email.value.trim();
    var subject = fields.subject.value.trim() || "Message from " + name;
    var body = fields.message.value.trim() + "\n\n-- " + name + " (" + from + ")";
    var href =
      "mailto:" + EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

    success.hidden = false;
    success.focus();
    form.reset();
    window.location.href = href;
  });
})();
