
export default {
  props: ['page'],
  methods: {
  },
  //點選頁碼切換頁面 內部觸發傳到外部    $emit-page item 點選後帶出頁碼往外傳
  template: `<nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" :class="{'disabled':!page.has_pre}">
            <a class="page-link" href="#" aria-label="Previous"  @click="$emit('emit-page',page.current_page -1)">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>                                                                            
          <li class="page-item" v-for="(item,key) in page.total_pages"
          :key="item"
          :class="{'active':item === page.current_page}">
            <a class="page-link" href="#" @click="$emit('emit-page',item)">{{ item }}</a>
            </li>
          <li class="page-item"  :class="{'disabled':!page.has_next}">
            <a class="page-link" href="#" aria-label="Next" @click="$emit('emit-page',page.current_page +1)">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
        </nav>`
};