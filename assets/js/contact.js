"use strict";

/* ---------------------------------------------------------
   Contact form: validates in the browser, then hands off to
   the visitor's own mail client via a mailto: link. There is
   no backend here, so nothing is silently swallowed, the
   visitor always sees their own email app open with the
   message pre-filled before anything sends.
--------------------------------------------------------- */
(function contactForm() {
  var form = document.getElementById("contact-form");
  if (!form) return;

  var nameField = document.getElementById("field-name");
  var emailField = document.getElementById("field-email");
  var subjectField = document.getElementById("field-subject");
  var messageField = document.getElementById("field-message");
  var successBox = document.getElementById("form-success");
  var DEST_EMAIL = "hello@example.com";

  function setError(field, message) {
    var row = field.closest(".form-row");
    var errorEl = row ? row.querySelector(".form-error") : null;
    if (row) row.classList.toggle("has-error", Boolean(message));
    if (errorEl) errorEl.textContent = message || "";
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validate() {
    var valid = true;

    if (!nameField.value.trim()) {
      setError(nameField, "Please enter your name.");
      valid = false;
    } else {
      setError(nameField, "");
    }

    if (!emailField.value.trim()) {
      setError(emailField, "Please enter your email.");
      valid = false;
    } else if (!isValidEmail(emailField.value.trim())) {
      setError(emailField, "That email address doesn't look right.");
      valid = false;
    } else {
      setError(emailField, "");
    }

    if (!messageField.value.trim() || messageField.value.trim().length < 10) {
      setError(messageField, "Say a little more, at least 10 characters.");
      valid = false;
    } else {
      setError(messageField, "");
    }

    return valid;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validate()) {
      var firstError = form.querySelector(".has-error input, .has-error textarea");
      if (firstError) firstError.focus();
      return;
    }

    var subject = subjectField.value.trim() || "New message from the build log";
    var body =
      "From: " + nameField.value.trim() + " (" + emailField.value.trim() + ")\n\n" +
      messageField.value.trim();

    var mailtoUrl =
      "mailto:" + DEST_EMAIL +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    if (successBox) successBox.classList.add("is-visible");
    window.location.href = mailtoUrl;
  });

  [nameField, emailField, messageField].forEach(function (field) {
    field.addEventListener("input", function () {
      setError(field, "");
    });
  });
})();

/* ---------------------------------------------------------
   Copy email address to clipboard
--------------------------------------------------------- */
(function copyEmail() {
  var button = document.getElementById("copy-email");
  if (!button) return;

  button.addEventListener("click", function () {
    var email = button.getAttribute("data-email") || "";
    var originalText = button.textContent;

    function showCopied() {
      button.textContent = "Copied!";
      setTimeout(function () {
        button.textContent = originalText;
      }, 1800);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(showCopied, function () {
        window.prompt("Copy this email address:", email);
      });
    } else {
      window.prompt("Copy this email address:", email);
    }
  });
})();
