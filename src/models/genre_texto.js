import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class genre_texto extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_genre_texto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'genre',
        key: 'id_genre'
      }
    },
    texto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'textos',
        key: 'id_texto'
      }
    }
  }, {
    sequelize,
    tableName: 'genre_texto',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "genre_texto_pkey",
        unique: true,
        fields: [
          { name: "id_genre_texto" },
        ]
      },
    ]
  });
  }
}
