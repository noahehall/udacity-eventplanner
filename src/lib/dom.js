export const setPreviousElementError = (el) =>
  el.previousSibling.firstElementChild.innerHTML = el.validationMessage;

export const clearPreviousElementError = (el) =>
  el.previousSibling.firstElementChild.innerHTML = el.validationMessage;

export const setFirstChildElementError = (el) => {
  const thisEl = el.querySelector('.error');
  console.log(thisEl);
  thisEl.innerHTML = 'invalid login';
};

export const checkValidOnBlur = (e, setError = false) => {
  const el = e.currentTarget;
  if (el.willValidate && !el.validity.valid) {
    el.className = 'has-error';
    if (setError) setPreviousElementError(el);

    return false;
  }

  el.className = '';
  if (setError) clearPreviousElementError(el);

  return true;
};
