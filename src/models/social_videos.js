import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class social_videos extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_social: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    duration: {
      type: DataTypes.REAL,
      allowNull: false
    },
    social_media: {
      type: DataTypes.STRING(255),
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
    tableName: 'social_videos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "social_videos_pkey",
        unique: true,
        fields: [
          { name: "id_social" },
        ]
      },
    ]
  });
  }
}
