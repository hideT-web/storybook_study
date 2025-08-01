import { Top } from '../src/pages/Top.js';
import { listUsers } from '../src/data/Users.js';
import '../src/pages/top.css';
import '../src/components/header.css';
import '../src/components/menu.css';
import '../src/components/footer.css';
import { userModal } from '../src/assets/js/index.js';

/*function setupModalEvents(container, users) {
  const modal = container.querySelector('#user-modal');
  const modalBody = container.querySelector('#modal-body');
  const closeBtn = container.querySelector('#modal-close');

  if (!modal || !modalBody || !closeBtn) {
    console.warn('モーダルの要素が見つかりません');
    return;
  }

  container.querySelectorAll('.user-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const userId = link.dataset.userId;
      const user = users.find(u => String(u.id) === String(userId));
      if (user) {
        modalBody.innerHTML = `
          <h2>${user.name}</h2>
          <img src="${user.photo}" alt="${user.name}" />
          <p>部署：${user.department}</p>
          <p>役職：${user.role}</p>
        `;
        modal.style.display = 'block';
      }
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    modalBody.innerHTML = '';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      modalBody.innerHTML = '';
    }
  });
}*/

userModal;

export default {
  title: 'pages/Top',
  argTypes: {
    titleText: { control: 'text' },
    subtitleText: { control: 'text' },
    menuItems: { control: 'object' },
    children: { control: 'text' },
    copyright: { control: 'text' }
  }
};

export const Default = (args) => {
  const container = document.createElement('div');
  container.innerHTML = Top(args);
  /*setTimeout(() => {
    setupModalEvents(container, args.users);
  }, 0);*/
  return container;
};

Default.args = {
  titleText: 'マイサイト',
  subtitleText: 'ようこそ',
  menuItems: ['ホーム', 'ブログ', '採用情報'],
  children: '<p>ここがメインのコンテンツです。</p>',
  users: listUsers,
  copyright: '© マイサイト'
};
