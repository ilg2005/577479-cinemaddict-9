export const utils = {

  createElement(template) {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;
    return newElement.firstChild;
  },

  render(container, element, place) {
    switch (place) {
      case `afterbegin`:
        container.prepend(element);
        break;
      case `beforeend`:
        container.append(element);
        break;
    }
  },

  unrender(element) {
    if (element) {
      element.remove();
    }
  },

};
