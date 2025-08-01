export function UserList(props) {
  const users = props.users;

  if (!Array.isArray(users)) {
    console.warn('UserList: users が配列ではありません', users);
    return '<p>ユーザー一覧がありません</p>';
  }

  return `
    <ul class="user-list">
      ${users.map(user => `
        <li class="user-item">
          <a href="#" class="user-link" data-user-id="${user.id}">
            <img src="${user.photo}" alt="${user.name}" />
            <span>${user.name}（${user.department}）</span>
          </a>
        </li>
      `).join('')}
    </ul>
  `;
}
