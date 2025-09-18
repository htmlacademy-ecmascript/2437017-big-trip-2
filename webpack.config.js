const path = require('node:path'); //обращение к протоколу
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js', // Точка входа
  output: {
    filename: 'bundle.js', // Имя файла с результатом сборки
    path: path.resolve(__dirname, 'build'), // Директория для файлов сборки(Путь к раб.)
    clean: true, // Удаляем предыдущую сборку перед созданием новой
  },
  devtool: 'source-map', // Генерируем карту исходного кода.
  plugins: [
    new CopyPlugin({
        patterns: [
          {
            from: 'public',
          },
        ],
    }),
  ],
};
