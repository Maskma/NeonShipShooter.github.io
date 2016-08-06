// All States
app.game.state.add('boot', app.boot);
app.game.state.add('load', app.load);
app.game.state.add('level1', app.level1);

// Start
app.game.state.start('boot');