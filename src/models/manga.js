import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class manga extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_manga: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    chapters: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    volumes: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    tableName: 'manga',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "manga_pkey",
        unique: true,
        fields: [
          { name: "id_manga" },
        ]
      },
    ]
  });
  }
}
