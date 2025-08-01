import { UserList } from '../src/components/UserList';
import { listUsers } from '../src/data/Users'
import '../src/components/userlist.css'

export default {
  title: 'components/UserList',
  argTypes: {
    users: {
      control: { type: 'object' }, // ← JSON形式の入力を可能にする
      description: 'ユーザー一覧',
      defaultValue: listUsers,
    }
  }
};

export const Default = ({ users }) => {
  const userItems = users.map(user => `
    <li class="user-item">
      <img src="${user.photo}" alt="${user.name}" class="user-photo" />
      <span>${user.name}（${user.department}）</span>
    </li>
  `).join('');

  return `
    <section class="user-list-section">
      <h2>ユーザー一覧</h2>
      <ul class="user-list">
        ${userItems}
      </ul>
    </section>
  `;
};

// ユーザリスト（JSON形式）
Default.args = {
  users:  listUsers
};