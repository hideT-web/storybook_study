export function Footer({ copyright }) {
  const year = new Date().getFullYear();
  return `
    <footer class="footer">
      <p>&copy; ${year} ${copyright}</p>
    </footer>
  `;
}