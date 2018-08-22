let app = new Vue({
    el: '#app',
    data: {
        currentPage: 1,
        pageNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        tableName: "user",
        table: {
            head: [],
            data: []
        }
    },
    methods: {
        nextPage: function () {
        },
        previousPage: function () {
            if (this.currentPage == 1) {
                return;
            } else {
                this.currentPage -= 1;
                for (let i = 0; i < this.pageNumbers.length; ++i) {
                    this.pageNumbers[i] = this.currentPage + i;
                }
            }
        },
        toggleExpand: function (event) {
            const element = event.currentTarget;
            let targetElement = element.nextElementSibling
            let imageElement = element.firstElementChild.nextElementSibling.nextElementSibling
            if (element.getAttribute("data-expand") === "false") {
                element.setAttribute("data-expand", "true");
                targetElement.setAttribute("data-expand", "true")
                imageElement.setAttribute("data-expand", "true")
            } else {
                element.setAttribute("data-expand", "false");
                targetElement.setAttribute("data-expand", "false")
                imageElement.setAttribute("data-expand", "false")
            }
        },
        retrieveTable: function (tableName, pageNumber, limit) {
            ajax({
                url: "https://www.track-blog.com/back/api/retrieve_table.php",
                method: "POST",
                data: {
                    pageNumber: pageNumber,
                    limit: limit,
                    tableName: tableName
                },
                success: (response) => {
                    const responseObject = JSON.parse(response);
                    this.loadTable(responseObject);
                }
            })
        },
        loadTable: function (table) {
            if (table === null || typeof table.head === "undefined") {
                return;
            }
            this.table = table
        }
    }
});

// app.retrieveTable(app.tableName, 1, 10);
