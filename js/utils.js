export const imprimir = (elemento, contenido) => {
    document.querySelector(`#${elemento}`).innerHTML = contenido;
  };
// utils.js
export function setupModal(openBtnId, modalId, closeBtnId) {
  const openModalBtn = document.getElementById(openBtnId);
  const modal = document.getElementById(modalId);
  const closeModalBtn = document.getElementById(closeBtnId);

  if (!openModalBtn || !modal || !closeModalBtn) {
    console.warn('Algún elemento modal no fue encontrado');
    return;
  }

  openModalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}

  
  
  