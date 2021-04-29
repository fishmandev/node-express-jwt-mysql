const mysql = require('../mysql');

module.exports = {
  /**
   * Retrieves user by custom field
   * 
   * @param field 
   * @param value 
   * @returns user object || null
   */
  getUserByField: (field, value) => {
    return mysql.getSession().then(session => {
      const userTable = session.getDefaultSchema().getTable('user');

      return userTable
        .select()
        .where(field + '=:value')
        .bind('value', value)
        .execute()
        .then(result => {
          session.close();
          let user = result.fetchOne();
          if (user) {
            return {
              'id': user[0],
              'username': user[1],
              'email': user[2],
              'password': user[3]
            }
          }
          return null;        
        });
    });
  },
};