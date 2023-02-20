import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class textos extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_texto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    editorial: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    nu_pages: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    multimedia_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'multimedias',
        key: 'id_multimedia'
      }
    },
    tipo_archivo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipo_archivo',
        key: 'id_tipo_archivo'
      }
    }
  }, {
    sequelize,
    tableName: 'textos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "textos_pkey",
        unique: true,
        fields: [
          { name: "id_texto" },
        ]
      },
    ]
  });
  }
}
