process.stderr.write('Something went ', 'ascii');
process.stderr.write(Buffer.from([0xf0, 0x9f]));
console.log('\x1b[31mE = mc²\x1b[0m');
process.stderr.write(Buffer.from([0x98, 0x95, 0x0a]));
