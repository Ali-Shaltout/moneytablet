google.load("visualization", "1", {packages: ["corechart"]});

function doStats() {
    var statisticsOverview = {
        init: function() {
            var self = this;

            $.get('/statistics/get-statistics',
                    function(data) {
                        self.drawIncomeChart(data);
                        self.drawExpensesChart(data);
                        self.drawEconomiesChart(data);
                    },
                    'json'
                    );
        },
        drawIncomeChart: function(data) {
            var options = {
                title: 'Income Performance',
                colors: ['green'],
                vAxis: {minValue: 0}
            };
            var id = 'chart_income';

            this.drawLineChart(data.incomes, options, id);
        },
        drawExpensesChart: function(data) {
            var options = {
                title: 'Expense Performance',
                colors: ['red'],
                vAxis: {minValue: 0}
            };
            var id = 'chart_expenses';

            this.drawLineChart(data.expenses, options, id);

        },
        drawEconomiesChart: function(data) {
            var options = {
                title: 'Savings Performance',
                colors: ['orange'],
                vAxis: {minValue: 0}
            };

            var id = 'chart_economies';


            this.drawLineChart(data.savings, options, id);
        },
        drawLineChart: function(data, options, id) {
            var chartData = google.visualization.arrayToDataTable(data);



            var chart = new google.visualization.LineChart(document.getElementById(id));
            chart.draw(chartData, options);
        }
    };

    statisticsOverview.init();
}

google.setOnLoadCallback(doStats);