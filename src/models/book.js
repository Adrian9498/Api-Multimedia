import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class book extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_book: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    chapters: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sheets: {
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
    tableName: 'book',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "book_pkey",
        unique: true,
        fields: [
          { name: "id_book" },
        ]
      },
    ]
  });
  }
}
