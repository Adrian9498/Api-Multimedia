import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class podcasts extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_podcast: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    duration_p_e: {
      type: DataTypes.STRING,
      allowNull: false
    },
    episodes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    audio_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'audios',
        key: 'id_audio'
      }
    }
  }, {
    sequelize,
    tableName: 'podcasts',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "podcasts_pkey",
        unique: true,
        fields: [
          { name: "id_podcast" },
        ]
      },
    ]
  });
  }
}
