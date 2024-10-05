var express = require('express');

var router = express.Router();
const sql = require('mssql');

const config = {
    user: 'bogdatech-test', // better stored in an app setting such as process.env.DB_USER
    password: 'Hyw124563', // better stored in an app setting such as process.env.DB_PASSWORD
    server: 'bogdatech-test.database.windows.net', // better stored in an app setting such as process.env.DB_SERVER
    port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
    database: 'test-database', // better stored in an app setting such as process.env.DB_NAME
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}

router.get('/test', function(req, res, next) {
  res.send('Hello world');
});


async function connectAndQuery() {
        var poolConnection = await sql.connect(config);

        console.log("Reading rows from the Table...");
        var resultSet = await poolConnection.request().query(`SELECT TOP (20) * FROM [dbo].[test]`);

        console.log(`${resultSet.recordset.length} rows returned.`);
        console.log(`data: ${resultSet.toString()}`);

        // output column headers
        var columns = "";
        for (var column in resultSet.recordset.columns) {
            columns += column + ", ";
        }
        console.log("%s\t", columns.substring(0, columns.length - 2));

        // ouput row contents from default record set
        resultSet.recordset.forEach(row => {
            console.log("%s\t%s", row.CategoryName, row.ProductName);
        });

        // close connection only when we're certain application is finished
        poolConnection.close();
}

/* GET home page. */
router.get('/', async function(req, res, next) {
//  Task.find()
//    .then((tasks) => {
//      const currentTasks = tasks.filter(task => !task.completed);
//      const completedTasks = tasks.filter(task => task.completed === true);
//
//      console.log(`Total tasks: ${tasks.length}   Current tasks: ${currentTasks.length}    Completed tasks:  ${completedTasks.length}`)
//      res.render('index', { currentTasks: currentTasks, completedTasks: completedTasks });
//    })
//    .catch((err) => {
//      console.log(err);
//      res.send('Sorry! Something went wrong.');
//    });
  await connectAndQuery();
  res.send('Get successful! ');
});

module.exports = router;
