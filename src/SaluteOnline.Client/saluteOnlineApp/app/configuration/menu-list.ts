export const menuList = [
  {
    path: 'pages',
    children: [
      {
        path: 'main-page',
        data: {
          menu: {
            title: 'Головна',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'materials',
        data: {
          menu: {
            title: 'Матеріали',
            icon: 'ion-document-text',
            selected: false,
            expanded: false,
            order: 100,
          }
        },
        children: [
          {
            path: 'codex',
            data: {
              menu: {
                title: 'Кодекс клубу'
              }
            }
          },
          {
            path: 'blogs',
            data: {
              menu: {
                title: 'Блоги'
              }
            }
          },
          {
            path: 'articles',
            data: {
              menu: {
                title: 'Статті'
              }
            }
          }
        ]
      },
      {
        path: 'rating',
        data: {
          menu: {
            title: 'Рейтинг',
            icon: 'ion-stats-bars',
            selected: false,
            expanded: false,
            order: 200,
          }
        }
      },
      {
        path: 'stats',
        data: {
          menu: {
            title: 'Статистика',
            icon: 'ion-grid',
            selected: false,
            expanded: false,
            order: 300,
          }
        }
      },
      {
        path: 'gallery',
        data: {
          menu: {
            title: 'Фотогалерея',
            icon: 'ion-images',
            selected: false,
            expanded: false,
            order: 400,
          }
        }
      },
      {
        path: 'video',
        data: {
          menu: {
            title: 'Відео',
            icon: 'ion-social-youtube',
            selected: false,
            expanded: false,
            order: 500,
          }
        }
      },
      {
        path: 'forum',
        data: {
          menu: {
            title: 'Форум',
            icon: 'ion-ios-people',
            selected: false,
            expanded: false,
            order: 600,
          }
        }
      },
      {
        path: 'contacts',
        data: {
          menu: {
            title: 'Контакти',
            icon: 'ion-android-contacts',
            selected: false,
            expanded: false,
            order: 650,
          }
        }
      },
      {
        path: 'adminpanel',
        data: {
          menu: {
            title: 'Адмін-панель',
            icon: 'ion-ios-unlocked',
            selected: false,
            expanded: false,
            order: 650,
          }
        }
      }
    ]
  }
];