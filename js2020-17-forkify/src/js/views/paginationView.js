import View from './View.js';
import icons from 'url:../../img/icons.svg'; // parcel 2

// // // // // // // // // // // //

class PaginationView extends View {
   _parentElement = document.querySelector('.pagination');

   addHandlerClick(handler) {
      this._parentElement.addEventListener('click', function (e) {
         const btn = e.target.closest('.btn--inline');
         if (!btn) return;

         const goToPage = +btn.dataset.goto; // Trick đổi string => number

         handler(goToPage);
      }); // Publisher - Subcriber pattern
   }

   _generateMarkup() {
      // data đc pass vào là model.state.search ở controller

      // tính số page
      const currentPage = this._data.page;
      const numPages = Math.ceil(
         this._data.results.length / this._data.resultsPerPage
      );

      // Page 1 và CÓ page khác
      if (currentPage === 1 && numPages > 1) {
         return `
         <button data-goto="${
            currentPage + 1
         }" class="btn--inline pagination__btn--next">
            <svg class="search__icon">
               <use href="${icons}#icon-arrow-right"></use>
            </svg>
            <span>${currentPage + 1}</span>
         </button>
         `;
      }
      // Page cuối
      if (currentPage === numPages && numPages > 1) {
         return `
         <button data-goto="${
            currentPage - 1
         }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${currentPage - 1}</span>
         </button>
         `;
      }
      // Page khác
      if (currentPage < numPages) {
         return `
         <button data-goto="${
            currentPage + 1
         }" class="btn--inline pagination__btn--next">
            <svg class="search__icon">
               <use href="${icons}#icon-arrow-right"></use>
            </svg>
            <span>${currentPage + 1}</span>
         </button>

         <button data-goto="${
            currentPage - 1
         }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${currentPage - 1}</span>
         </button>
         `;
      }

      // Page 1 và KO CÓ page khác
      return '';
   }
}

export default new PaginationView();
