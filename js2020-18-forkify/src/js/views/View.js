import icons from 'url:../../img/icons.svg'; // parcel 2

// // // // // // // // // // // //

export default class View {
   _data;
   render(data) {
      if (!data || (Array.isArray(data) && data.length === 0))
         return this.renderError();

      this._data = data;
      const markup = this._generateMarkup();
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
   }

   update(data) {
      this._data = data;
      const newMarkup = this._generateMarkup();

      const newDOM = document.createRange().createContextualFragment(newMarkup); // return document-fragment
      const newElements = Array.from(newDOM.querySelectorAll('*')); // Array.from() : convert nodeList => array
      const curElements = Array.from(this._parentElement.querySelectorAll('*'));

      newElements.forEach((newEl, i) => {
         const curEl = curElements[i];

         // change text element
         // newEl.firstChild.nodeValue.trim() check để replace thẻ CHỨA TEXT chứ ko phải thay hết cả node
         if (
            !newEl.isEqualNode(curEl) &&
            newEl.firstChild?.nodeValue.trim() !== '' // Optional chaining (make sure 100% work)
         ) {
            curEl.textContent = newEl.textContent;
         }

         // change attribute
         if (!newEl.isEqualNode(curEl)) {
            // newEl.attributes returns NameNodeMap => cần convert sang array để loop
            Array.from(newEl.attributes).forEach(attribute => {
               curEl.setAttribute(attribute.name, attribute.value);
            });
         }
      });
   }

   _clear() {
      this._parentElement.innerHTML = '';
   }

   renderSpinner() {
      const markup = `
         <div class="spinner">
            <svg>
            <use href="${icons}#icon-loader"></use>
            </svg>
         </div>
      `;
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
   }

   renderError(message = this._errorMessage) {
      const markup = `
         <div class="error">
            <div>
               <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
               </svg>
             </div>
            <p>${message}</p>
         </div>
      `;
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
   }

   renderMessage(message = this._message) {
      const markup = `
         <div class="message">
            <div>
               <svg>
                  <use href="${icons}#icon-smile"></use>
               </svg>
             </div>
            <p>${message}</p>
         </div>
      `;
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
   }
}

// vì sao lại ko dùng export default new?
// tutor nói mình ko cần phải tạo instance nào từ cái view này hết. Chỉ dùng làm parent class
