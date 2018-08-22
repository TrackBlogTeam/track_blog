let app = new Vue({
    el: '#app',
    data: {
        recordsPerPage: 10,
        currentPageNumber: 1,
        pageNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        tableName: "user",
        table: {
            head: [],
            data: []
        }
    },
    methods: {
        jumpTo: function (pageNumber) {
            console.log('Entering jumpTo');
            if (typeof pageNumber === "number") {
                console.log('Jump to ' + pageNumber);
                app.retrieveTable(app.tableName, pageNumber, app.recordsPerPage);
            } else {
                const event = pageNumber;
                console.log('Jump to ' + event.target.previousElementSibling.value);
                app.retrieveTable(app.tableName, event.target.previousElementSibling.value, app.recordsPerPage);
            }
        },
        nextPage: function () {
            app.retrieveTable(app.tableName, app.currentPageNumber + 1, app.recordsPerPage);
        },
        previousPage: function () {
            app.retrieveTable(app.tableName, app.currentPageNumber - 1, app.recordsPerPage);
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
                success: function (response) {
                    const responseObject = JSON.parse(response);
                    if (responseObject === null || typeof responseObject.head === undefined) {
                        return;
                    }
                    app.table = responseObject;
                    app.tableName = tableName;
                    app.currentPageNumber = parseInt(pageNumber);
                    console.log('Current page number is set to ' + pageNumber);
                    console.log(app);
                    for (let i = 0; i < app.pageNumbers.length; ++i) {
                        app.pageNumbers[i] = app.currentPageNumber + i;
                    }
                }
            })
        }
    }
});

app.retrieveTable(app.tableName, 1, 10);
