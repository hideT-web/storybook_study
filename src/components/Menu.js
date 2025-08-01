export function Menu({ items = [] }) {
  return `
    <nav class="menu">
      <ul>
        ${items.map(item => `<li><a href="#">${item}</a></li>`).join('')}
      </ul>
    </nav>
  `;
}