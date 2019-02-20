const express = require('express')
const app = express()

// SHOW LIST OF PRODUCTS
app.get('/', (req, res, next) => {
    req.getConnection((error, conn) => {
        conn.query('SELECT * FROM products', (err, rows, fields) => {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
            } else {
                // render to views/user/list.ejs template file
                res.send(rows)
            }
        })
    })
})

app.delete('/delete/(:id)', (req, res, next) => {
    const product = { id: req.params.id }
    
    req.getConnection((error, conn) => {
        conn.query('DELETE FROM products WHERE id = ' + req.params.id, product, (err, result) => {
            //if(err) throw err
            if (err) {
                // req.flash('error', err)
                // redirect to users list page
                res.redirect('/products')
            } else {
                // req.flash('success', 'Product deleted successfully! id = ' + req.params.id)
                // redirect to users list page
                res.send('success')
                res.redirect('/products')
            }
        })
    })
})

module.exports = app;