module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactCarouselSlider',
      externals: {
        react: 'React'
      }
    }
  }
}
