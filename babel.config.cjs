module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { node: 'current' }, // Cible la version actuelle de Node.js
      },
    ],
    '@babel/preset-react', // Pour la syntaxe JSX
  ],
};
