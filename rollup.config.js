// Imports
import commonjs from 'rollup-plugin-commonjs';
import coffee from 'rollup-plugin-coffee-script';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';

import $package from './package.json';

// Common
var config = {
  input: 'src/Main.coffee',

  output: {
    file: 'dist/kasza',
    format: 'umd',
    name: 'kasza-js',
    banner: '/* Kasza.js v' + $package.version + ' | (c) Marek Sierociński and other contributors | https://github.com/marverix/i18njs/blob/master/LICENSE.md */'
  },

  extensions: ['.js', '.coffee']
};

// Export
export default [
  // Uncompressed config
  {
    input: config.input,
  
    output: {
      file: config.output.file + '.js',
      format: config.output.format,
      name:  config.output.name,
      banner: config.output.banner
    },
  
    plugins: [
      coffee(),
      nodeResolve({
        extensions: config.extensions
      }),
      commonjs({
        extensions: config.extensions
      })
    ]
  },

  // Compressed config
  {
    input: config.input,
  
    output: {
      file: config.output.file + '.min.js',
      format: config.output.format,
      name:  config.output.name,
      banner: config.output.banner
    },
  
    plugins: [
      coffee(),
      nodeResolve({
        extensions: config.extensions
      }),
      commonjs({
        extensions: config.extensions
      }),
      uglify({
        output: {
          comments: 'all'
        }
      })
    ]
  }
]
