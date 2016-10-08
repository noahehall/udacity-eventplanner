import moment from 'moment';

export const disableConstraintPopup = (form) =>
  form && form.addEventListener('invalid', (e) =>
    e.preventDefault(), true);

export const getParent = (el, value) => {
  const found = document.querySelector(value);

  return found || null;
};

export const setPreviousElementError = (el) => {
  const
    progressEl = document.querySelector(`#${el.dataset.progressid}`),
    progressStatus = Number(el.dataset.progress);

  if (progressStatus === 1) {
    el.dataset.progress = -1;
    progressEl.value -= 10;
  } else if (progressStatus === 0) el.dataset.progress = -1;

  return el.previousSibling.firstElementChild.innerHTML = `${el.validationMessage}<br />${el.title}`;
};

export const clearPreviousElementError = (el) => {
  const
    progressEl = document.querySelector(`#${el.dataset.progressid}`),
    progressStatus = Number(el.dataset.progress);

  if (progressStatus !== 1) {
    el.dataset.progress = 1;
    progressEl.value += 10;
  }

  return el.previousSibling.firstElementChild.innerHTML = el.validationMessage;
};

export const setFirstChildElementError = (el, msg = false) => {
  const thisEl = el.querySelector('.error');
  thisEl.innerHTML = msg || 'Please correct all errors before continuing';
};

export const clearFirstChildElementError = (el, msg = false) => {
  const thisEl = el.querySelector('.error');
  thisEl.innerHTML = msg || '';
};

export const checkValidOnEvent = (e, setError = false) => {
  const el = e.currentTarget;

  if (el.id === 'eventstart'|| el.id === 'eventend') {
    const form = getParent(e.currentTarget, '#eventcreate-form');

    // check eventstart && end > now
    if ( moment(el.value) < moment() ) {
      el.className = 'has-error';
      el.setCustomValidity('date must be in the future');

      return setPreviousElementError(el);

    // check if eventstart < eventend
    } else if (form) {
      const otherEl = form.querySelector(`#${el.id === 'eventstart' ? 'eventend' : 'eventstart'}`);

      try {
        const hasError = otherEl.id === 'eventstart' ?
          moment(el.value) <= moment(otherEl.value) :
          moment(el.value) >= moment(otherEl.value);

        if (hasError) {
          el.className = 'has-error';
          el.setCustomValidity('Event must start before it ends ;)');

          return setPreviousElementError(el);
        }
      } catch (err) {
        // do nothing
      }
    }

    //clear all errors
    el.className = '';
    el.setCustomValidity('');
    clearPreviousElementError(el);
  }

  // default check for validation
  if (el.willValidate && !el.validity.valid) {
    el.className = 'has-error';
    if (setError) setPreviousElementError(el);

    return false;
  }

  el.className = '';
  if (setError) clearPreviousElementError(el);

  return true;
};
