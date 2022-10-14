const db = require("./db");
const helper = require("../helper");
const config = require("../config");

//ADDING NEW PRODUCTS
async function create(newProduct) {
  const result = await db.query(
    `INSERT INTO userdb.products (Name,Quantity,Price) VALUES ("${newProduct.Name}", "${newProduct.Quantity}", "${newProduct.Price}")`
  );

  let message = "Error in creating New Product";

  if (result.affectedRows) {
    message = "New Product created successfully";
  }

  return { message };
}

// DELETE PRODUCT
async function remove(id) {
  const result = await db.query(
    `DELETE FROM userdb.products WHERE id=("${id}")`
  );

  let message = "Error in deleting product";

  if (result.affectedRows) {
    message = "One product deleted successfully";
  }

  return { message };
}

// UPDATE PRODUCT
async function update(id, merchantProduct) {
  const result = await db.query(
    `UPDATE userdb.products 
      SET name="${merchantProduct.Name}", Quantity="${merchantProduct.Quantity}", Price="${merchantProduct.Price}" 
      WHERE id=${id}`
  );

  let message = "Error in updating Product";

  if (result.affectedRows) {
    message = "One Product updated successfully";
  }

  return { message };
}

// GET - to get list of products
async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query();
  const data = helper.emptyOrRows(rows);
  const meta = { page };
  return {
    data,
    meta,
  };
}

module.exports = {
  create,
  remove,
  update,
  getMultiple,
};
