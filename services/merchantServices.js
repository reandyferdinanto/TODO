const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT Id,Password, Name, Address, Join_date, phone_number 
    FROM userdb.usertable LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };
  return {
    data,
    meta,
  };
}

async function create(newUser) {
  const result = await db.query(
    `INSERT INTO userdb.usertable (Password,Name,Address,Join_date,phone_number) VALUES ("${newUser.Password}", "${newUser.Name}", "${newUser.Address}", "${newUser.Join_date}", "${newUser.phone_number}")`
  );

  let message = "Error in creating New Merchant User";

  if (result.affectedRows) {
    message = "New Merchant User created successfully";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM userdb.usertable WHERE id=("${id}")`
  );

  let message = "Error in deleting User Merchant";

  if (result.affectedRows) {
    message = "Merchant User deleted successfully";
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
  remove,
};
