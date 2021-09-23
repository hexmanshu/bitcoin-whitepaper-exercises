"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
});

// TODO: insert each line into blockchain
for (let line of poem) {
	createBlock(line);
}

//console.log(Blockchain);

//console.log(verifyBlock(Blockchain.blocks[2]));

console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);


function createBlock(t) {
	Blockchain.blocks.push({
		index: Blockchain.blocks.length,
		hash: blockHash(t),
		prevHash: Blockchain.blocks[Blockchain.blocks.length - 1].hash,
		data: t,
		timestamp: Date.now(),
	});
}

function verifyChain(Blockchain) {
	for (let block of Blockchain.blocks) {
		//console.log(verifyBlock(block));
		if(!verifyBlock(block)) {
			return false;
		}
	}
	return true;
}

function verifyBlock(block) {
	if (!block.data && block.index !==0 ){
		return false;
	}
	if (block.index === 0 && block.hash != "000000") {
		return false;
	}
	if (!block.prevHash && block.data.length !== 0) {
		return false;
	}
	if (block.index < 0) {
		return false;
	}
	if (block.hash !== blockHash(block.data) && block.index !==0  ) {
		return false;
	}
	return true;
}


function blockHash(bl) {
	return crypto.createHash("sha256").update(bl).digest("hex");
}
