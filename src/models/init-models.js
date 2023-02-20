import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _audio_books from  "./audio_books.js";
import _audios from  "./audios.js";
import _book from  "./book.js";
import _comic from  "./comic.js";
import _creators from  "./creators.js";
import _genre from  "./genre.js";
import _genre_audio from  "./genre_audio.js";
import _genre_texto from  "./genre_texto.js";
import _genre_video from  "./genre_video.js";
import _manga from  "./manga.js";
import _movie from  "./movie.js";
import _multimedias from  "./multimedias.js";
import _podcasts from  "./podcasts.js";
import _publishers from  "./publishers.js";
import _series from  "./series.js";
import _social_videos from  "./social_videos.js";
import _songs from  "./songs.js";
import _textos from  "./textos.js";
import _tipo_archivo from  "./tipo_archivo.js";
import _videos from  "./videos.js";

export default function initModels(sequelize) {
  const audio_books = _audio_books.init(sequelize, DataTypes);
  const audios = _audios.init(sequelize, DataTypes);
  const book = _book.init(sequelize, DataTypes);
  const comic = _comic.init(sequelize, DataTypes);
  const creators = _creators.init(sequelize, DataTypes);
  const genre = _genre.init(sequelize, DataTypes);
  const genre_audio = _genre_audio.init(sequelize, DataTypes);
  const genre_texto = _genre_texto.init(sequelize, DataTypes);
  const genre_video = _genre_video.init(sequelize, DataTypes);
  const manga = _manga.init(sequelize, DataTypes);
  const movie = _movie.init(sequelize, DataTypes);
  const multimedias = _multimedias.init(sequelize, DataTypes);
  const podcasts = _podcasts.init(sequelize, DataTypes);
  const publishers = _publishers.init(sequelize, DataTypes);
  const series = _series.init(sequelize, DataTypes);
  const social_videos = _social_videos.init(sequelize, DataTypes);
  const songs = _songs.init(sequelize, DataTypes);
  const textos = _textos.init(sequelize, DataTypes);
  const tipo_archivo = _tipo_archivo.init(sequelize, DataTypes);
  const videos = _videos.init(sequelize, DataTypes);

  audio_books.belongsTo(audios, { as: "audio", foreignKey: "audio_id"});
  audios.hasMany(audio_books, { as: "audio_books", foreignKey: "audio_id"});
  genre_audio.belongsTo(audios, { as: "audio", foreignKey: "audio_id"});
  audios.hasMany(genre_audio, { as: "genre_audios", foreignKey: "audio_id"});
  podcasts.belongsTo(audios, { as: "audio", foreignKey: "audio_id"});
  audios.hasMany(podcasts, { as: "podcasts", foreignKey: "audio_id"});
  songs.belongsTo(audios, { as: "audio", foreignKey: "audio_id"});
  audios.hasMany(songs, { as: "songs", foreignKey: "audio_id"});
  multimedias.belongsTo(creators, { as: "creator", foreignKey: "creator_id"});
  creators.hasMany(multimedias, { as: "multimedia", foreignKey: "creator_id"});
  genre_audio.belongsTo(genre, { as: "genre", foreignKey: "genre_id"});
  genre.hasMany(genre_audio, { as: "genre_audios", foreignKey: "genre_id"});
  genre_texto.belongsTo(genre, { as: "genre", foreignKey: "genre_id"});
  genre.hasMany(genre_texto, { as: "genre_textos", foreignKey: "genre_id"});
  genre_video.belongsTo(genre, { as: "genre", foreignKey: "genre_id"});
  genre.hasMany(genre_video, { as: "genre_videos", foreignKey: "genre_id"});
  audios.belongsTo(multimedias, { as: "multimedium", foreignKey: "multimedia_id"});
  multimedias.hasMany(audios, { as: "audios", foreignKey: "multimedia_id"});
  textos.belongsTo(multimedias, { as: "multimedium", foreignKey: "multimedia_id"});
  multimedias.hasMany(textos, { as: "textos", foreignKey: "multimedia_id"});
  videos.belongsTo(multimedias, { as: "multimedium", foreignKey: "multimedia_id"});
  multimedias.hasMany(videos, { as: "videos", foreignKey: "multimedia_id"});
  multimedias.belongsTo(publishers, { as: "publisher", foreignKey: "publisher_id"});
  publishers.hasMany(multimedias, { as: "multimedia", foreignKey: "publisher_id"});
  book.belongsTo(textos, { as: "texto", foreignKey: "texto_id"});
  textos.hasMany(book, { as: "books", foreignKey: "texto_id"});
  comic.belongsTo(textos, { as: "texto", foreignKey: "texto_id"});
  textos.hasMany(comic, { as: "comics", foreignKey: "texto_id"});
  genre_texto.belongsTo(textos, { as: "texto", foreignKey: "texto_id"});
  textos.hasMany(genre_texto, { as: "genre_textos", foreignKey: "texto_id"});
  manga.belongsTo(textos, { as: "texto", foreignKey: "texto_id"});
  textos.hasMany(manga, { as: "mangas", foreignKey: "texto_id"});
  audios.belongsTo(tipo_archivo, { as: "tipo_archivo", foreignKey: "tipo_archivo_id"});
  tipo_archivo.hasMany(audios, { as: "audios", foreignKey: "tipo_archivo_id"});
  textos.belongsTo(tipo_archivo, { as: "tipo_archivo", foreignKey: "tipo_archivo_id"});
  tipo_archivo.hasMany(textos, { as: "textos", foreignKey: "tipo_archivo_id"});
  videos.belongsTo(tipo_archivo, { as: "tipo_archivo", foreignKey: "tipo_archivo_id"});
  tipo_archivo.hasMany(videos, { as: "videos", foreignKey: "tipo_archivo_id"});
  genre_video.belongsTo(videos, { as: "video", foreignKey: "video_id"});
  videos.hasMany(genre_video, { as: "genre_videos", foreignKey: "video_id"});
  movie.belongsTo(videos, { as: "video", foreignKey: "video_id"});
  videos.hasMany(movie, { as: "movies", foreignKey: "video_id"});
  series.belongsTo(videos, { as: "video", foreignKey: "video_id"});
  videos.hasMany(series, { as: "seriess", foreignKey: "video_id"});
  social_videos.belongsTo(videos, { as: "video", foreignKey: "video_id"});
  videos.hasMany(social_videos, { as: "social_videos", foreignKey: "video_id"});

  return {
    audio_books,
    audios,
    book,
    comic,
    creators,
    genre,
    genre_audio,
    genre_texto,
    genre_video,
    manga,
    movie,
    multimedias,
    podcasts,
    publishers,
    series,
    social_videos,
    songs,
    textos,
    tipo_archivo,
    videos,
  };
}
