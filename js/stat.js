'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP_X = 30;
var GAP_Y = 10;
var BAR_WIDTH = 40;
var BAR_MAX_HEIGHT = 150;
var BAR_GAP = 50;
var TEXT_HEIGHT = 30;
var SHADOW_OFFSET = 10;

var renderCloud = function (ctx, x, y, color, shadowColor) {
  ctx.shadowOffsetX = SHADOW_OFFSET;
  ctx.shadowOffsetY = SHADOW_OFFSET;
  ctx.shadowColor = shadowColor;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var resetShadow = function (ctx) {
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowColor = 'transparent';
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getRandomNumber = function (min, max) {
  return Math.random() * (max - min);
};

var getRandomHsl = function () {
  return 'hsl(240, ' + getRandomNumber(0, 100) + '%,  50%)';
};

var renderText = function (ctx) {
  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP_X, CLOUD_Y + TEXT_HEIGHT);
  ctx.fillText('Список результатов:', CLOUD_X + GAP_X, CLOUD_Y + TEXT_HEIGHT + GAP_Y + GAP_Y);
};

var renderName = function (ctx, players, i) {
  ctx.fillText(players[i], CLOUD_X + GAP_X + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - GAP_Y);
  ctx.fillStyle = (players[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : getRandomHsl();
};

var renderBar = function (ctx, times, i) {
  var maxTime = getMaxElement(times);
  var barHeight = (BAR_MAX_HEIGHT * times[i]) / maxTime * -1;
  ctx.fillRect(CLOUD_X + GAP_X + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - TEXT_HEIGHT, BAR_WIDTH, barHeight);
  ctx.fillStyle = '#000000';
  ctx.fillText(Math.round(times[i]), CLOUD_X + GAP_X + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - TEXT_HEIGHT - GAP_Y + barHeight);
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff', 'rgba(0, 0, 0, 0.7)');
  resetShadow(ctx);
  renderText(ctx);
  for (var i = 0; i < players.length; i++) {
    renderName(ctx, players, i);
    renderBar(ctx, times, i);
  }
};
