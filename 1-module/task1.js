process.stdout.write('Please type message \n');
process.stdout.write('Сommand to exit: \\q \n');
process.stdout.write('-> ');

process.stdin.on('data', function(data) {
  const message = data.toString().trim();
  if(message !== '\\q') {
    const reverseStr = message.split('').reverse().join('');
    process.stdout.write(`<- ${reverseStr} \n`);
    process.stdout.write('-> ');
  } else {
    process.exit();
  }
});