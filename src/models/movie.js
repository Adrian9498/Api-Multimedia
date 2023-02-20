import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class movie extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_movie: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    duration: {
      type: DataTypes.REAL,
      allowNull: false
    },
    issequel: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    video_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'videos',
        key: 'id_video'
      }
    }
  }, {
    sequelize,
    tableName: 'movie',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "movie_pkey",
        unique: true,
        fields: [
          { name: "id_movie" },
        ]
      },
    ]
  });
  }
}
