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
