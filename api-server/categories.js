const clone = require('clone')
const config = require('./config')

let db = {}

const defaultData = {
  categories: [
      {
        name: 'react',
        path: 'react'
      },
      {
        name: 'redux',
        path: 'redux'
      },
      {
        name: 'udacity',
        path: 'udacity'
      }
  ]
}

function getData (token) {
  //Each token has it's own copy of the DB. The token in this case is like an app id.
  let data = db[token]
  //This populates the default user data if there isn't any in the db.
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getAll (token) {
  return new Promise((res) => {
    res(getData(token))
  })
}

function add (token, cat) {
  return new Promise((res) => {
    let defaultData = getData(token)

    category = {
      name: cat.name,
      path: cat.path,
    }

    defaultData.categories.push(category);
    res(category)
  })
}

function remove (token, categoryPath) {
  return new Promise((res) => {
    let defaultData = getData(token)

    const newData = defaultData.categories.filter( categoryDB => categoryDB.path !== categoryPath );
    defaultData.categories = newData
    res(defaultData.categories)
  })
}

function edit (token, catPath, categoryEdited) {
  return new Promise((res) => {
      let defaultData = getData(token)
      let categories = defaultData.categories
      for (let i = 0; i < categories.length; i++) {
        if(categories[i].path === catPath) {
          categories[i].name = categoryEdited.name
          categories[i].path = categoryEdited.path
        }
      }

      res(categories)
  })
}

module.exports = {
  getAll,
  add,
  remove,
  edit
}
