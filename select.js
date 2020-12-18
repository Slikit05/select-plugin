// селект

const getTemplate = (data = [], placeholder, selectedId) => {
  let text = placeholder ?? '';

  const items = data.map(item => {
    let cls = ''
    if (item.id === selectedId) {
      text = item.value;
      cls = 'custom-select__item--selected';
    };

    return `
      <li class="custom-select__item ${cls}" data-type="item" data-id="${item.id}">
        <div class="custom-select__row-text"><span class="custom-select__text">${item.value}</span></div>
      </li>
    `
  });

  return `  
    <div class="custom-select__up" data-type="input">
      <span class="custom-select__placeholder" data-type="value">${text}</span>
      <div class="custom-select__wrap-arrow">
        <svg class="custom-select__arrow" width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 9L5 13M5 13L9 9M5 13L5 12.5" stroke="#3A4558" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          <path class="line-arrow-animation" d="M5 1L5 13" stroke="#3A4558" stroke-width="2"></path>
        </svg>
      </div>
    </div>
    <div class="custom-select__drop-down select-drop-down">
      <ul class="custom-select__list">
        ${items.join('')}
      </ul>
    </div>
  `
}

class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.options = options;
    this.selectedId = options.selectedId;
    this.$parentNode = options.parentNode || null;

    this.#render();
    this.#setup();
  };

  #render() {
    const {
      placeholder,
      data
    } = this.options;
    this.$el.classList.add('custom-select');
    this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId);
  };

  #setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener('click', this.clickHandler);
    this.$value = this.$el.querySelector('[data-type="value"]');
    if (this.$parentNode) {
      this.$parentNode.addEventListener('click', this.clickHandlerParentNode.bind(this));
    }
  };

  clickHandler(event) {
    const {
      type
    } = event.target.dataset;

    if (type === 'input') {
      this.toggle();
    } else if (type === 'item') {
      const id = event.target.dataset.id;
      this.select(id);
    };
  };

  clickHandlerParentNode(event) {
    if (!this.$el.contains(event.target)) {
      this.close();
    }
  };

  get isOpen() {
    return this.$el.classList.contains('open');
  };

  get current() {
    return this.options.data.find(item => item.id === this.selectedId);
  };

  select(id) {
    this.selectedId = id;
    this.$value.textContent = this.current.value;

    this.$el.querySelectorAll('[data-type="item"]').forEach(el => {
      el.classList.remove('custom-select__item--selected');
    });
    this.$el.querySelector(`[data-id="${id}"]`).classList.add('custom-select__item--selected');

    this.close();
  };

  toggle() {
    this.isOpen ? this.close() : this.open();
  };

  open() {
    this.$el.classList.add('open');
  };

  close() {
    this.$el.classList.remove('open');
  };

  destroy() {
    this.$el.removeEventListener('click', this.clickHandler);
    this.$el.innerHTML = '';
  };
};


// Вызов селекта
new Select('#select', {
  placeholder: 'выберите категорию',
  // selectedId: '1',
  parentNode: window,
  data: [{
      id: '1',
      value: 'Раз'
    },
    {
      id: '2',
      value: 'Два'
    },
    {
      id: '3',
      value: 'Три'
    },
    {
      id: '4',
      value: 'Четыри'
    },
    {
      id: '5',
      value: 'Пять'
    },
  ]
});

// селект - конец