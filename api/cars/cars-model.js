const db = require("../../data/db-config.js")




const getAll = () => {
  return db('cars')
}

const getById = (id) => {
  // DO YOUR MAGIC
  return db('cars')
    .where({ id })
    .first()
}

const create = async (newCar) => {
  // DO YOUR MAGIC
  const [id] = await db('cars').insert(newCar)
  return getById(id)

}
module.exports = {
  getAll,
  getById,
  // getByVin,
  create
}