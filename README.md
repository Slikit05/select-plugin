# select-plugin
Плагин для кастомных селектов


Пример вызова селекта

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


Нужен блок с селектором для вызова

<div id="select"></div>
