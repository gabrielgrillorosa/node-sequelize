module.exports = {
    username: 'postgres',
    password: '030201',
    database: 'callcenter',
    host: '127.0.0.1',
    dialect: 'postgres',
    dialectOptions: {
        useUTC: true, //for reading from database
        dateStrings: true,
        typeCast: true,
        timezone: '+02:00',
    },
    timezone: '+02:00',
    useUTC: true,
    define:{
        underscored: true,
        timestamp: true
    }
  };