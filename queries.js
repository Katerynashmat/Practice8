const Pool = require('pg').Pool;
const pool = new Pool({
 host: 'ec2-3-95-87-221.compute-1.amazonaws.com',
  database: 'dcsk7gi2rae78h',
  user:'fpzbbhxabybxnt',
  password: '0bb7a924cdfa7d3cb989f692243064ff11576caa3986fc19992ec8b8b64dcddf',
  port: 5432, 
  ssl: { rejectUnauthorized: false }
}) 


const getTable = (request, response) =>{
    pool.query('SELECT * FROM public.student', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
    })
}

const getStudentById = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query("SELECT * FROM public.student WHERE student.id = $1", [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
})
}


// const getUsers = (request, response) => {
//   pool.query('SELECT * FROM table_sample', (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// }

// const getUserById = (request, response) => {
//   const id = parseInt(request.params.id)

//   pool.query('SELECT * FROM table_sample WHERE id = $1', [id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// }


module.exports = {
    getTable,
    getStudentById
}