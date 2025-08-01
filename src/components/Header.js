export function Header({ titleText = 'マイサイト', subtitleText = '' }) {
  return `
    <header class="header">
      <h1>${titleText}</h1>
      ${subtitleText ? `<p>${subtitleText}</p>` : ''}
    </header>
  `;
}