import View from './View.js';
import { DEF_FIRST_PAGE } from '../config.js';
import * as model from '../model.js';

// // // // // // // // // // // //

class searchView extends View {
   _parentElement = document.querySelector('.search');

   getQuery() {
      const query = this._parentElement.querySelector('.search__field').value;
      this._clearInput();
      return query;
   }

   _clearInput() {
      this._parentElement.querySelector('.search__field').value = '';
   }

   addHandlerSearch(handler) {
      this._parentElement.addEventListener('submit', function (e) {
         e.preventDefault();
         model.state.search.page = DEF_FIRST_PAGE; // reset về trang đầu => Có thể search ra những data ít page hơn lần search trước
         handler();
      }); // Publisher - Subcriber pattern
   }
}

export default new searchView();
