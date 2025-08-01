import { Header } from '../components/Header.js';
import { Menu } from '../components/Menu.js';
import { Footer } from '../components/Footer.js';
import { UserList } from '../components/UserList.js';

export function Top(props) {
  const {
    titleText,
    subtitleText,
    menuItems,
    children = '',
    copyright,
    users
  } = props;

  return `
    ${Header({ titleText, subtitleText })}
    ${Menu({ items: menuItems })}
    <main>
    ${children}
    ${UserList({users})}
      <div id="user-modal" class="modal">
        <div class="modal-content">
          <span id="modal-close" class="modal-close">&times;</span>
          <div id="modal-body"></div>
        </div>
      </div>
    </main>
    ${Footer({ copyright })}
  `;
}
