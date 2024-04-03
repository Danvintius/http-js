export default class Button {
    constructor(
      button,
      modal,
      modalHeader,
      modalFormControls,
    ) {
      this.button = button;
      this.modal = modal;
      this.modalHeader = modalHeader;
      this.modalFormControls = modalFormControls;
    }
  
    assignHandler() {
      this.button.addEventListener('click', () => {
        this.modalHeader.innerText = 'Добавить тикет';
        this.modalFormControls.classList.add('active');
        this.modal.classList.add('active');
      });
    }
  }