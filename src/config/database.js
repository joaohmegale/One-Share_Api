module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: '1234',
  database: 'one-share-api',
  define:{
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  }
}