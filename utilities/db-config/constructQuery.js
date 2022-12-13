const loginQuery = (email, password) => {
  const data = {
    email: email,
    password: password,
  };
  const query = `select customer_email, customer_name 
  from customers 
  where customer_email = '${data.email}' 
  and password = '${data.password}';`;
  return query;
};

const getUserDetailsQuery = (userData, email) => {
  var query;
  if (userData.fields) {
    query = `select ${userData.fields} 
    from customer_orders 
    inner join products on customer_orders.product_id = products.product_id 
    inner join customers on customers.customer_email = customer_orders.customer_email 
    where customers.customer_email = '${email}'`;
  } else {
    query = `select C.customer_name, C.contact,C.customer_email, C.gender, C.address, P.product_name, P.product_price, P.availability, P.ratings 
    from customer_orders as CO 
    inner join products as P on CO.product_id = P.product_id 
    inner join customers as C on C.customer_email = CO.customer_email 
    where C.customer_email = '${email}'`;
  }
  return query;
};

const constructProductDetailsQuery = (userInput) => {
  const items = userInput.items || 5;
  const page = parseInt(userInput.page) * 2 || 1;
  var filterBy;
  var sortBy;
  var sqlQuery;

  if (userInput.filterBy) {
    filterBy = userInput.filterBy.split(",");
  } else {
    filterBy = [];
  }

  if (userInput.sortBy) {
    sortBy = userInput.sortBy.split(",");
  } else {
    sortBy = userInput.sortBy;
  }

  if (!sortBy && !filterBy && !items && !page) {
    sqlQuery = "select * from products";
    return sqlQuery;
  }

  if (!sortBy && filterBy.length === 0) {
    sqlQuery = `select * from products limit ${items} offset ${page}`;
    return sqlQuery;
  }

  if (!sortBy) {
    if (filterBy[0] === "product_price" && filterBy.length > 0) {
      sqlQuery = `select * from products where ${filterBy[0]} ${filterBy[1]} ${filterBy[2]} limit ${items} offset ${page}`;
      return sqlQuery;
    } else {
      sqlQuery = `select * from products where ${filterBy[0]} like '${filterBy[1]}%' limit ${items} offset ${page}`;
      return sqlQuery;
    }
  }

  if (filterBy.length === 0) {
    sqlQuery = `select * from products order by ${sortBy[0]} ${sortBy[1]} limit ${items} offset ${page}`;
    return sqlQuery;
  }

  if (items) {
    sqlQuery = `select * from products where ${filterBy[0]} ${filterBy[1]} ${filterBy[2]} order by ${sortBy[0]} ${sortBy[1]} limit ${items} offset ${page}`;
    return sqlQuery;
  }

  if (page) {
    sqlQuery = `select * from products where ${filterBy[0]} ${filterBy[1]} ${filterBy[2]} order by ${sortBy[0]} ${sortBy[1]} limit ${items} offset ${page}`;
    return sqlQuery;
  }
};

module.exports = {
  loginQuery,
  getUserDetailsQuery,
  constructProductDetailsQuery,
};
