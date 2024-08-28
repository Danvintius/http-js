(()=>{"use strict";class t{static getTicketHTML(t){const{id:e,name:s,description:a,status:o,created:i}=t;return`\n          <div class="ticket" id="${e}">\n            <a href="#" class="ticket__control-status ${o?"active":""}"></a>\n            <div class="ticket__name">\n              ${s}\n              <p class="ticket__description">${a}</p>\n            </div>\n            <span class="timestamp">${i}</span>\n            <a href="#" class="ticket__control-edit">&#9998;</a>\n            <a href="#" class="ticket__control-delete">&#10005;</a>\n          </div>\n        `}}const e=document.querySelector(".modal"),s=e.querySelector(".modal__form"),a=e.querySelector(".modal__header"),o=e.querySelector(".form__controls"),i=e.querySelector(".form__description"),r=e.querySelector(".modal__button-cancel"),c=document.querySelector(".tickets__list"),n=document.querySelector(".add-button");new class{constructor(t,e,s,a){this.button=t,this.modal=e,this.modalHeader=s,this.modalFormControls=a}assignHandler(){this.button.addEventListener("click",(()=>{this.modalHeader.innerText="Добавить тикет",this.modalFormControls.classList.add("active"),this.modal.classList.add("active")}))}}(n,e,a,o);addBtn.assignHandler();const l=new class{constructor(t){this.baseURL=t}createRequest(t){if(!t)throw new Error("Параметр options функции createRequest не задан");const{method:e,data:s,callback:a}=t;let o=this.baseURL;t.url&&(o+=t.url);const i=new XMLHttpRequest;try{i.open(e,o),i.onloadend=()=>{if(String(i.status).startsWith("2"))console.log("Сервер принял и обработал запрос."),a&&a(i.response);else{let t="Сервер не принял запрос. ";t+=`Ошибка ${i.status}: ${i.statusText}.`,console.error(t)}},void 0===s?i.send():i.send(s)}catch(t){console.error(t)}}}("https://help-desk-backend-2021.herokuapp.com/"),d=new class extends t{constructor(t,e,s,a,o,i,r,c){super(),this.modal=t,this.modalForm=e,this.modalHeader=s,this.modalFormControls=a,this.modalFormDescription=o,this.cancelBtn=i,this.ticketsList=r,this.negotiator=c}assignCommonHandler(){this.modalForm.addEventListener("submit",(t=>{t.preventDefault();const{ticketId:e}=t.currentTarget.dataset;let s;e&&(s=this.ticketsList.querySelector(`#${e}`));const a=new URLSearchParams;if(Array.from(t.currentTarget.elements).filter((({name:t})=>t)).forEach((({name:t,value:e})=>a.append(t,e))),a.append("status",!1),a.append("method","createTicket"),"Добавить тикет"===this.modalHeader.innerText)this.negotiator.createRequest({method:"POST",data:a,callback:t=>{const e=JSON.parse(t),s=this.constructor.getTicketHTML(e);this.ticketsList.insertAdjacentHTML("beforeend",s),this.modalFormControls.classList.remove("active"),console.log("Новый тикет был добавлен.")}});else if("Изменить тикет"===this.modalHeader.innerText){const a=s.querySelector(".ticket__name"),o=s.querySelector(".ticket__description"),i=new URLSearchParams;Array.from(t.currentTarget.elements).filter((({name:t})=>t)).forEach((({name:t,value:e})=>i.append(t,e))),i.append("id",e),i.append("method","changeTicket"),this.negotiator.createRequest({method:"PATCH",data:i,callback:t=>{const e=JSON.parse(t);Object.prototype.hasOwnProperty.call(e,"name")&&a.firstChild.replaceWith(e.name),Object.prototype.hasOwnProperty.call(e,"description")&&(o.innerText=e.description),this.modalFormControls.classList.remove("active"),console.log("Измененные значения сохранены.")}})}else"Удалить тикет"===this.modalHeader.innerText&&this.negotiator.createRequest({method:"DELETE",url:`?method=deleteTicket&id=${e}`,callback:()=>{s.remove(),this.modalFormDescription.classList.remove("active"),console.log(`Тикет с id #${e} был удален.`)}});this.modalForm.reset(),this.modal.classList.remove("active")}))}assignCancelBtnHandler(){this.cancelBtn.onclick=t=>{this.modalForm.reset(),this.modalFormControls.classList.remove("active"),this.modalFormDescription.classList.remove("active"),t.currentTarget.closest(".modal").classList.remove("active")}}}(e,s,a,o,i,r,c,l);d.assignCommonHandler(),d.assignCancelBtnHandler();const m=new class extends t{constructor(t,e,s,a,o,i,r){super(),this.ticketsList=t,this.modal=e,this.modalForm=s,this.modalHeader=a,this.modalFormControls=o,this.modalFormDescription=i,this.negotiator=r}assignHandler(){this.ticketsList.addEventListener("click",(t=>{const{target:e}=t,s=e.className,a=e.closest(".ticket");if(s.startsWith("ticket__control-status")){e.classList.toggle("active");const t=new URLSearchParams;t.append("id",a.id),t.append("status",e.classList.contains("active")),t.append("method","changeTicket"),this.negotiator.createRequest({method:"PATCH",data:t,callback:t=>{const e=JSON.parse(t);console.log(`Статус тикета с id #${a.id} был изменен на ${e.status}`)}})}else if(s.startsWith("ticket__description"))e.classList.remove("active");else if("ticket__control-edit"===s)this.modalForm.dataset.ticketId=a.id,this.modalHeader.innerText="Изменить тикет",this.modalFormControls.classList.add("active"),this.modal.classList.add("active");else if("ticket__control-delete"===s)this.modalForm.dataset.ticketId=a.id,this.modalHeader.innerText="Удалить тикет",this.modalFormDescription.classList.add("active"),this.modal.classList.add("active");else{a.querySelector(".ticket__description").classList.add("active")}}))}downloadTickets(){this.negotiator.createRequest({method:"GET",url:"?method=allFullTickets",callback:t=>{const e=JSON.parse(t);let s="";e.forEach((t=>{s+=this.constructor.getTicketHTML(t)})),this.ticketsList.insertAdjacentHTML("beforeend",s),console.log("Все тикеты загружены с сервера.")}})}}(c,e,s,a,o,i,l);m.assignHandler(),m.downloadTickets()})();