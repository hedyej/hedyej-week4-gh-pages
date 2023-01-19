export default {
    props:["pages","getProduct"],
    template:
    `
    <nav aria-label="Page navigation example" v-if="pages.total_pages > 0">
        <ul class="pagination">
            <li class="page-item" :class="{disabled : pages.current_page === 1}" @click="getProduct(pages.current_page-1)">
                <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item" :class="{active : page === pages.current_page}" v-for="page in pages.total_pages" :key="page + 'page'">
                <a class="page-link" href="#" @click="getProduct(page)">{{page}}</a>
            </li>
            <li class="page-item" :class="{disabled : pages.total_pages === pages.current_page}" @click="getProduct(pages.current_page+1)">
                <a class="page-link"  href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>`
}