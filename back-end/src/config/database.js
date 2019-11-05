module.exports = {
  username: 'postgres',
  password: 'docker',
  database: 'gympoint',
  host: '127.0.0.1',
  dialect: 'postgres',
  operatorAliases: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
