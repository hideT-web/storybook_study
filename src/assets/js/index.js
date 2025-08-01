import { listUsers } from "../../data/Users.js";

export const userModal = () =>{
  const modal = document.querySelector('#user-modal');
  const modalBody = document.querySelector('#modal-body');
  const closeBtn = document.querySelector('#modal-close');
  const userLink = document.querySelectorAll('.user-link');

 if (!modal || !modalBody || !closeBtn) {
    //console.warn('モーダルの要素が見つかりません');
    return;
  }

  userLink.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const userId = link.dataset.userId;
      //users.jsの配列からIDが一致するユーザ情報を探す
      const user = listUsers.find(u => String(u.id) === String(userId));
      if (!user) {
        modalBody.innerHTML =`<p>ユーザー情報が見つかりません </p>`;
        return;
      }
      modalBody.innerHTML = `
        <h2>${user.name}</h2>
        <img src="${user.photo}" alt="${user.name}" />
        <p>部署：${user.department}</p>
        <p>役職：${user.role}</p>
        `;
      modal.style.display = 'flex';
      
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
}


document.addEventListener('DOMContentLoaded', () => {
  userModal();
});

