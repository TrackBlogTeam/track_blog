let app = new Vue({
    el: '#app',
    data: {
        test: false,
        sidebarExpanses: ["test", "test", "test"],
        sidebarTest: {
            first: false
        },
        tableName: "user",
        table: {
            head: [],
            data: []
        }
    },
    methods: {
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

app.retrieveTable(app.tableName, 1, 10);
