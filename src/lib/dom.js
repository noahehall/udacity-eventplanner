import moment from 'moment';

export const getParent = (el, value, type) => {
  switch (type) {
  case 'id':
    return document.querySelector(`#${value}`);
  case 'class':
  case 'attribute':
  default: return null;
  }
};

export const setPreviousElementError = (el) =>
  el.previousSibling.firstElementChild.innerHTML = `${el.validationMessage}<br />${el.title}`;

export const clearPreviousElementError = (el) =>
  el.previousSibling.firstElementChild.innerHTML = el.validationMessage;

export const setFirstChildElementError = (el, msg = false) => {
  const thisEl = el.querySelector('.error');
  thisEl.innerHTML = msg || 'Please correct all errors before continuing';
};

export const clearFirstChildElementError = (el, msg = false) => {
  const thisEl = el.querySelector('.error');
  thisEl.innerHTML = msg || '';
};

export const checkValidOnBlur = (e, setError = false) => {
  const el = e.currentTarget;

  if (el.id === 'eventstart'|| el.id === 'eventend') {
    const form = getParent(e.currentTarget, 'eventcreate-form', 'id');

    // check eventstart && end > now
    if ( moment(el.value) < moment() ) {
      el.className = 'has-error';
      el.setCustomValidity('date must be in the future');

      return setPreviousElementError(el);

    // check if eventstart < eventend
    } else if (form) {
      const otherElId = el.id === 'eventstart' ? 'eventend' : 'eventstart';
      const otherEl = form.querySelector(`#${otherElId}`);

      try {
        const hasError = otherEl.id === 'eventstart' ?
          moment(el.value) < moment(otherEl.value) :
          moment(el.value) > moment(otherEl.value);

        if (hasError) {
          el.className = 'has-error';
          el.setCustomValidity('Event must start before it ends ;)');

          return setPreviousElementError(el);
        }
      } catch (err) {
        // do nothing
      }
    }

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
