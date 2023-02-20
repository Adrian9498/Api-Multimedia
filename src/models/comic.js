import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class comic extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_comic: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    chapters: {
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
    tableName: 'comic',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "comic_pkey",
        unique: true,
        fields: [
          { name: "id_comic" },
        ]
      },
    ]
  });
  }
}
