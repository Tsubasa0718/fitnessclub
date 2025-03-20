// ハンバーガーメニューの制御
const MenuBtn = document.getElementById('js-menu-btn');
const Nav = document.getElementById('is-nav');

// ハンバーガーボタンのクリックイベント
MenuBtn.addEventListener('click', () => {
  const Expanded = MenuBtn.getAttribute('aria-expanded');
  if (Expanded === 'false') {
    MenuBtn.setAttribute('aria-expanded', 'true');
    Nav.setAttribute('aria-hidden', 'false');
  } else {
    MenuBtn.setAttribute('aria-expanded', 'false');
    Nav.setAttribute('aria-hidden', 'true');
  }
});

// 画面幅のメディアクエリ設定
const mediaQuery = window.matchMedia('(min-width: 992px)');

// 画面幅の変化に応じたaria属性の設定
const handleAriaHidden = (e) => {
  if (e.matches) {
    Nav.setAttribute('aria-hidden', 'false');
    MenuBtn.setAttribute('aria-expanded', 'false');
  } else {
    Nav.setAttribute('aria-hidden', 'true');
    MenuBtn.setAttribute('aria-expanded', 'false');
  }
};
mediaQuery.addEventListener('change', handleAriaHidden);
handleAriaHidden(mediaQuery);

// **アコーディオンメニュー（992px未満のみ有効）**
const enableAccordionMenu = () => {
  if (mediaQuery.matches) return; // 992px以上なら処理をスキップ

  const navItemsWithSubmenu = document.querySelectorAll('.l-nav__item[aria-haspopup="true"]');
  navItemsWithSubmenu.forEach((item) => {
    const innerList = item.querySelector('.l-nav__inner-list');

    item.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') return; // リンクをクリックした場合は処理しない

      const PlusIcon = item.querySelector('.c-icon-plus--nav');
      const isExpanded = item.getAttribute('aria-expanded') === 'true';

      if (isExpanded) {
        // メニュー展開されてるときの処理
        innerList.style.maxHeight = '0';
        item.setAttribute('aria-expanded', 'false');
        innerList.setAttribute('aria-hidden', 'true');
        PlusIcon.classList.remove('active');
      } else {
        // メニュー開閉されてるときの処理
        innerList.style.maxHeight = innerList.scrollHeight + 'px';
        item.setAttribute('aria-expanded', 'true');
        innerList.setAttribute('aria-hidden', 'false');
        PlusIcon.classList.add('active');
      }
    });
  });
};

// **ドロップダウンメニュー（992px以上のみ有効）**
const enableDropdownMenu = () => {
  if (!mediaQuery.matches) return; // 992px未満なら処理をスキップ

  const navItemsWithSubmenu = document.querySelectorAll('.l-nav__item[aria-haspopup="true"]');
  navItemsWithSubmenu.forEach((item) => {
    const link = item.querySelector('.l-nav__link');
    const submenu = item.querySelector('.l-nav__inner-list');

    // フォーカス or マウスホバーでメニューを開く
    const openMenu = () => {
      item.setAttribute('aria-expanded', 'true');
      submenu.setAttribute('aria-hidden', 'false');
    };

    // メニューを閉じる
    const closeMenu = () => {
      item.setAttribute('aria-expanded', 'false');
      submenu.setAttribute('aria-hidden', 'true');
    };

    link.addEventListener('focus', openMenu);
    link.addEventListener('mouseenter', openMenu); // 追加（hover で開く）

    // マウスが離れたらメニューを閉じる
    item.addEventListener('mouseleave', closeMenu);

    // キーボード操作でメニューを制御
    submenu.addEventListener('keydown', (e) => {
      const menuItems = submenu.querySelectorAll('a');
      const currentIndex = Array.from(menuItems).indexOf(document.activeElement);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % menuItems.length;
        menuItems[nextIndex].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
        menuItems[prevIndex].focus();
      } else if (e.key === 'Escape') {
        closeMenu();
        link.focus();
      }
    });

    // 外部クリックでメニューを閉じる
    document.addEventListener('click', (e) => {
      if (!item.contains(e.target)) {
        closeMenu();
      }
    });
  });
};

// **画面幅の変化を検知して、適切なメニューを適用**
const handleMenuBehavior = () => {
  document.querySelectorAll('.l-nav__inner-list').forEach((submenu) => {
    submenu.style.maxHeight = null; // 既存のスタイルをリセット
  });

  enableAccordionMenu();
  enableDropdownMenu();
};

mediaQuery.addEventListener('change', handleMenuBehavior);
handleMenuBehavior();
